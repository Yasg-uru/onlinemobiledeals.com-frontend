'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { useTheme } from 'next-themes';
import { ProductCard } from '@/components/ProductCard';
import { FilterBar } from '@/components/FilterBar';
import { Pagination } from '@/components/Pagination';
import { fetchProducts } from '@/lib/api';
import { FilterOptions, ProductsResponse } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ProductPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
  });

  const { data, error, isLoading } = useSWR<ProductsResponse>(
    ['/product/get-products', filters],
    () => fetchProducts(filters)
  );

  const { theme, setTheme } = useTheme();

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  if (error) return <div>Failed to load products</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Listing</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
        </Button>
      </div>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {data && (
        <Pagination
          currentPage={data.meta.currentPage}
          totalPages={data.meta.totalPages}
          onPageChange={(page) => handleFilterChange({ page })}
        />
      )}
    </div>
  );
}

