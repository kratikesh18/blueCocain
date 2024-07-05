"use client";
import React, { useState } from "react";
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
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmitSignup = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/signup", data);
      if (response) {
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.log("Error occurred during sign up", error);
      toast({
        title: "Failed",
        description: "Sign up failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-6">
        Join Lyr!csForyou
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitSignup)}
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Input
                  {...field}
                  type="text"
                  autoComplete="username"
                  className="bg-gray-700 text-white"
                />
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
                  autoComplete="email"
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
                  autoComplete="current-password"
                  className="bg-gray-700 text-white"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Log In
          </span>
        </p>
        <p className="text-sm mt-2">
          Forgot your password?{" "}
          <span
            onClick={() => router.push("/forgot-password")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Reset Password
          </span>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUpPage;
