import { Edit, Plus, Trash } from "react-feather";

import AddFoodModal from "@/Components/AddFoodModal";
import DeleteFoodModal from "@/Components/DeleteFoodModal";
import EditFoodModal from "@/Components/EditFoodModal";

const FoodTab = ({ foods }) => {
    return (
        <>
            <AddFoodModal />
            {foods.map((food) => (
                <div key={food.id}>
                    <DeleteFoodModal food={food} />
                    <EditFoodModal food={food} />
                </div>
            ))}

            <div className="flex flex-col gap-y-8 p-2 md:py-10 md:px-20">
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
                                        <td className="md:space-x-2">
                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `edit_menu_modal_${food.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                <Edit className="text-warning" />
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
        </>
    );
};

export default FoodTab;
