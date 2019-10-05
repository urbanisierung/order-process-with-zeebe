import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as path from "path";
import { OrderController } from "./backend/controller/order.controller";

const orderController = new OrderController();
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.post("/api/order", async (req: Request, res: Response) => {
  const customer = { name: req.body.name, email: req.body.email };
  const result = await orderController.placeOrder(customer);
  res.status(200).json(result);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

console.log("listening on port 8080");
app.listen(process.env.PORT || 8080);
