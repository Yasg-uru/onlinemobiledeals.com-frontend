import { Link } from "react-router-dom";

import { Moon, Sun, Home, Search, PlusCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuthContext } from "@/context/authcontext";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, handleLogout,user } = useAuthContext();
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden sm:flex items-center justify-between p-4 bg-background border-b">
        <Link to="/" className="text-2xl font-bold italic">
          onlinemobiledeals.com
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-foreground hover:text-primary">
            Home
          </Link>
          <Link to="/search" className="text-foreground hover:text-primary">
            Search
          </Link>
         { user && user.Role==='admin' && isAuthenticated && <Link
            to="/add-product"
            className="text-foreground hover:text-primary"
          >
            Add Product
          </Link>}
          {isAuthenticated ? (
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1"
            >
              Logout
            </Button>
          ) : (
            <Link to={`/login`}>
              <Button variant="outline" className="flex-1">
                Login
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-4"
          >
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden flex items-center justify-around p-4 bg-background border-t">
        <Link to="/" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/add-product" className="flex flex-col items-center">
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </Button>
      </nav>
    </>
  );
}
