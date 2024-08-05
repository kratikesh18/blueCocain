"use client";
import { SignInSchema } from "@/schemas/SignInSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/profile");
  }
  const { toast } = useToast();

  const onSubmitLogin = async (data: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
        setLoading(false);
      } else {
        toast({
          title: "Login Failed with Errors",
          description: result.error,
          variant: "destructive",
        });
        setLoading(false);
      }
    }
    if (result?.url) {
      setLoading(false);
      router.replace("/profile");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-700 to-black text-white">
      <h1 className="text-3xl theme-text-style font-bold tracking-tight lg:text-4xl mb-6">
        Join blueCocain
      </h1>
      <p>Contribute & Enjoy</p>
      <p>Its Free!</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitLogin)}
          className="backdrop-blur-xl border-[1px] border-gray-400/30  p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <FormField
            name="identifier"
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
            {loading ? "Loggin In..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        <p className="text-sm">
          Not have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            Create One
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
    </div>
  );
};

export default LoginPage;
