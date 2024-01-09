import { router } from "@inertiajs/react";
import { useRef } from "react";

const AddFoodModal = () => {
    const nameRef = useRef(null);
    const photoRef = useRef(null);
    const priceRef = useRef(null);

    const handleAddFood = () => {
        const name = nameRef.current.value.trim();
        const photo = photoRef.current.files[0];
        const price = priceRef.current.value.trim();

        if (!name || !photo || !price) {
            return;
        }

        router.post(route("food.store"), {
            nama: name,
            foto: photo,
            harga: price,
        });

        nameRef.current.value = "";
        photoRef.current.value = "";
        priceRef.current.value = "";
        document.getElementById("add_menu_modal").close();
    };

    return (
        <dialog id="add_menu_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-blue-400">
                    Tambahkan Menu!
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
                                min={0}
                                step={1000}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>

                        <div
                            className="btn btn-success w-fit"
                            onClick={handleAddFood}
                        >
                            Simpan
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default AddFoodModal;
