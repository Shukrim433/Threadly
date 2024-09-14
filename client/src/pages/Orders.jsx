import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "../components/Title/Title";
import convertToDateFormat from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { authenticatedUser } = useShopContext();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await axios.post("/api/order/userOrders");
    setMyOrders(res.data.orderData);
    /* console.log(res.data.orderData); */
  };

  useEffect(() => {
    fetchOrders();
  }, [authenticatedUser]); // when comp loads and or logged in user changes

  return myOrders.length > 0 ? (
    <div className="border-t pt-5 flex flex-col">
      {/* TITLE */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {/* MAP THRU ORDERS */}
      {myOrders.map((order) => (
        <div
          key={order._id}
          className="py-4 border-t-8 border-b text-gray-700 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex flex-col items-start  gap-6">
            <div>
              <b className="flex items-center gap-5 mt-3">
                Ordered: {convertToDateFormat(order.date)}
              </b>
              <b className="flex items-center gap-5 mt-3">
                Order total: £{order.amount}
              </b>
            </div>
            {/* MAP THRU ITEMS IN EACH ORDER */}
            {order.items.map((item) => (
              <>
                <div
                  className="flex items-center gap-5 mt-2 cursor-pointer"
                  onClick={() => navigate(`/products/${item._id}`)}
                >
                  <img
                    className="w-16 sm:w-20"
                    src={item.images[0]}
                    alt="product image"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {item.name}
                    </p>
                  </div>
                  <p>£{item.price}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-100">
                    {item.size}
                  </p>
                  <p className="flex items-center gap-5">
                    QTY: {item.quantity}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="text-center py-8 text-3xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="mt-10">YOU CURRENTLY DON'T HAVE ANY ORDERS.</div>
    </div>
  );
};

export default Orders;
