import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { string, z } from "zod";

const prisma = new PrismaClient();
const app = fastify();

app.post("/users", async (request, replay) => {
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
  return replay.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: 4000,
  })
  .then(() => {
    console.log("server runnig at port 4000");
  });
