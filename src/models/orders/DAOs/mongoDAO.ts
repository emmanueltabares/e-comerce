import { NewOrderI, OrderI, OrderBaseClass } from '../../../interfaces/orders';
import { OrderModel } from '../../schemas/order';

export class OrderMongoDAO {

  async createOrder(dataOrder: NewOrderI): Promise<OrderI> {
    const newOrderI = new OrderModel(dataOrder);
    await newOrderI.save();
    return newOrderI as any as OrderI;
  }

  async getOrder(userId: string, idOrder?: string): Promise<OrderI> {
    let result: any = [];
    if(idOrder) {
       result = await OrderModel.findOne({ _id : idOrder } );
      if (!result) throw new Error("id not found");
    } else {
        result = await OrderModel.find({ userId : userId })
    }
    return result; 
  }

  async postOrders(userId: string, orderId: string)  {
    const order = await this.getOrder(userId, orderId);
    console.log(orderId)
    if (order.estado !== 'GENERADO') {
      const error: Error = new Error(
        'La Orden no se encuentra en estado generada',
      );
    }
    return await OrderModel.findOneAndUpdate({ _id : orderId}, { estado: 'FINALIZADO' }, { new: true });
  }
}