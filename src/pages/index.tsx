import SearchableLayout from "@/components/searchable-layout";
import { ReactElement, ReactNode } from "react";

export default function Home() {
  return (
    <div>
      <h1>메인 화면</h1>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
