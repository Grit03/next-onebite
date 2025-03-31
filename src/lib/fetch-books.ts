import { BookData } from "@/types";

// getServerSideProps에서 모두 구현하면, 가독성이 떨어지기 때문에, 따로 파일을 만듦
// 비동기로 반환하기 때문에 Promise<BookData[]>
export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = "http://localhost:12345/book";
  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    // 요청에 실패한 경우
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);

    return [];
  }
}
