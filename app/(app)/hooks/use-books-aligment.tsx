import { Dispatch, SetStateAction, useState } from "react";

export enum BooksAligment {
  horizontal = "horizontal",
  vertical = "vertical",
}

type BookAligmentReturn = {
  bookAligment: BooksAligment;
  flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
  setDirection: Dispatch<SetStateAction<BooksAligment>>;
};

export default function useBooksAligment(): BookAligmentReturn {
  const [bookAligment, setBookAligment] = useState<BooksAligment>(
    BooksAligment.horizontal
  );

  return {
    bookAligment,
    flexDirection: bookAligment === BooksAligment.vertical ? "column" : "row",
    setDirection: setBookAligment,
  };
}
