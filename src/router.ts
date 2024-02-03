import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();

router.post("/print", async (request, response) => {
  const { print } = request.body;
  console.log(print);

  return response.sendStatus(204);
});

export { router };
