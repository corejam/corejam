export type Price = {
  tax_rate: number;
  gross: number;
  net: number;
  purchase_price_gross?: number;
};

export type PriceInput = {
  tax_rate: number;
  gross: number;
  net: number;
  purchase_price_gross?: number;
};
