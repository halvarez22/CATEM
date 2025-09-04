import React from 'react';

interface KPICardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, description, icon }) => {
    return (
        <div className="bg-[#2d3748] p-5 rounded-lg shadow-lg flex items-start gap-4">
            <div className="bg-[#d69e2e]/20 text-[#d69e2e] p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-400">{title}</p>
                <p className="text-3xl font-bold text-slate-100">{value}</p>
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            </div>
        </div>
    );
}

export default KPICard;
