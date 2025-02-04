import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Star, Trash2, Edit, MousePointerIcon } from "lucide-react";
import { useAuthContext } from "@/context/authcontext";
import { useAppDispatch } from "@/states/hook";
import { useToast } from "@/hooks/use-toast";
import {
  deleteproduct,
  increamentProductCounts,
} from "@/states/slices/productSlice";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user, isAuthenticated } = useAuthContext();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const showAdminButtons = isAuthenticated && user && user.Role === "admin";

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteproduct(id))
      .unwrap()
      .then(() => {
        toast({
          title: "Product deleted successfully",
          description: "Please refresh the page to see the changes.",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to delete product",
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          variant: "destructive",
        });
      });
  };

  const handleUpdateProduct = () => {
    navigate(`/update-product/${product._id}`, { state: { product } });
  };

  const handleClick = (id: string) => {
    dispatch(increamentProductCounts(id))
      .unwrap()
      .then(() => {
        toast({
          title: "🎉 Click Recorded!",
          description:
            "Thanks for showing interest in this product. Your action is valuable!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  return (
    <Card className={`w-full max-w-sm mx-auto dark:bg-black`}>
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <div className="flex items-center space-x-1">
          <MousePointerIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {product.clicks} {product.clicks === 1 ? "Click" : "Clicks"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">
            ₹{product.finalPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm line-through text-muted-foreground">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{product.ratings.averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">
            ({product.ratings.totalRatings} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => {
            handleClick(product._id);
            window.open(product.affiliateLink, "_blank", "noopener,noreferrer");
          }}
        >
          Buy It on {product.source}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/details/${product._id}`)}
        >
          View Details
        </Button>
        {showAdminButtons && (
          <div className="flex w-full gap-2 mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleUpdateProduct}
            >
              <Edit className="w-4 h-4 mr-2" />
              Update
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => handleDeleteProduct(product._id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
