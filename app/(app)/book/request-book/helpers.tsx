import { createBookRequestFormKeys } from "@/lib/react-query/books";

export const getAnimationsSelected = (value: string[]) => {
  if (value.includes("all")) {
    return ["ALL"];
  }

  if (value.includes("main-characters")) {
    return ["MAIN"];
  }

  if (value.includes("curious-data")) {
    return ["EXTRA"];
  }

  return [];
};

export const getReverseAnimationsSelected = (value: string[]) => {
  if (value.every((v) => v === "ALL")) {
    return "Todas las animaciones";
  }

  if (value.every((v) => v === "MAIN")) {
    return "Solo caracteres principales";
  }

  if (value.every((v) => v === "EXTRA")) {
    return "Solo datos curiosos";
  }

  return "No hay animaciones seleccionadas";
};

export const bookRequestFormKeys = createBookRequestFormKeys({
  bookName: "bookName",
  authorName: "authorName",
  courseIds: "courseIds",
  comments: "comments",
  animations: "animations",
});

export const getFormValues = () => {
  return {
    bookName: "",
    authorName: "",
    courseIds: [],
    comments: "",
    animations: ["all"],
  };
};
