import { useRef } from "react";
import ReactToPrint from "react-to-print";

import PrintedCart from "./PrintedCart";
import FEFlashMessage from "./FEFlashMessage";

const BillButtonAction = ({ showFlash, setShowFlash }) => {
    const printedComponentRef = useRef(null);

    const handleSaveBill = () => {
        setShowFlash(true);
    };

    return (
        <>
            <FEFlashMessage
                showFlash={showFlash}
                setShowFlash={setShowFlash}
                flash={{
                    message: "Pembayaran berhasil disimpan!",
                    type: "success",
                }}
            />

            <div className="flex gap-4">
                <button className="btn btn-success" onClick={handleSaveBill}>
                    Save Bill
                </button>

                <ReactToPrint
                    trigger={() => (
                        <button className="btn btn-success">Print Bill</button>
                    )}
                    content={() => printedComponentRef.current}
                    documentTitle={`${new Date().getMilliseconds()}_Bill`}
                />
            </div>

            <PrintedCart ref={printedComponentRef} />
        </>
    );
};

export default BillButtonAction;
