import { router } from "@inertiajs/react";
import { useRef } from "react";

const EditFoodModal = ({ food }) => {
    const nameRef = useRef(null);
    const photoRef = useRef(null);
    const priceRef = useRef(null);

    const handleEditFood = () => {
        const name = nameRef.current.value.trim();
        const photo = photoRef.current.files[0];
        const price = priceRef.current.value.trim();

        router.post(route("food.update"), {
            id: food.id,
            nama: name,
            foto: photo,
            harga: price,
        });

        photoRef.current.value = "";
        document.getElementById(`edit_menu_modal_${food.id}`).close();
    };

    return (
        <dialog id={`edit_menu_modal_${food.id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-blue-400">
                    Edit Menu ({food.nama})!
                </h3>

                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>

                    <div className="flex flex-col gap-y-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name Menu</span>
                            </div>
                            <input
                                type="text"
                                ref={nameRef}
                                defaultValue={food.nama}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Foto Menu</span>
                            </div>
                            <input
                                type="file"
                                ref={photoRef}
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Harga Menu (Rp.)
                                </span>
                            </div>
                            <input
                                type="number"
                                ref={priceRef}
                                defaultValue={food.harga}
                                min={0}
                                step={1000}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>

                        <div
                            className="btn btn-success w-fit"
                            onClick={handleEditFood}
                        >
                            Simpan
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditFoodModal;
