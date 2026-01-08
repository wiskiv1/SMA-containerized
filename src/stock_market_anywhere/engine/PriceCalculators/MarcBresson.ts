import { Sale, TimeInterval } from "@/src/types/SMA_objects";
import { IPriceCalculator } from "../PriceCalculator";
import Products from "../Products";
import Sales from "../Sales";
import { countSalesPerProduct, lastNonCrashIndex, round } from "../../utils/stockmarket";

/**
 * Price Calculator using the original SMA algorithm by Marc Bresson
 */
export default class PriceCalculator implements IPriceCalculator {
  name = "original SMA calculator by Marc Bresson";
  version = "v1.0";

  // PARAMETERS
  amplification = 100;

  /**
   * Calculate new prices based on the current state
   */
  calculateNewPrices(products: Products, sales: Sales, indexes: TimeInterval[], isCrash: boolean): Map<string, number> {
    if (isCrash) return products.getCrashPrices();

    // if not a crash: calculate new prices
    const nonCrashIndex = lastNonCrashIndex(indexes);
    let last_non_krach_party_index: TimeInterval;
    if (indexes.length == 1) {
      last_non_krach_party_index = indexes.at(-1 - nonCrashIndex)!;
    } else {
      last_non_krach_party_index = indexes.at(-2 - nonCrashIndex)!;
    }
    const milliseconds_since_last_update = Date.now() - last_non_krach_party_index.time_start.getTime();

    const former_prices = products.getPrices(nonCrashIndex);

    const new_sales = sales.since(new Date(Date.now() - milliseconds_since_last_update));
    const price_var = this.price_variation(new_sales, former_prices, milliseconds_since_last_update);

    const new_prices: Map<string, number> = new Map();
    for (const product of products.getProducts().values()) {
      let min_price = 0;
      if (product && "minPrice" in product) {
        min_price = product.minPrice!;
      } else {
        min_price = product.crashPrice;
      }

      const newPrice = round(
        Math.max(
          (former_prices.get(product.tri) as number) * (1 + (price_var.get(product.tri) as number) / 100),
          min_price
        ),
        2
      );
      new_prices.set(product.tri, newPrice);
    }

    return new_prices;
  }

  getParameters(): object {
    return {
      amplification: this.amplification,
    };
  }

  setParameters(params: params): void {
    if (params.amplification) {
      this.amplification = params.amplification;
    }
  }

  private price_variation(
    new_sales: Sale[],
    former_prices: Map<string, number>,
    milliseconds_since_last_update: number
  ): Map<string, number> {
    // compte le nombre total de boissons vendues sur l'intervalle de temps.
    const total_sales = new_sales.length;

    const sales_per_drink = countSalesPerProduct(new_sales);
    for (const drink of former_prices.keys()) {
      if (!sales_per_drink.has(drink)) {
        sales_per_drink.set(drink, 0);
      }
    }

    const average_sales = total_sales / former_prices.size;
    const maximum = Math.max(...Array.from(sales_per_drink.values()));
    const centered_sales = this.center_sales(sales_per_drink, average_sales, maximum);

    // tend to amplification's value when total_sales goes to infinity
    // those points are then shared between the drinks
    const max_var_per_minute = (Math.atan(total_sales / 10) / (Math.PI / 2)) * this.amplification;
    const max_var = (max_var_per_minute * milliseconds_since_last_update) / 60000;
    for (const [tri, val] of centered_sales) {
      centered_sales.set(tri, val * max_var);
    }

    return centered_sales;
  }

  private center_sales(sales_per_drink: Map<string, number>, average: number, max: number): Map<string, number> {
    max = Math.max(max, 1);

    const centered_sales: Map<string, number> = new Map();
    for (const [drink, sales] of sales_per_drink) {
      centered_sales.set(drink, (sales - average) / max);
    }

    return centered_sales;
  }
}

type params = {
  amplification?: number;
};
