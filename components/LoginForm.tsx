"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/app/actions";
import {
    ExclamationCircleIcon,
  } from '@heroicons/react/24/outline';
import { Loader2 } from "lucide-react";
import { useFormStatus, useFormState } from 'react-dom'

const initialState = {
    message: '',
  }

export default function LoginForm() {
    const [state, formAction] = useFormState(authenticate, undefined)
    const { pending } = useFormStatus()

  return (
    <form action={formAction} className="mt-8 space-y-6" method="POST">
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
        <Button type="submit" className="w-full" aria-disabled={pending} disabled={pending}>
            {pending && <Loader2 />}
          Sign in
        </Button>
      </div>
      <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
    </form>
  );
}
