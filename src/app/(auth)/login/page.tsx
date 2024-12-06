"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LeftArrow from "@/components/icons/LeftArrow";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {status} = useSession();

  useEffect(()=>{
    if(status === "authenticated"){
      router.replace("/profile")
    }
  },[status])


  const handleSpotifyLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn("spotify");
      if (result?.ok) {
        router.replace("/profile");
      } else {
        console.error("Error logging in:", result?.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight theme-text-style">
          Join <span className="text-green-500">blueCocain</span>
        </h1>
        <p className="text-lg text-gray-300">Contribute, Discover, and Enjoy Music Lyrics. It’s Free!</p>
      </div>

      <button
        onClick={handleSpotifyLogin}
        disabled={loading}
        className={`mt-8 flex items-center gap-3 px-6 py-3 text-lg font-medium text-white rounded-lg shadow-lg transition ${
          loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
        }`}
      >
        {loading ? (
          <>
           <LeftArrow/>
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