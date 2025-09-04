import React, { useState } from 'react';
import type { View } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface LoginProps {
    onLoginSuccess: (redirectTo: View) => void;
    redirectTo: View;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, redirectTo }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!username || !password) {
            setError('Por favor, ingrese usuario y contraseña.');
            return;
        }

        setIsLoading(true);
        // Simulate network delay for authentication
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                onLoginSuccess(redirectTo);
            } else {
                setError('Credenciales incorrectas. Por favor, intente de nuevo.');
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in max-w-md mx-auto">
            <div className="text-center mb-6">
                <ShieldCheckIcon className="w-12 h-12 text-[#d69e2e] mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-slate-100">Acceso Interno</h2>
                <p className="text-sm text-slate-400 mt-2">Ingrese sus credenciales para acceder al sistema de gestión.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        placeholder="admin"
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password"
                           className="block text-sm font-medium text-slate-300 mb-1">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && <p role="alert" className="text-[#e9b54f] text-sm text-center">{error}</p>}
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-[#d69e2e] hover:bg-[#b88a2a] disabled:bg-[#9a7224] disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
                >
                    {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Iniciando Sesión...
                        </>
                    ) : (
                        'Iniciar Sesión'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;
