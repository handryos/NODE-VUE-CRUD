import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Nome não pode ser null" }),
    password: z.string().min(4, { message: "Usuário ou senha inválida!" }),
  }),
});
