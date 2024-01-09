import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Edit, Plus, Trash } from "react-feather";

import AddFoodModal from "@/Components/AddFoodModal";
import DeleteFoodModal from "@/Components/DeleteFoodModal";
import EditFoodModal from "@/Components/EditFoodModal";
import FlashMessage from "@/Components/FlashMessage";

const Home = ({ flash, foods }) => {
    const [activeTab, setActiveTab] = useState(
        window.localStorage.getItem("activeTab") || "Food"
    );

    const handleActiveTabClick = (tab) => {
        window.localStorage.setItem("activeTab", tab);
        setActiveTab(tab);
    };

    return (
        <>
            <Head title={activeTab} />
            <FlashMessage flash={flash} />

            <AddFoodModal />
            {foods.map((food) => (
                <div key={food.id}>
                    <DeleteFoodModal food={food} />
                    <EditFoodModal food={food} />
                </div>
            ))}

            <div className="navbar bg-blue-400 text-white">
                <a className="md:ml-16 btn btn-ghost text-xl">Alan Resto</a>
            </div>
            <div className="flex bg-white gap-x-8">
                <a
                    className={`${
                        activeTab === "Food"
                            ? "border border-b-2 border-transparent border-b-blue-400 text-blue-400"
                            : "text-black"
                    } ml-4 md:ml-24 tab font-bold`}
                    onClick={() => handleActiveTabClick("Food")}
                >
                    Food
                </a>
                <a
                    className={`${
                        activeTab === "Transaksi"
                            ? "border border-b-2 border-transparent border-b-blue-400 text-blue-400"
                            : "text-black"
                    } tab font-bold`}
                    onClick={() => handleActiveTabClick("Transaksi")}
                >
                    Transaksi
                </a>
            </div>

            {activeTab === "Food" ? (
                <div className="flex flex-col gap-y-8 py-10 px-20">
                    <p className="text-gray-400">
                        Tambahkan menu makanan yang ada di resto
                    </p>

                    <div className="flex flex-col gap-y-8">
                        <button
                            className="btn btn-primary w-fit"
                            onClick={() =>
                                document
                                    .getElementById("add_menu_modal")
                                    .showModal()
                            }
                        >
                            <Plus /> Tambah Menu
                        </button>

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th>Foto</th>
                                        <th>Harga</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foods.map((food, idx) => (
                                        <tr className="hover" key={food.id}>
                                            <th>{idx + 1}</th>
                                            <td>{food.nama}</td>
                                            <td>
                                                <img
                                                    src={food.foto}
                                                    alt={food.nama}
                                                    width={100}
                                                />
                                            </td>
                                            <td>Rp. {food.harga}</td>
                                            <td className="space-x-2">
                                                <button
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `edit_menu_modal_${food.id}`
                                                            )
                                                            .showModal()
                                                    }
                                                >
                                                    <Edit className="text-accent" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `delete_menu_modal_${food.id}`
                                                            )
                                                            .showModal()
                                                    }
                                                >
                                                    <Trash className="text-error" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : null}
            {activeTab === "Transaksi" ? <dir>Transaksi</dir> : null}
        </>
    );
};

export default Home;
