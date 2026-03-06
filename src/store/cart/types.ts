export interface ICartItem {
  productId: string;
  qty: number;
  price?: number; // optional: per-unit price if available
}

export interface IStateCart {
  // Map of productId -> cart item
  items: Record<string, ICartItem>;
}
