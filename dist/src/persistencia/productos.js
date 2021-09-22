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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsPersistencia = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
let productos = [];
const pathBdd = path_1.default.resolve(__dirname, '../../public/bdd.json');
class Productos {
    find(id) {
        return productos.find((aProduct) => aProduct.id === Number(id));
    }
    /* get(id?: number) {
    
      if (id) {
        return productos.filter((aProduct) => aProduct.id === id);
      }
      return productos;
    } */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = yield promises_1.default.readFile(pathBdd);
            const dataProducts = JSON.parse(dataFile);
            console.log(dataProducts);
            productos.push(dataProducts);
            console.log(productos);
            return productos;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = {
                    id: productos.length + 1,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    codigo: data.codigo,
                    foto: data.foto,
                    precio: data.precio,
                    stock: data.stock
                };
                productos.push(newItem);
                yield promises_1.default.writeFile(productos, pathBdd);
                console.log(productos);
                return newItem;
            }
            catch (error) {
                return error;
            }
        });
    }
    // update(id, data){
    // }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            productos = productos.filter((aProduct) => aProduct.id !== id);
            return productos;
        });
    }
}
exports.productsPersistencia = new Productos();
