import express from "express";
import router from "../routes/routers";
import { connect } from "../database";
import { errorHandler } from "../middleware/middleware";
import session from "../middleware/session";
import createServerlessHandler from "@vendia/serverless-express";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use("/", router);

// Error handlers
app.use(errorHandler(404, "The page you were trying to find does not exist"))
   .use(errorHandler(500, "Internal server error. Please try again later."))
   .use(errorHandler(403, "Forbidden. Access denied."))
   .use(errorHandler(401, "Unauthorized. Please log in."))
   .use(errorHandler(400, "Bad request. Invalid syntax."));

await connect();

export default createServerlessHandler({ app });
