import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://online-mobile-deals-backend.onrender.com/product/product/${id}`
        );
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast({
          title: "Error",
          description:
            "Failed to load product details. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id, toast]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Shared successfully",
            description: "The product link has been shared.",
          });
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied",
          description: "The product link has been copied to your clipboard.",
        });
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen dark:bg-black `}>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-4 mt-4" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Card className={`w-full max-w-4xl mx-auto dark:bg-black`}>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square relative">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <p className="text-lg mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold">
                    {product.ratings.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm ml-2">
                    ({product.ratings.totalRatings} reviews)
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold mr-4">
                    ₹{product.finalPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xl line-through text-gray-500">
                      ₹{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-4">Category: {product.category}</p>
                <p className="text-sm mb-4">Source: {product.source}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              className="flex-1 mr-2"
              onClick={() =>
                window.open(
                  product.affiliateLink,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              View on {product.source}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
