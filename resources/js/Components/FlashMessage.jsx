import { useEffect, useState } from "react";

const FlashMessage = ({ flash }) => {
    const [message, setMessage] = useState(flash.message);

    useEffect(() => {
        setMessage(flash.message);

        const timeoutId = setTimeout(() => {
            setMessage("");
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [flash.message]);

    const handleClose = () => {
        setMessage("");
    };

    return message ? (
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

export default FlashMessage;
