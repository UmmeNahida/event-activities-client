"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ClearFiltersButtonProps {
  label?: string;
}

export default function ClearFiltersButton({
  label = "Clear Filters",
}: ClearFiltersButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.toString().length > 0;

  const handleClear = () => {
    router.push(pathname); // 🔥 remove all query params
  };

  if (!hasFilters) return null; // query না থাকলে button দেখাবে না

  return (
    <Button
      variant="outline"
      onClick={handleClear}
      className="text-sm"
    >
      {label}
    </Button>
  );
}
