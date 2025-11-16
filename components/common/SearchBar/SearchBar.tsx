"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";

const categories = ["All", "Home", "Music", "Phone", "Storage", "Other"];

const SearchBar = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <Container className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full mt-5">
        <h2 className="text-3xl font-bold tracking-tight">Give All You Need</h2>

        <div className="flex items-center w-full md:w-[360px] h-10 rounded-full border border-neutral-300 shadow-sm overflow-hidden">
          <Search className="w-5 h-5 text-neutral-500 ml-4 " />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search on Gossamer"
            className="flex-1 px-3 outline-none text-sm placeholder:text-neutral-400"
          />
          {/* переход на поиск */}
          <Button
            variant="primary"
            onClick={() =>
              router.push(
                `/search?q=${encodeURIComponent(
                  query
                )}&cat=${encodeURIComponent(activeCategory)}`
              )
            }
          >
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mt-8 gap-4 w-full">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "primary" : "secondary"}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* переход на все продукты */}
        <Button variant="secondary" onClick={() => router.push("/products")}>
          See All Products
        </Button>
      </div>
    </Container>
  );
};

export default SearchBar;
