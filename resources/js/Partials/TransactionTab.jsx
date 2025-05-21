import React, { useState } from "react";
import { User } from "react-feather";

import BillButtonAction from "@/Components/BillButtonAction";
import TransactionDetailModal from "@/Components/TransactionDetailModal";
import useCart from "@/Hooks/useCart";

const TransactionTab = ({ foods }) => {
    const [showFlash, setShowFlash] = useState(false);
    const { updatedCart: cart, setCart, totalPrice } = useCart();

    const handleAddToCart = (food) => {
        const updatedCart = [...cart];

        const isFoodExists = updatedCart.find(
            (cartFood) => cartFood.id === food.id
        );

        if (isFoodExists) {
            isFoodExists.count += 1;
            isFoodExists.totalPrice += food.harga;
        } else {
            updatedCart.push({
                ...food,
                count: 1,
                totalPrice: food.harga,
            });
        }

        setCart(updatedCart);
    };

    const handleClearCart = () => {
        setCart([]);
    };

    return (
        <>
            <TransactionDetailModal
                showFlash={showFlash}
                setShowFlash={setShowFlash}
            />

            <div className="flex gap-x-20 py-10 px-20">
                <div className="grid grid-cols-3 gap-12">
                    {foods.map((food) => (
                        <div
                            className="card w-48 h-fit bg-base-100 shadow-xl cursor-pointer"
                            key={food.id}
                            onClick={() => handleAddToCart(food)}
                        >
                            <figure>
                                <img src={food.foto} alt={food.nama} />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{food.nama}</h2>
                                <p className="text-blue-400">
                                    Rp. {food.harga}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">
                                <User /> Pesanan
                            </h2>

                            {cart.map((cartFood) => (
                                <div
                                    className="flex items-center gap-4"
                                    key={cartFood.id}
                                >
                                    <img
                                        src={cartFood.foto}
                                        alt={cartFood.nama}
                                        width={100}
                                    />
                                    <p>{cartFood.nama}</p>
                                    <p className="font-bold">
                                        &times;{cartFood.count}
                                    </p>
                                    <p className="text-blue-400">
                                        Rp. {cartFood.totalPrice}
                                    </p>
                                </div>
                            ))}

                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </button>
                                <BillButtonAction
                                    showFlash={showFlash}
                                    setShowFlash={setShowFlash}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "transaction_detail_modal"
                                            )
                                            .showModal()
                                    }
                                >
                                    Charge Rp. {totalPrice}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionTab;
