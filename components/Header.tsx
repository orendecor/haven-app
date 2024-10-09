"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  MessageCircle,
  MessageSquarePlus,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Header() {
    return (
        <header className="h-16 border-b flex items-center justify-between px-4">
              <div className="flex items-center flex-1">
                <Input
                  type="search"
                  placeholder="How can you help?"
                  className="w-full max-w-sm"
                />
              </div>
              <nav className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Haven
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquarePlus className="h-5 w-5 mr-2" />
                  Send Feedback
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent"
                    >
                      <Avatar>
                        <AvatarImage alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <Link href="/profile"><span>Profile</span></Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </header>
    )
}