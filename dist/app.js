"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors = require('cors');
const app = (0, express_1.default)();
// Enable CORS for all origins
app.use(cors());
app.use(express_1.default.json());
app.use('/api/books', books_controller_1.bookRoutes);
app.use('/api/borrow', borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('Welcome Library app');
});
exports.default = app;
