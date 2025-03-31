import SearchableLayout from "@/components/searchable-layout";
import { ReactElement, useEffect } from "react";
import style from "@/pages/index.module.css";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

// "/" 경로로 접속해 index 페이지를 요청받아 사전 렌더링을 진행할 때, Home 컴포넌트보다 먼저 실행된다.
// 그래서 index 페이지에 필요한 데이터를 불러오는 기능(ex. 다른 백엔드 서버로부터 데이터 페칭)을 제공한다.
export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  const data = "hello";
  return { props: { data } };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 컴포넌트 마운트 이후, 실행
  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
