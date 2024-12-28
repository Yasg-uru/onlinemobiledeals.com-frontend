import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/states/hook";
import { useToast } from "@/hooks/use-toast";
import { updateProduct } from "@/states/slices/productSlice";
import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

interface UpdateProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateProductModal({
  product,
  isOpen,
  onClose,
}: UpdateProductModalProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

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
    if (isOpen) {
      reset(product);
    }
  }, [isOpen, product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    toast({
      title: "Update function called",
    });

    dispatch(updateProduct({ id: data._id, product: data }))
      .unwrap()
      .then(() => {
        toast({
          title: "Product updated successfully",
        });
        onClose(); // Close the modal after success
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
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
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price")}
            />
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
          <DialogFooter>
            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
