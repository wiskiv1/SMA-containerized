import Products from "./Products";
import Sales from "./Sales";
import { TimeInterval } from "@/src/types/SMA_objects";
/*
add your own PriceCalculators here! Make sure that the implement the interface  
use code comments to select which calculator you want to use in production
 */
// import PriceCalculator from "./PriceCalculators/MarcBresson";
import PriceCalculator from "./PriceCalculators/PartyBroker";

export default PriceCalculator;

/**
 * Price calculator interface
 *
 * THIS OBJECT MAY NOT APPEND THE NEW PRICES!
 *
 * If you do not want the next TimeInterval to be marked as Crash you may change the is_krach variable
 *
 * use this interface to program new price calculators
 *
 * let the client change behavior using get and set parameters
 */
export interface IPriceCalculator {
  name: string;
  version: string;
  calculateNewPrices(products: Products, sales: Sales, indexes: TimeInterval[], isCrash: boolean): Map<string, number>;
  getParameters(): object;
  setParameters(params: object): void;
}
