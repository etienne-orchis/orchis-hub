import express from "express";
import employeeRouter from "./employee.route";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, API!");
});

router.use("/employees", employeeRouter);

export default router;
