import React from 'react';
import type { View } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { LoginIcon } from './icons/LoginIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
    onNavigate: (view: View) => void;
    currentView: View;
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, isAuthenticated, onLogout }) => {
    const getButtonClass = (view: View) => {
        return currentView === view || (view === 'dashboard' && currentView.includes('Dashboard'))
            ? 'bg-[#d69e2e] text-white'
            : 'bg-[#374151] hover:bg-[#4a5568] text-slate-300';
    };
    
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center w-full h-16 border-b border-[#374151] overflow-visible relative">
            <div className="flex items-center gap-4 mb-4 sm:mb-0 cursor-pointer overflow-visible" onClick={() => onNavigate('form')}>
                <img 
                    src="/images/logo_catem.png" 
                    alt="Logo CATEM" 
                    className="h-28 w-auto object-contain"
                />
                <h1 className="text-2xl font-bold text-slate-100">Canal de Denuncias CATEM</h1>
            </div>
            <nav className="flex items-center gap-2 flex-wrap justify-center">
                {!isAuthenticated && (
                    <>
                        <button onClick={() => onNavigate('form')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('form')}`}>
                            Nuevo Reporte
                        </button>
                        <button onClick={() => onNavigate('track')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('track')}`}>
                            Seguimiento
                        </button>
                    </>
                )}
                {isAuthenticated ? (
                    <>
                        <button onClick={() => onNavigate('dashboard')} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('dashboard')}`}>
                            <ShieldCheckIcon className="w-5 h-5 mr-2"/>
                            Atención a Quejas
                        </button>
                        <button onClick={() => onNavigate('managerialDashboard')} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('managerialDashboard')}`}>
                            <ChartBarIcon className="w-5 h-5 mr-2"/>
                            Dashboard Gerencial
                        </button>
                        <button onClick={onLogout} className="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-red-600/80 hover:bg-red-700/80 text-white">
                            <LogoutIcon className="w-5 h-5 mr-2"/>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <button onClick={() => onNavigate('dashboard')} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-[#374151] hover:bg-[#4a5568] text-slate-300`}>
                        <LoginIcon className="w-5 h-5 mr-2"/>
                        Acceso Interno
                    </button>
                )}
            </nav>
        </header>
    );
}

export default Header;