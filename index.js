import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoutes.js";
import { residencyRoute } from "./routes/residencyRoute.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // used to prevent cross-origin resource redirects and errors

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/residency",residencyRoute)
