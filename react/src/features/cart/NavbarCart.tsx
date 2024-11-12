import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Button } from "../../ui/Button";
import { formatPrice } from "../../utils/priceFormat";
import { CartPreview } from "./CartPreview";
export default function NavbarCart() {
  const [showCartProducts, setShowCartProducts] = useState<boolean>(false);
  const { cart, totalCartItems } = useCart();

  return (
    <div
      onMouseEnter={() => setShowCartProducts(true)}
      onMouseLeave={() => setShowCartProducts(false)}
      className="relative flex gap-3"
    >
      <Link to="/cart" className="relative rounded-full bg-orange-500 p-3">
        <BsCart3 size={21} color="white" />
        <span className="absolute right-[-3px] top-[-3px] h-5 w-5 rounded-full bg-red-500 text-center text-xs leading-5 text-white">
          {totalCartItems || 0}
        </span>
      </Link>
      <div className="hidden leading-tight lg:block">
        <p className="text-sm leading-5 text-gray-500">Cart</p>
        <div className="min-w-24">
          <span className="font-semibold text-gray-600">
            {cart ? formatPrice(cart?.totalAmount) : formatPrice(0)}
          </span>
          <MdArrowDropDown className="ml-0.5 inline" />
        </div>
      </div>
      <div
        className={`absolute -bottom-[6rem] right-0 z-10 w-96 duration-300 md:right-10 ${showCartProducts ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {showCartProducts && (
          <div className="relative z-30 mt-10 flex h-20 flex-col">
            <div className="relative rounded-lg border bg-gray-50 shadow">
              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {`${cart && cart?.cartItems?.length > 0 ? `Your cart (${cart?.cartItems?.length})` : "Your cart is empty, add products and keep on shopping!"}`}
                </h3>
                {cart && <CartPreview cart={cart} />}
              </div>
              {cart && (
                <div className="w-full bg-white px-5 py-5">
                  <Button urlPath={"/cart"} size="full" color="blue">
                    Jumb to Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
