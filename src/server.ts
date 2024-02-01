import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import path from "path";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
//app.use(express.static(path.join(__dirname, "..", "views")));

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
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
