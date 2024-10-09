import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/config/auth.config";

export default async function LoginPage() {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="hidden w-1/2 bg-primary lg:block">
        <div className="flex h-full items-center justify-center">
          <div className="text-primary-foreground items-center flex flex-col space-y-10">
            <Image
              src="/images/logo-white.png"
              alt="Haven Logo"
              width={300}
              height={40}
            />
            <h1 className="text-3xl font-light uppercase">Welcome</h1>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full bg-background lg:w-1/2">
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="mt-6 text-center text-3xl text-foreground font-light">
                Sign in to your account
              </h2>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
