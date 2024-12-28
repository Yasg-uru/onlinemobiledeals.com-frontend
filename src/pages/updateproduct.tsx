import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/states/hook";
import { useToast } from "@/hooks/use-toast";
import { updateProduct } from "@/states/slices/productSlice";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Define Zod schema for product validation
const productSchema = z.object({
  _id: z.string().nonempty("Product ID is required"),
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  discount: z.number().min(0, "Discount must be greater than or equal to 0"),
  category: z.string().nonempty("Category is required"),
  source: z.string().nonempty("Source is required"),
  affiliateLink: z.string().url("Affiliate Link must be a valid URL"),
});

// Infer the TypeScript type from the schema
type ProductFormValues = z.infer<typeof productSchema>;

export function UpdateProductPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  // Get the product data from the location state
  const product = location.state?.product as Product;

  // Set up react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product, // Initialize form with default values
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    if (!productId) {
      return;
    }
    dispatch(updateProduct({ id: productId, product: data }))
      .unwrap()
      .then(() => {
        toast({
          title: "Product updated successfully",
        });
        navigate("/"); // Navigate back to the product list after successful update
      })
      .catch((error) => {
        toast({
          title: "Failed to update product",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Update Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 h-[70vh] overflow-y-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" step="0.01" {...register("price")} />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount</Label>
          <Input
            id="discount"
            type="number"
            step="0.01"
            {...register("discount")}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" {...register("category")} />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="source">Source</Label>
          <Input id="source" {...register("source")} />
          {errors.source && (
            <p className="text-red-500 text-sm">{errors.source.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="affiliateLink">Affiliate Link</Label>
          <Input id="affiliateLink" {...register("affiliateLink")} />
          {errors.affiliateLink && (
            <p className="text-red-500 text-sm">
              {errors.affiliateLink.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit">Update Product</Button>
        </div>
      </form>
    </div>
  );
}
