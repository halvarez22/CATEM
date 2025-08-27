import React from 'react';
import type { View } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface HeaderProps {
    onNavigate: (view: View) => void;
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
    const getButtonClass = (view: View) => {
        return currentView === view
            ? 'bg-[#d69e2e] text-white'
            : 'bg-[#374151] hover:bg-[#4a5568] text-slate-300';
    };
    
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center w-full pb-4 border-b border-[#374151]">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
                <ShieldCheckIcon className="w-8 h-8 text-[#d69e2e]" />
                <h1 className="text-2xl font-bold text-slate-100">Canal de Denuncias CATEM</h1>
            </div>
            <nav className="flex items-center gap-2">
                 <button onClick={() => onNavigate('form')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('form')}`}>
                    Nuevo Reporte
                </button>
                <button onClick={() => onNavigate('track')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('track')}`}>
                    Seguimiento
                </button>
            </nav>
        </header>
    );
}

export default Header;