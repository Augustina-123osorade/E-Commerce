import { useState, useRef, useEffect } from "react";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

interface CartIconProps {
  cart: CartItem[];
}

export default function CartIcon({ cart }: CartIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Only add event listener when dropdown is open and on desktop
    if (isOpen && window.innerWidth >= 768) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Cart Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-full hover:bg-gray-100"
        >
            <img src="/images/icon-cart.svg" alt="cart"className="w-7 h-7 text-gray-700"  />
          

          {/* Item Count Badge */}
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>

        {/* Desktop Dropdown */}
        {isOpen && (
          <div className="hidden md:block absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border z-50">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              ) : (
                <>
                  <ul className="divide-y mb-4">
                    {cart.map((item, index) => (
                      <li key={index} className="py-2 flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Total */}
                  <div className="border-t pt-2 mb-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      alert(`Checkout ${cart.length} item(s) for $${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}`);
                      setIsOpen(false);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Cart Modal */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0  bg-opacity-50 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Modal */}
          <div className="relative p-4 pt-20">
            <div className="bg-white rounded-2xl shadow-2xl mx-auto max-w-sm animate-slide-down">
              {/* Header */}
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-gray-900">Cart</h2>
              </div>

              {/* Cart Content */}
              <div className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty.</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-3 mb-4">
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="font-semibold">${item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-orange-500">
                          ${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => {
                        alert(`Checkout ${cart.length} item(s) for ${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}`);
                        setIsOpen(false);
                      }}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
}