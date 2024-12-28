export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    category: string;
    source: string;
    affiliateLink: string;
    images: string[];
    clicks: number;
    addedBy: string;
    finalPrice: number;
    createdAt: string;
    updatedAt: string;
    ratings: {
      averageRating: number;
      totalRatings: number;
    };
  }
  
  export interface ProductsResponse {
    success: boolean;
    data: Product[];
    meta: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }
  
  export interface FilterOptions {
    page: number;
    limit: number;
    category?: string;
    search?: string;
    sortBy: string;
    order: 'asc' | 'desc';
  }
  
  