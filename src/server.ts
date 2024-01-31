import express from "express";
import { PrismaClient } from "@prisma/client";
import { string, z } from "zod";

const prisma = new PrismaClient();
const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello!" });
});

app.post("/users", async (request, response) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });
  const { name, email, password } = userSchema.parse(request.body);

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
