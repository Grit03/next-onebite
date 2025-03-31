import SearchableLayout from "@/components/searchable-layout";
import { ReactElement } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // query 값 가져오기
  const q = context.query.q;
  // fetchBooks를 확장하여 검색 api 사용
  // 타입 단언 필요 (q가 string | string[] | undefined 타입일수 있으므로)
  const books = await fetchBooks(q as string);

  return { props: { books } };
};

export default function Search({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
