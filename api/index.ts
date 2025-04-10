import express from "express";
import router from "../routes/routers";
import { connect } from "../database";
import { errorHandler } from "../middleware/middleware";
import session from "../middleware/session";
import createServerlessHandler from "@vendia/serverless-express";

let handler: any = null;

export default async function (req: any, res: any) {
  if (!handler) {
    await connect();

    const app = express();
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.json({ limit: "2mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(session);
    app.use("/", router);

    // Error handlers
    app.use(errorHandler(404, "De pagina bestaat niet"))
       .use(errorHandler(500, "Interne serverfout"))
       .use(errorHandler(403, "Toegang geweigerd"))
       .use(errorHandler(401, "Niet gemachtigd"))
       .use(errorHandler(400, "Ongeldig verzoek"));

    handler = createServerlessHandler({ app });
  }

  return handler(req, res);
}
