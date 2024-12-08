"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Suspense, useEffect, useState } from "react";
import { useGetCategory } from "@/hooks/category.hook";
import { useDebounce } from "@/hooks/useDebounce";

const ProductFilterContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  const urlParams = new URLSearchParams(searchParams.toString());
  const { data: Categories } = useGetCategory();
  const [searchInput, setSearchInput] = useState(search);
  const priceFilter = [
    {
      value: "-price",
      title: "Low > High",
    },
    {
      value: "price",
      title: "Low < High",
    },
  ];

  const debouncedSearch = useDebounce(searchInput, 300);
  useEffect(() => {
    if (debouncedSearch !== search) {
      if (debouncedSearch) {
        urlParams.set("searchTerm", debouncedSearch);
      } else {
        urlParams.delete("searchTerm");
      }
      router.push(`?${urlParams.toString()}`);
    }
  }, [debouncedSearch, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      urlParams.delete("category");
      urlParams.delete("page");
    } else {
      urlParams.set("category", value);
    }
    router.push(`?${urlParams.toString()}`);
  };
  const handleSortChange = (value: string) => {
    if (value === "default") {
      urlParams.delete("sort");
      urlParams.delete("page");
    } else {
      urlParams.set("sort", value);
    }
    router.push(`?${urlParams.toString()}`);
  };
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <Input
        placeholder="Search products..."
        value={searchInput}
        onChange={handleSearchChange}
        className="w-full md:max-w-[335px]"
      />
      <div className="flex gap-2 flex-grow">
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:max-w-44">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Categories?.map((item) => (
              <SelectItem key={item._id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:max-w-44">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            {priceFilter?.map((item) => (
              <SelectItem key={item.title} value={item.value}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default function ProductFilter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductFilterContent />
    </Suspense>
  );
}
