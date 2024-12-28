import { FilterOptions, ProductsResponse } from '@/types/product';

export async function fetchProducts(options: FilterOptions): Promise<ProductsResponse> {
  const queryParams = new URLSearchParams({
    page: options.page.toString(),
    limit: options.limit.toString(),
    sortBy: options.sortBy,
    order: options.order,
  });

  if (options.category) queryParams.append('category', options.category);
  if (options.search) queryParams.append('search', options.search);

  const response = await fetch(`http://localhost:3000/product/get-products?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

