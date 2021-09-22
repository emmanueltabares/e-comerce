"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const db_1 = require("./services/db");
const port = 8080;
db_1.DBService.init();
server_1.default.listen(port, () => console.log(`Server up in port ${port}`));
