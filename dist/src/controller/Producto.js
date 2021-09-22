"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
const db_1 = require("../services/db");
const tableName = 'productos';
class Producto {
    /* checkAddProducts(req: Request, res: Response, next: NextFunction) {
      const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  
      if (!nombre || !precio || !descripcion || !codigo || !foto || !stock || typeof nombre !== 'string' || isNaN(precio)) {
        return res.status(400).json({
          msg: 'Campos del body invalidos',
        });
      }
  
      next();
    }
  
    checkProductExists(req: Request, res: Response, next: NextFunction) {
      const id = Number(req.params.id);
      const producto = productsPersistencia.find(id);
  
      if (!producto) {
        return res.status(404).json({
          msg: 'producto not found',
        });
      }
      next();
    } */
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield db_1.DBService.getAll(tableName);
            res.json({
                data: items,
            });
        });
    }
    getProductsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield db_1.DBService.get(tableName, Number(id));
            if (!item.length)
                return res.status(404).json({
                    msg: "Product not found"
                });
            res.json({
                data: item,
            });
        });
    }
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!data)
                return res.status(404).json({
                    msg: "Campos invalidos",
                });
            const id = yield db_1.DBService.create(tableName, data);
            const newProduct = yield db_1.DBService.get(tableName, id);
            res.json({
                msg: 'producto agregado con exito',
                data: newProduct,
            });
        });
    }
    updateProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            if (!body)
                return res.status(404).json({
                    msg: "Campos invalidos",
                });
            let item = yield db_1.DBService.get(tableName, Number(id));
            if (!item.length)
                return res.status(404).json({
                    msg: "Product not found"
                });
            yield db_1.DBService.update(tableName, id, body);
            item = yield db_1.DBService.get(tableName, Number(id));
            res.json({
                msg: 'Producto actualizado',
                item,
            });
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let item = yield db_1.DBService.get(tableName, Number(id));
            if (!item.length)
                return res.status(404).json({
                    msg: "Product not found"
                });
            yield db_1.DBService.delete(tableName, id);
            res.json({
                msg: 'product deleted',
            });
        });
    }
}
exports.productoController = new Producto();
