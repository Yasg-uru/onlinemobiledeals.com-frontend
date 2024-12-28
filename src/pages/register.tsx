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

import { useToast } from "@/hooks/use-toast";
import { Register } from "@/states/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const registerSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
const navigate=useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    dispatch(Register(values))
      .unwrap()
      .then(() => {
        toast({
          title: "Registration Success",
          description: "You have successfully registered.",
        });
        navigate(`/verify-otp/${values.email}`)
      })
      .catch(() => {
        toast({
          title: "Registration Failed",
          description: "Something went wrong.",
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
            <CardTitle>Register</CardTitle>
          </div>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
