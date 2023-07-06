import Order from "./model/orders.model";

export const ordesProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: Order,
  },
];