import React from 'react';

export const CatemLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" {...props}>
        <rect width="200" height="60" fill="#1a202c" rx="8"/>
        <text x="100" y="35" textAnchor="middle" fill="#d69e2e" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">
            CATEM
        </text>
        <text x="100" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial, sans-serif">
            Canal de Denuncias
        </text>
    </svg>
);
