import React from 'react';

interface ChartDataItem {
    label: string;
    value: number;
    color: string;
}

interface SimpleBarChartProps {
    title: string;
    data: ChartDataItem[];
    onBarClick: (label: string) => void;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ title, data, onBarClick }) => {
    const maxValue = Math.max(...data.map(item => item.value), 0);

    return (
        <div className="bg-[#2d3748] p-5 rounded-lg shadow-lg h-full">
            <h3 className="text-lg font-bold text-slate-100 mb-4 border-b border-[#374151] pb-2">{title}</h3>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.label} className="group">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-slate-300">{item.label}</span>
                            <span className="font-semibold text-slate-200">{item.value}</span>
                        </div>
                        <div 
                            className="w-full bg-[#374151] rounded-full h-4 cursor-pointer"
                            onClick={() => onBarClick(item.label)}
                            title={`Ver reportes de '${item.label}'`}
                        >
                            <div
                                className={`h-4 rounded-full group-hover:opacity-80 transition-all duration-300`}
                                style={{ width: `${(item.value / maxValue) * 100}%`, backgroundColor: item.color }}
                            ></div>
                        </div>
                    </div>
                ))}
                 {data.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-8">No hay datos para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default SimpleBarChart;
