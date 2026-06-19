export interface IOrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface IShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  id: string;
  items: IOrderItem[];
  total: number;
  shippingAddress: IShippingAddress;
  status: string;
  paymentStatus: string;
  createdAt: string;
}
