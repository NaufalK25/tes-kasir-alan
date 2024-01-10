import { forwardRef } from "react";

import useCart from "@/Hooks/useCart";

const PrintedCart = forwardRef(({}, ref) => {
    const { updatedCart: cart, totalPrice } = useCart();

    return (
        <>
            <table className="table table-xs" ref={ref}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Foto</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Total Harga Per Barang</th>
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
                            <td>{cartFood.count}</td>
                            <td>Rp. {cartFood.totalPrice}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={5}>Total Harga</td>
                        <td>Rp. {totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
});

export default PrintedCart;
