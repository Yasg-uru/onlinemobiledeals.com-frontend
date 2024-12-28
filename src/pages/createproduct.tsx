import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/states/hook";
import { addproducts } from "@/states/slices/productSlice";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  discount: z.number().min(0).max(100, {
    message: "Discount must be between 0 and 100.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  source: z.string().min(1, {
    message: "Please enter a source",
  }),
  affiliateLink: z.string().url({
    message: "Please enter a valid affiliate link URL.",
  }),
  images: z
    .array(
      z.string().url({
        message: "Please enter valid image URLs.",
      })
    )
    .min(1, {
      message: "At least one image URL is required.",
    }),
  averageRating: z.number().min(0).max(5, {
    message: "Average rating must be between 0 and 5.",
  }),
  totalRatings: z.number().int().positive({
    message: "Total ratings must be a positive integer.",
  }),
});
export type AddProductFormValues = z.infer<typeof formSchema>;

export default function AddProductPage() {
  const [images, setImages] = useState([""]);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      source: "",
      affiliateLink: "",
      images: [""],
      averageRating: 0,
      totalRatings: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(addproducts(values))
      .unwrap()
      .then(() => {
        toast({
          title: "Product added",
          description: "Product has been added successfully",
        });
      })
      .catch(() => {
        toast({
          title: "Product failed",
          description: "Product has not been added successfully",
          variant: "destructive",
        });
      });
  }

  const addImage = () => setImages([...images, ""]);
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Add New Product</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Smartphone XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Latest model with advanced features..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.amazon.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliateLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliate Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.amazon.com/ref=..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Images</FormLabel>
                {images.map((image, index) => (
                  <div key={index} className="flex space-x-2 mt-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={image}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index] = e.target.value;
                        setImages(newImages);
                        form.setValue("images", newImages);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addImage} className="mt-2">
                  Add Image
                </Button>
                <FormMessage>
                  {form.formState.errors.images?.message}
                </FormMessage>
              </div>
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="averageRating"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Average Rating</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalRatings"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Total Ratings</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
