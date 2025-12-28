import React from 'react';

interface InfoCardProps {
    title: string;
    index: number;
    desc: string;
    href: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg p-5 min-w-[220px] flex-1 border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-medical-primary text-white font-bold rounded-lg shadow-sm text-lg">
                    {index}
                </div>
                <div className="text-base font-semibold text-gray-800">
                    {title}
                </div>
            </div>
            <div className="text-sm text-gray-600 text-justify leading-relaxed mb-4 min-h-[80px]">
                {desc}
            </div>
            {href && (
                <a href={href} className="text-medical-primary hover:text-medical-primary-hover font-medium text-sm inline-flex items-center transition-colors">
                    Tìm hiểu thêm <span className="ml-1">&gt;</span>
                </a>
            )}
        </div>
    );
};
