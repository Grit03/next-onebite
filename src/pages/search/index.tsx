import SearchableLayout from "@/components/searchable-layout";
import { ReactElement } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Search() {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
