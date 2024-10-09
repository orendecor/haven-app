"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const AFTER_LOGIN_REDIRECT_URL = "/";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setErrorMessage("");

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrorMessage("Invalid email or password");
      } else {
        router.push(AFTER_LOGIN_REDIRECT_URL);
      }
    } catch (error) {
      setErrorMessage("Authentication failed. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="leading-7">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Label htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full"
              placeholder="Email address"
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            aria-disabled={pending}
            disabled={pending}
          >
            {pending && <Loader2 />}
            Sign in
          </Button>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            <div className="flex w-full items-center justify-between">
              <Image
                src="/images/google-logo.svg"
                alt="Google logo"
                width={20}
                height={20}
              />
              <span className="flex-grow text-center">Sign in with Google</span>
              <svg className="h-5 w-5 opacity-0" viewBox="0 0 24 24">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
