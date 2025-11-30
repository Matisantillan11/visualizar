import { array, object, string } from "@/interfaces/zod.types";

export const formSchema = object({
  bookName: string().min(1, "El nombre del libro es requerido"),
  authorName: string().min(1, "El nombre del autor es requerido"),
  courseIds: array(string()).min(1, "Al menos debe seleccionar una materia"),
  comments: string().optional(),
  animations: array(string()).min(1, "Al menos debe seleccionar una animación"),
});
