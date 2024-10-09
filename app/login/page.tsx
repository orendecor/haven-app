import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="hidden w-1/2 bg-primary lg:block">
        <div className="flex h-full items-center justify-center">
          <div className="text-primary-foreground items-center flex flex-col space-y-4">
            <Image src="/logo-white.png" alt="Haven Logo" width={300} height={40} />
            <h1 className="text-4xl font-bold">Welcome</h1>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full bg-background lg:w-1/2">
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground font-light">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
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
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} />
                    <span className="flex-grow text-center">Sign in with Google</span>
                    <svg className="h-5 w-5 opacity-0" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}