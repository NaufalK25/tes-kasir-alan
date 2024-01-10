import { useEffect } from "react";

const FEFlashMessage = ({ showFlash, setShowFlash, flash }) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowFlash(false);
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [showFlash]);

    const handleClose = () => {
        setShowFlash(false);
    };

    return showFlash ? (
        <div className="toast toast-top toast-end">
            <div className={`relative alert alert-${flash.type}`}>
                <span>{flash.message}</span>

                <button onClick={handleClose}>
                    <span>✕</span>
                </button>
            </div>
        </div>
    ) : null;
};

export default FEFlashMessage;
