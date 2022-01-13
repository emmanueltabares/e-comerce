import { TipoPersistencia } from '../models/orders/order.factory';
import { OrderFactoryDAO } from '../models/orders/order.factory';
import { NewOrderI, OrderI } from '../interfaces/orders';

const tipo = TipoPersistencia.MongoAtlas;

class orderAPI {
  private orders: any;

  constructor() {
    this.orders = OrderFactoryDAO.get(tipo);
  }

  async createOrden(orderData: NewOrderI): Promise<OrderI> {
    return await this.orders.createOrder(orderData);
  }

  async getOrden(idUser: string, idOrder?: string): Promise<OrderI> {
    if(idOrder) return await this.orders.getOrder(idUser, idOrder);
    return await this.orders.getOrder(idUser);
  }
  
  async postOrden(idUser: string, orderId: string) {
    return await this.orders.postOrders(idUser, orderId);
  }
}

export const ordersAPI = new orderAPI();