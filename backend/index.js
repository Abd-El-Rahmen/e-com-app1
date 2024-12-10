import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/authRoute.js";
import dotenv from "dotenv";
import adminProductsRouter from "./routes/admin/productRoutes.js";
import imageRoutes from "./routes/uploadedFiles/imageRoutes.js";
import productRoutes from "./routes/shop/productsRoutes.js";
import cartRoutes from "./routes/shop/cartRoutes.js";
import addressRoutes from "./routes/shop/addressRoute.js";
import shoppinOrderRoutes from './routes/shop/orderRoutes.js'
import adminOrderRoutes from './routes/admin/orderRoutes.js'
import reviewRoutes from './routes/shop/reviewRoute.js'

dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;
const URL_ = process.env.URL_;
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;

const app = express();

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use(
  cors({
    origin: `${FRONTEND}`,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/shop/order',shoppinOrderRoutes)
app.use('/api/shop/address',addressRoutes)
app.use("/api/shop/products", productRoutes);
app.use("/api/shop/cart", cartRoutes);
app.use("/api/uploads", imageRoutes);
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/order", adminOrderRoutes);
app.use('/api/shop/reviews',reviewRoutes)


app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the API");
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
  console.log(`You can check => ${URL_}`);
});
