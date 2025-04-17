
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 ${isHomePage ? 'glass' : 'bg-background border-b'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">LandCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/features" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/templates" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Templates
          </Link>
          <Link 
            to="/pricing" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>

          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="default" className="btn-hover">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth?mode=login">
                <Button variant="ghost" className="btn-hover">
                  Log In
                </Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button variant="default" className="btn-hover">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <div className="p-6 flex flex-col space-y-6">
            <Link 
              to="/features" 
              className="text-foreground py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/templates" 
              className="text-foreground py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="text-foreground py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full" variant="default">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/auth?mode=login" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full" variant="outline">
                    Log In
                  </Button>
                </Link>
                <Link 
                  to="/auth?mode=register" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full" variant="default">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
