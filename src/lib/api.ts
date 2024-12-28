import axios from 'axios';
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

  const response = await axios.get<ProductsResponse>(
    `https://online-mobile-deals-backend.onrender.com/product/get-products?${queryParams}`
    ,{
      withCredentials:true
    }
  );
  
  return response.data; 
}
