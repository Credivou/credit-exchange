import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from 'lucide-react';
import SignUpSheet from '@/components/auth/SignUpSheet';
import LoginSheet from '@/components/auth/LoginSheet';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, login, logout, getUserData } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out successfully");
  };

  const handleLoginSuccess = () => {
    // Get user data and pass it to login
    const userData = getUserData();
    if (userData) {
      login(userData);
      toast.success("Welcome back to Credivou!");
    }
  };

  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Listings',
    path: '/listings'
  }, {
    name: 'How It Works',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-medium-blue text-3xl font-bold">Credivou</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm transition-all hover:text-medium-blue ${location.pathname === item.path ? 'font-medium text-medium-blue' : 'text-gray-700'}`}>
                  {item.name}
                </Link>)}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  className="rounded-full px-5 transition-all hover:bg-destructive hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="rounded-full px-5 transition-all hover:bg-medium-blue hover:text-white"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="rounded-full px-5 bg-medium-blue hover:bg-medium-blue/90 transition-all"
                    onClick={() => setIsSignUpOpen(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm py-2 transition-all ${location.pathname === item.path ? 'font-medium text-medium-blue' : 'text-gray-700'}`}>
                    {item.name}
                  </Link>)}
                <div className="flex flex-col space-y-3 pt-4">
                  {isLoggedIn ? (
                    <Button
                      variant="outline"
                      className="w-full justify-center rounded-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-center rounded-full"
                        onClick={() => setIsLoginOpen(true)}
                      >
                        Log In
                      </Button>
                      <Button
                        className="w-full justify-center rounded-full bg-medium-blue hover:bg-medium-blue/90"
                        onClick={() => setIsSignUpOpen(true)}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>}
        </div>
      </nav>

      {/* Auth Modals */}
      <SignUpSheet 
        open={isSignUpOpen} 
        onOpenChange={setIsSignUpOpen}
        onSuccess={() => setIsLoginOpen(true)}
      />
      
      <LoginSheet 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
