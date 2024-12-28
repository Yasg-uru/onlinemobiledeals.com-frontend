import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTheme } from "next-themes";
// import { Moon, Sun } from "lucide-react";

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
//   CardFooter,
} from "@/components/ui/card";
import * as z from "zod";
import { useAppDispatch } from "@/states/hook";
import { Login } from "@/states/slices/authSlice";
import { useToast } from "@/hooks/use-toast";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    dispatch(Login(values))
      .unwrap()
      .then(() => {
        toast({
          title: "Login Success",
          description: "You have successfully logged in",
        });
      })
      .catch(() => {
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Login</CardTitle>
          </div>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
