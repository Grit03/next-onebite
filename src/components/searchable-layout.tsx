import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "@/components/searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // q는 string | string[](쿼리가 여러 개인 경우) 일 수 있기 때문에, as String으로 타입 단언을 해야한다.
  const q = router.query.q as string;

  // 검색 후, search 상태 값이 초기화되기 때문에 검색창에 검색어가 남아있게 하기 위한 코드
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // query 값이 없는 경우, 검색이 작동되지 않도록 한다.
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onSearchChange}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
