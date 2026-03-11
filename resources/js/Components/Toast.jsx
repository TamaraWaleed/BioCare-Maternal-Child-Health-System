import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Toast({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for fade-out animation
    };

    if (!visible) return null;

    const styles = {
        success: 'bg-office-colorful-ribbon dark:bg-office-accent border-office-colorful-border dark:border-office-black-border',
        error: 'bg-red-600 dark:bg-red-700 border-red-800',
    };

    const icons = {
        success: <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 mr-2" />,
        error: <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 mr-2" />,
    };

    return (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center p-4 min-w-[300px] text-white rounded-lg shadow-lg border transition-all duration-300 transform translate-y-0 opacity-100 ${styles[type]}`}>
            <div className="flex-1 flex items-center font-medium">
                {icons[type]}
                {message}
            </div>
            <button
                onClick={handleClose}
                className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
        </div>
    );
}
