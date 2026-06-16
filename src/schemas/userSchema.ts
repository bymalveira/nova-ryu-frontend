import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter mais de 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  
  role: z.enum(["ADMIN", "ALUNO", "PROFESSOR"]),
});