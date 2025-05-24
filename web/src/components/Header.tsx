import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Task List App</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/tasks">
                  <Button variant="ghost">Tasks</Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
