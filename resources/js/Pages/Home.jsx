import { Head } from "@inertiajs/react";
import { useState } from "react";

import FlashMessage from "@/Components/FlashMessage";
import FoodTab from "@/Partials/FoodTab";
import TransactionTab from "@/Partials/TransactionTab";

const Home = ({ flash, foods }) => {
    const [activeTab, setActiveTab] = useState(
        window.localStorage.getItem("activeTab") || "Food"
    );

    const TABS = {
        Food: <FoodTab foods={foods} />,
        Transaksi: <TransactionTab foods={foods} />,
    };

    const handleActiveTabClick = (tab) => {
        window.localStorage.setItem("activeTab", tab);
        setActiveTab(tab);
    };

    return (
        <>
            <Head title={activeTab} />
            <FlashMessage flash={flash} />

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

            {TABS[activeTab] || null}
        </>
    );
};

export default Home;
