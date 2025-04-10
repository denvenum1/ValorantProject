import express from "express";
import createServerlessHandler from "@vendia/serverless-express";

let handler: any = null;

export default async function (req: any, res: any) {
  try {
    console.log("⚙️ Serverless functie gestart");

    if (!handler) {
      const app = express();

      app.get("/", (req, res) => {
        res.send("✅ Express is alive op Vercel!");
      });

      handler = createServerlessHandler({ app });
      console.log("🚀 Handler gecreëerd");
    }

    return handler(req, res);
  } catch (error) {
    console.error("💥 Fout:", error);
    res.status(500).send("❌ Crash: " + (error as Error).message);
  }
}
