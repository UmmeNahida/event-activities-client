/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";


export default function Pagination({ meta }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = meta?.page;
  const totalPages = Math.ceil(meta?.total / meta?.limit);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages < 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      <Button variant="outline" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
        Previous
      </Button>

      <span className="px-3 py-2 text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
