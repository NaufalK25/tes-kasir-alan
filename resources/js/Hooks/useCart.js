import { useEffect, useState } from "react";

const useCart = () => {
    const updatedCart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(updatedCart);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart));

        const newTotalPrice = cart.reduce((acc, cur) => {
            acc += cur.totalPrice;
            return acc;
        }, 0);

        setTotalPrice(newTotalPrice);
    }, [cart]);

    return {
        cart,
        setCart,
        updatedCart,
        totalPrice,
    };
};

export default useCart;
