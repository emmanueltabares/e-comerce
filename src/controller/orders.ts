import { Request, Response, NextFunction } from 'express';
import { ordersAPI } from '../apis/orders';
import { Logger } from '../services/logger';

class Order {

  async getOrdenes(req: Request, res: Response, next: NextFunction) {
    if(req.user) {
      const user = req.user as any;
      try {
        let order;
        const { id } = req.params;
        if(id) {
          order = await ordersAPI.getOrden(user._id, id);
          res.json(order);
        } else {
          order = await ordersAPI.getOrden(user._id);
          res.json(order);
        }
      } catch (err: any) {
        Logger.error(err);
        next(err);
      }
    }
  }   

  async postOrden(req: Request, res: Response, next: NextFunction) {
    const { orderId } = req.body;

    try {
      if (!orderId || typeof orderId !== 'string') {
        res.status(400).json({ msg: 'Please insert a valid OrderId'});
      }
      if (req.user) {
        const user = req.user as any;

        const ordenUpdated = await ordersAPI.postOrden(
          user._id,
          orderId,
        );

        res.status(200).json({
          msg: 'Su orden fue completada',
          ordenUpdated,
        });
      }
    } catch (err) {
      Logger.error(err);
      next(err);
    }
  }
}

export const OrderController = new Order();