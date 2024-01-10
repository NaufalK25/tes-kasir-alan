import { useRef, useState } from "react";

import useCart from "@/Hooks/useCart";
import FEFlashMessage from "./FEFlashMessage";

const TransactionDetailModal = ({ showFlash, setShowFlash }) => {
    const [change, setChange] = useState(0);
    const moneyRef = useRef(null);
    const { updatedCart: cart, setCart, totalPrice } = useCart();

    const handlePay = () => {
        const money = moneyRef.current.value;

        if (money < totalPrice) {
            return;
        }

        setChange(money - totalPrice);
        moneyRef.current.value = "";
        setChange(0);
        setCart([]);
        document.getElementById("transaction_detail_modal").close();
        setShowFlash(true);
    };

    return (
        <>
            <FEFlashMessage
                showFlash={showFlash}
                setShowFlash={setShowFlash}
                flash={{
                    message: "Pembayaran berhasil dilakukan!",
                    type: "success",
                }}
            />

            <dialog id="transaction_detail_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-blue-400">
                        Detail Pesanan
                    </h3>

                    <div className="flex gap-4">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nama</th>
                                    <th>Foto</th>
                                    <th>Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((cartFood, idx) => (
                                    <tr className="hover" key={cartFood.id}>
                                        <th>{idx + 1}</th>
                                        <td>{cartFood.nama}</td>
                                        <td>
                                            <img
                                                src={cartFood.foto}
                                                alt={cartFood.nama}
                                                width={100}
                                            />
                                        </td>
                                        <td>Rp. {cartFood.harga}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>

                            <div className="flex flex-col gap-y-4">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">
                                            Uang Pembeli (Rp.)
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        ref={moneyRef}
                                        min={0}
                                        step={1000}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>

                                <div className="flex gap-4">
                                    <button className="btn btn-outline w-fit">
                                        Close
                                    </button>
                                    <div
                                        className="btn btn-primary w-fit"
                                        onClick={handlePay}
                                    >
                                        Pay!
                                    </div>
                                </div>

                                <p className="text-error">
                                    Kembalian: Rp. {change}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default TransactionDetailModal;
