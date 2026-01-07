import { TimeInterval } from "@/src/types/SMA_objects";
import { IPriceCalculator } from "../PriceCalculator";
import Products from "../Products";
import Sales from "../Sales";

/**
 * Price Calculator using the original SMA algorithm by Marc Bresson
 */
export default class PriceCalculator implements IPriceCalculator {
  name = "OG SMA calculator by Marc Bresson";
  version = "v1.0";
  /**
   * Calculate new prices based on the current state
   * @param products
   * @param sales
   * @param indexes
   */
  calculateNewPrices(
    products: Products,
    sales: Sales,
    indexes: TimeInterval[],
    isCrash: boolean
  ): Map<string, number> {
    throw new Error("Method not implemented.");
  }

  getParameters(): object {
    throw new Error("Method not implemented.");
  }

  setParameters(params: object): void {
    throw new Error("Method not implemented.");
  }
}
