import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

const mockData = {
  id: 1,
  title: "한 입 크기로 잘라 먹는 리액트",
  subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
  description:
    "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
  author: "이정환",
  publisher: "프로그래밍인사이트",
  coverImgUrl:
    "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   // !로 context.params가 있을거라고 단언
//   // 이렇게 해도 안전한 이유는, 해당 페이지가 무조건 id가 있어야 접근 가능한 페이지이기 때문
//   const id = context.params!.id;
//   const book = await fetchOneBook(Number(id));

//   return { props: { book } };
// };

// 동적 라우트에서의 SSG
// getStaticPath를 만들어줘야한다.
export const getStaticPaths = () => {
  return {
    // paths라는 속성으로 어떤 경로가 존재할 수 있는지를 배열로 반환
    paths: [
      {
        // 가능한 경로를 params라는 속성에 적어주면 된다.
        params: {
          // 파라미터 이름 : 값
          // 파라미터 값은 반드시 문자열로 작성해야지 정상 작동한다.
          id: "1",
        },
      },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // fallback은 예외 상황에 대비하는 옵션
    // 존재하지 않는 url에 어떻게 대응할 것인지의 옵션
    fallback: false, // not found를 반환함
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return { props: { book } };
};

export default function Book({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return "문제가 발생했습니다. 다시 시도해주세요";
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
