"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
const ProductPagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const params = new URLSearchParams(searchParams.toString());
  const createQueryString = useCallback(
    (name: string, value: string) => {
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handlePageChange = (newPage: number) => {
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil((total || 0) / limit);
  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?${createQueryString("page", (page - 1).toString())}`}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageChange(page - 1);
            }}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`?${createQueryString("page", (index + 1).toString())}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(index + 1);
              }}
              isActive={page === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 7 && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationNext
            href={`?${createQueryString("page", (page + 1).toString())}`}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) handlePageChange(page + 1);
            }}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
