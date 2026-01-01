"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

export default function SearchFilter({
  placeholder = "Search...",
  paramName = "searchTerm",
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 🔑 URL is source of truth
  const urlValue = searchParams.get(paramName) ?? "";

  // 🧠 Local typing state (NOT synced via effect)
  const [draft, setDraft] = useState(urlValue);

  const debouncedDraft = useDebounce(draft, 500);

  /**
   * Push URL updates only
   * (No setState here)
   */
  useEffect(() => {
    if (debouncedDraft === urlValue) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedDraft) {
      params.set(paramName, debouncedDraft);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedDraft, urlValue, paramName, router, searchParams]);

  /**
   * Controlled input rule:
   * - While typing → show draft
   * - Otherwise → show URL value
   */
  const inputValue =
    draft === urlValue ? urlValue : draft;

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setDraft(e.target.value)}
        className="pl-10"
        disabled={isPending}
      />
    </div>
  );
}
