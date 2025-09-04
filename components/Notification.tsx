import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                handleClose();
            }, 5000); // Hide after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleClose = () => {
        setVisible(false);
        // Allow time for fade-out animation before calling onClose
        setTimeout(onClose, 300);
    }

    if (!message) return null;

    return (
        <div 
            aria-live="assertive"
            className={`fixed top-5 right-5 z-50 transition-all duration-300 ease-in-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
            <div className="max-w-sm w-full bg-[#2d3748] shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border border-[#4a5568]">
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                             <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-slate-100">Notificación</p>
                            <p className="mt-1 text-sm text-slate-400">{message}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                onClick={handleClose}
                                className="bg-[#2d3748] rounded-md inline-flex text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d69e2e]"
                            >
                                <span className="sr-only">Cerrar</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
