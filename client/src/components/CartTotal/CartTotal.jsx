import React from "react";
import { useShopContext } from "../../context/ShopContext";
import Title from "../Title/Title";

const CartTotal = () => {
  const { getCartTotal } = useShopContext();
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>£{getCartTotal()}.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>£5.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <b>Total</b>
            <b>£{getCartTotal() === 0 ? 0 : getCartTotal() + 5}.00</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
