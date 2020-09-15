export type Timestamp = {
  dateCreated: string;
  dateUpdated: string;
};

export type TimestampInput = Partial<Timestamp> & {
  dateCreated?: string;
  dateUpdated: string;
};

export type Paginated = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items: any[];
};

export type Deliverability = {
  stock?: number;
  clearance_sale: boolean;
  delivery_time?: string;
  restock_time_days?: number;
  free_shipping: boolean;
  min_order_qty?: number;
  max_order_qty?: number;
};

export type DBDocument = {
  id: string;
};
