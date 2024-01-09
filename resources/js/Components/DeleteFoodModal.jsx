import { Link } from "@inertiajs/react";

const DeleteFoodModal = ({ food }) => {
    const handleDeleteFood = () => {
        document.getElementById(`delete_menu_modal_${food.id}`).close();
    };

    return (
        <dialog id={`delete_menu_modal_${food.id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-blue-400">
                    Hapus Menu {food.nama})!
                </h3>

                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>

                    <div className="flex flex-col gap-y-4">
                        <p>
                            Apakah anda yakin ingin menghapus makanan ini dari
                            menu?
                        </p>

                        <Link
                            href={route("food.destroy")}
                            method="delete"
                            data={{ id: food.id }}
                            as="button"
                            className="btn btn-success w-fit"
                            onClick={() => {
                                document
                                    .getElementById(
                                        `delete_menu_modal_${food.id}`
                                    )
                                    .close();
                            }}
                        >
                            Delete
                        </Link>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default DeleteFoodModal;
