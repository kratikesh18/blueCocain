"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signUpSchema } from "@/schemas/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    // Handle sign-up logic here
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-6">
        Join Lyr!csForyou
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Input {...field} className="bg-gray-700 text-white" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  {...field}
                  type="email"
                  className="bg-gray-700 text-white"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  className="bg-gray-700 text-white"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Log In
          </a>
        </p>
        <p className="text-sm mt-2">
          Forgot your password?{" "}
          <a
            onClick={() => router.push("/forgot-password")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Reset Password
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
