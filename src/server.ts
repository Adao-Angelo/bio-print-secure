import express, { Response, Request, request, response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import Fingerprint from "express-fingerprint";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
//app.use(express.static(path.join(__dirname, "..", "public")));
app.use(Fingerprint);
app.get("/", (request, response) => {
  response.send();
});

app.get("/", (req, res) => {
  console.log(req.fingerprint);
});
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.user.delete({ where: { id: id } });
  res.send();
});
app.post("/users", async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return response.status(201).send();
});

app.listen(4000, () => {
  console.log("server runner at port 4000");
});
