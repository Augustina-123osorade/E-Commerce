import { useState } from "react";
import { useCart } from "@/routes/__root";

export default function MainPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const { setCart } = useCart();

  // Array of image paths
  const images = [
    "/images/image-product-1.jpg",
    "/images/image-product-2.jpg", 
    "/images/image-product-3.jpg",
    "/images/image-product-4.jpg"
  ];

  const thumbnails = [
    "/images/image-product-1-thumbnail.jpg",
    "/images/image-product-2-thumbnail.jpg",
    "/images/image-product-3-thumbnail.jpg", 
    "/images/image-product-4-thumbnail.jpg"
  ];

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // stop at 1
  };

  const handleAddToCart = () => {
    const newItem = {
      name: "Fall Limited Edition Sneakers",
      price: 125,
      quantity,
    };

    // If item already exists in cart, update quantity
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.name === newItem.name
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });

    setQuantity(1); // reset counter
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:mx-20 lg:my-10">
      {/* Product Images */}
      <div className="flex-1 w-full lg:max-w-lg">
        {/* Mobile Image Carousel */}
        <div className="relative md:hidden">
          <img
            src={images[selectedImageIndex]}
            alt="shoe"
            className="w-full h-80 object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImageIndex === index ? 'bg-orange-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Image Gallery */}
        <div className="hidden md:block">
          <img
            src={images[selectedImageIndex]}
            alt="shoe"
            className="rounded-lg mb-4 w-full"
          />
          <div className="flex gap-4">
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Product view ${index + 1}`}
                className={`w-20 h-20 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedImageIndex === index 
                    ? 'border-orange-500 border-2 opacity-60' 
                    : 'border-gray-300 hover:border-orange-300'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 w-full">
        <div className="flex flex-col gap-4 p-4 lg:p-10">
          <span className="uppercase tracking-wide text-sm text-gray-500 font-semibold">
            Sneaker Company
          </span>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Fall Limited Edition Sneakers
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between md:justify-start md:gap-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">$125.00</span>
              <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded">
                50%
              </span>
            </div>
            <span className="line-through text-gray-400 text-lg md:hidden">$250.00</span>
          </div>
          <span className="line-through text-gray-400 hidden md:block">$250.00</span>

          {/* Quantity + Cart - Mobile Stack */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Quantity counter */}
            <div className="flex items-center justify-between md:justify-center bg-gray-100 rounded-lg md:w-auto">
              <button
                onClick={handleDecrease}
                className="px-4 py-3 text-orange-500 font-bold text-xl"
              >
                -
              </button>
              <span className="px-6 font-bold text-lg">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-4 py-3 text-orange-500 font-bold text-xl"
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
            >
                <img src="/images/icon-cart.svg" alt="cart"className="w-5 h-5 " />
              
              Add to cart
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
}