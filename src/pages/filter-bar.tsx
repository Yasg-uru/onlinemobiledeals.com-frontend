import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/types/product";

interface FilterBarProps {
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onFilterChange({ search, page: 1 });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <Select
        onValueChange={(value) => onFilterChange({ category: value, page: 1 })}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Electronics">Electronics</SelectItem>
          <SelectItem value="Clothing">Clothing</SelectItem>
          <SelectItem value="Books">Books</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => onFilterChange({ sortBy: value, page: 1 })}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Date Added</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="ratings.averageRating">Rating</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          onFilterChange({ order: value as "asc" | "desc", page: 1 })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
