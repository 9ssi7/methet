import { useEffect, useState } from "preact/hooks";
import { praiseListByUser, type PraiseListDto } from "../api/praise.api";
import PraiseCard from "../components/PraiseCard.tsx";

export default function LastPraiseByUserList() {
  const [praises, setPraise] = useState<PraiseListDto[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const sp = new URL(document.location.toString()).searchParams;
    const page = sp.has("page") ? sp.get("page")! : "1";
    const limit = sp.has("limit") ? sp.get("limit")! : "10";
    const userName = window.location.pathname.split("/").pop();
    praiseListByUser(userName!, `page=${page}&per_page=${limit}`).then(
      ([data]) => {
        setPraise(data!);
        setPage(parseInt(page));
        setLimit(parseInt(limit));
      }
    );
  }, []);

  return (
    <>
      <h3 class="text-xl font-bold mb-2 mt-5">Son Övgüler</h3>
      <div class="flex flex-col gap-4">
        {praises.map((praise) => (
          <PraiseCard {...praise} />
        ))}
      </div>
      {praises.length === 0 && (
        <p class="text-center text-gray-500 mt-5">
          {page > 1 ? "Bu sayfada" : ""} Henüz hiç övgü yok.{" "}
          {page === 1 && "İlk övgüyü sen yapabilir misin?"}
        </p>
      )}
      <div class="grid grid-cols-3 mt-4">
        <div>
          {page > 1 && (
            <a href={`/?page=${page - 1}&limit=${limit}`} class="text-gray-500">
              Önceki sayfaya dön
            </a>
          )}
        </div>
        <div class="flex items-center justify-center">
          <span class="text-gray-500 text-center">Sayfa: {page}</span>
        </div>
        <div class="flex items-center justify-end ">
          {praises.length / page >= limit && (
            <a
              href={`/?page=${page + 1}&limit=${limit}`}
              class="text-center text-gray-500"
            >
              Sonraki sayfayı göster
            </a>
          )}
        </div>
      </div>
    </>
  );
}
