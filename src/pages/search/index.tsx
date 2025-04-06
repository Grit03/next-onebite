import SearchableLayout from "@/components/searchable-layout";
import { ReactElement, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useRouter } from "next/router";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   // query 값 가져오기
//   const q = context.query.q;
//   // fetchBooks를 확장하여 검색 api 사용
//   // 타입 단언 필요 (q가 string | string[] | undefined 타입일수 있으므로)
//   const books = await fetchBooks(q as string);

//   return { props: { books } };
// };

// SSG만 사용하는 것을 불가하므로, SSG(기본) + CSR로 Search 페이지를 구현할 수 있다.
export default function Search() {
  const [books, setBooks] = useState<BookData[]>([]);

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };
  const router = useRouter();
  const q = router.query.q;

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

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
