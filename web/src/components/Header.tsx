import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react"; // Add this import
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "#23aaaa" }}
    >
      <div className="container mx-auto flex h-14 items-center max-w-5xl">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="/whiteLogo2-min.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        <div className="flex-1 mx-4 flex justify-center">
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="search" placeholder="Search..." className="bg-white" />
            <Button className="text-white flex items-center gap-2 cursor-pointer">
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                style={{ backgroundColor: "#feb708" }}
                className="flex items-center gap-2 cursor-pointer"
              >
                Menu
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
              style={{ backgroundColor: "#feb708" }}
              onClick={handleMenuClick}
            >
              {!isAuthenticated ? (
                <>
                  {" "}
                  <DropdownMenuItem>
                    <Link to="/" className="w-full">
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/login" className="w-full">
                      Log In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/register" className="w-full">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#" className="w-full" rel="noopener noreferrer">
                      Contact Us
                    </a>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link to="/tasks" className="w-full">
                      Tasks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
