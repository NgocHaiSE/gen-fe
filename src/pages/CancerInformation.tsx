import { useState } from 'react';
import TopMutatedGenes from '../components/TopMutatedGenes';
import MutatedGenesTable from '../components/MutatedGenesTable';
import NormalGenesTable from '../components/NormalGenesTable';
import { cn } from '../utils/cn';
import { Dna } from 'lucide-react';

interface CancerInformationProps {
    type: string;
}

const getCancerName = (type: string) => {
    switch (type) {
        case 'lung-cancer': return 'Ung thư phổi';
        case 'liver-cancer': return 'Ung thư gan';
        case 'breast-cancer': return 'Ung thư vú';
        case 'thyroid-cancer': return 'Ung thư tuyến giáp';
        case 'colorectal-cancer': return 'Ung thư đại trực tràng';
        default: return type.replace(/-/g, ' ');
    }
};

export default function CancerInformation({ type }: CancerInformationProps) {
    const [activeTab, setActiveTab] = useState('topGene');

    const tabs = [
        { id: 'topGene', label: 'Top 20 gene' },
        { id: 'mutatedGenes', label: 'Gen phát hiện đột biến' },
        { id: 'normalGenes', label: 'Gen không phát hiện đột biến' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'topGene':
                return <TopMutatedGenes type={type} />;
            case 'mutatedGenes':
                return <MutatedGenesTable type={type} />;
            case 'normalGenes':
                return <NormalGenesTable type={type} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <Dna className="w-7 h-7 text-teal-500" />
                            Thông tin Gen Đột Biến
                        </h1>
                        <p className="text-slate-medium">
                            Phân tích gen đột biến cho {getCancerName(type)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all",
                                    activeTab === tab.id
                                        ? "border-teal-500 text-teal-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
