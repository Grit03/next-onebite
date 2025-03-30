import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function Search() {
  const router = useRouter();

  const { q } = router.query;

  return <h1>Search {q}</h1>;
}

Search.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
