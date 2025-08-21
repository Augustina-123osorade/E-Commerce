import CartIcon from "@/pages/CartIcon";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useState, createContext, useContext } from "react";
import menuIcon from "/images/menu.svg";
import closeIcon from "/images/icon-close.svg";

// Create a context for cart management
type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const Route = createRootRoute({
  component: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    return (
      <CartContext.Provider value={{ cart, setCart }}>
        <header>
          <div className="flex items-center justify-between relative lg:mx-15 lg:my-5 border-b p-5">
            {/* Left: Hamburger (mobile) + Logo + Nav (desktop) */}
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                <img
                  src={isOpen ? closeIcon : menuIcon}
                  alt="menu toggle"
                  className=" w-6 h-6 bg-white"
                />
              </button>

              {/* Logo */}
              <Link to="/" className="text-xl font-bold">
                Sneakers
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex gap-4 text-gray-600">
                <Link to="/collections" className="[&.active]:font-bold">
                  Collections
                </Link>
                <Link to="/men" className="[&.active]:font-bold">
                  Men
                </Link>
                <Link to="/women" className="[&.active]:font-bold">
                  Women
                </Link>
                <Link to="/about" className="[&.active]:font-bold">
                  About
                </Link>
                <Link to="/contact" className="[&.active]:font-bold">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Right: Cart + Profile */}
            <div className="flex items-center gap-6">
              <CartIcon cart={cart} />

              <img
                src="/images/image-avatar.png"
                alt="profile image"
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div
            className={`fixed top-0 left-0 h-full w-2/3 bg-gray-900 text-white shadow-lg p-6 z-50 transform transition-transform duration-300 md:hidden ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex  mb-6">
              <button onClick={() => setIsOpen(false)} className="p-2">
                <img src={closeIcon} alt="close menu" className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-lg text-gray-700 mt-10">
              <Link to="/collections" onClick={() => setIsOpen(false)}>
                Collections
              </Link>
              <Link to="/men" onClick={() => setIsOpen(false)}>
                Men
              </Link>
              <Link to="/women" onClick={() => setIsOpen(false)}>
                Women
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>

          <Outlet />
        </header>
      </CartContext.Provider>
    );
  },
});
