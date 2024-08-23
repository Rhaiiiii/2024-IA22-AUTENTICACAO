"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/../public'));
const registredUsers = [
    {
        username: "user1",
        password: "123123"
    },
    {
        username: "admin",
        password: "admin"
    }
];
const logedUsers = [
// 
];
app.get("/check/:token", (req, res) => {
    const { token } = req.params;
    if (!logedUsers[token])
        return res.status(401).json({ error: "Token inválido" });
    return res.json({ message: "Usuário logado" });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = registredUsers.find(user => user.username === username && user.password === password);
    if (!user)
        return res.status(401).json({ error: "Usuário não encontrado" });
    logedUsers.push(user);
    const token = logedUsers.length - 1;
    return res.json({ token });
});
app.post("/logout/:token", (req, res) => {
    const { token } = req.params;
    if (!logedUsers[token])
        return res.status(401).json({ error: "Token inválido" });
    delete logedUsers[token];
    return res.json({ message: "Usuário deslogado" });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
