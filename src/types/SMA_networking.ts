/**
 * @author Witse Panneels
 *
 * types for the objects that will be transmitted over http between the worker, nextJS and the client
 *
 * note for self: all types need to be able to be converted to json
 */
import type { Product, Prices, PricesHistory } from "./SMA_objects";

export type Meta = {
  success?: boolean;
  time?: Date;
  message?: string;
};

export type intervalInfo = {
  intervalLength: number;
  nextInterval: number;
  meta: Meta;
};

export type crashInfo = {
  is_crash: boolean;
  meta: Meta;
};

export type marketInfo = {
  status: string;
  whenOpen?: number;
  meta: Meta;
};

export type productsResponse = {
  products: Product[];
  meta: Meta;
};

export type pricesResponse = {
  prices: Prices;
  meta: Meta;
};

export type PricesHistoryResponse = {
  histories: PricesHistory;
  meta: Meta;
};
