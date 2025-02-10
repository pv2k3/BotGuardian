import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bot, LayoutDashboard, User } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b bg-card/50 backdrop-blur-sm transition-colors duration-200 hover:bg-card/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer transition-transform duration-200 hover:scale-105">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  BotDetect
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="transition-colors duration-200 hover:bg-primary/20"
                >
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  variant="ghost"
                  className="transition-colors duration-200 hover:bg-primary/20"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/account">
                <Button 
                  variant="ghost"
                  className="transition-colors duration-200 hover:bg-primary/20"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}