/**
 * @author Witse Panneels
 *
 * Price calculator based on the algorithm used by "partybroker.net"
 */
import { TimeInterval } from "@/src/types/SMA_objects";
import { IPriceCalculator } from "../PriceCalculator";
import Products from "../Products";
import Sales from "../Sales";

export default class PriceCalculator implements IPriceCalculator {
  name = "Party Broker Calculator";
  version = "v0.1.0";

  price_increase = 0.1;
  price_decrease = 0.4;

  calculateNewPrices(products: Products, sales: Sales, indexes: TimeInterval[], isCrash: boolean): Map<string, number> {
    throw new Error("Method not implemented.");
  }
  getParameters(): object {
    return {
      price_increase: this.price_increase,
      price_decrease: this.price_decrease,
    };
  }
  setParameters(params: object): void {
    throw new Error("Method not implemented.");
  }
}

type params = {
  amplification?: number;
};
