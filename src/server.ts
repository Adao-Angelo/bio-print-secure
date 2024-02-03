import express from "express";
import path from "path";
import { router } from "./router";
import * as startLivenessFlow from "@softcol/biometrics";

const app = express();
app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(4000, () => {
  console.log("server runner at port 4000");
});
