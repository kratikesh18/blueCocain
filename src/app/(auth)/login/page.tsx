"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import LeftArrow from "@/components/icons/LeftArrow";
import { useToast } from "@/hooks/use-toast";

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleSpotifyLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("spotify");

      toast({
        title: "Logging in ... Please wait",
        description:
          "After Successfull login you will be redirected to profile. Please wait...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white px-6">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-purple-500">
          Welcome to <span className="text-white">blueCocain</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Discover, Contribute, and Enjoy Music Lyrics. Join us to elevate your
          music experience—it’s completely free!
        </p>
      </div>

      {/* Spotify Login Button */}
      <div className="mt-12">
        <button
          onClick={handleSpotifyLogin}
          disabled={status === "loading"}
          className={`flex items-center gap-4 px-8 py-4 text-lg font-medium text-white rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${
            status == "loading"
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 focus:ring-green-400"
          }`}
        >
          {status == "loading" ? (
            <>
              <LeftArrow />
              Logging in...
            </>
          ) : (
            <>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Continue with Spotify
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-gray-500">
        By signing in, you agree to our{" "}
        <a href="#" className="text-purple-500 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-purple-500 hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default LoginPage;

// const onSubmitLogin = async (data: z.infer<typeof SignInSchema>) => {
//   setLoading(true);
//   // const result = await signIn("credentials", {
//   //   redirect: false,
//   //   identifier: data.identifier,
//   //   password: data.password,
//   // });

//   const result = await signIn("spotify");

//   if (result?.error) {
//     if (result.error === "CredentialsSignin") {
//       toast({
//         title: "Login Failed",
//         description: "Incorrect username or password",
//         variant: "destructive",
//       });
//       setLoading(false);
//     } else {
//       toast({
//         title: "Login Failed with Errors",
//         description: result.error,
//         variant: "destructive",
//       });
//       setLoading(false);
//     }
//   }
//   if (result?.url) {
//     setLoading(false);
//     // router.replace("/profile");
//   }
// };

/* <Form {...form}>
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
      </Form> */

/* <div className="mt-4">
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
      </div> */
