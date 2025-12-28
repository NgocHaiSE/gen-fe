import { useState } from 'react';
import TopMutatedGenes from '../components/TopMutatedGenes';
import MutatedGenesTable from '../components/MutatedGenesTable';
import NormalGenesTable from '../components/NormalGenesTable';
import { cn } from '../utils/cn';

interface CancerInformationProps {
    type: string;
}

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
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-teal-900 uppercase border-b border-gray-200 pb-2">THÔNG TIN GEN ĐỘT BIẾN</h1>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all",
                                activeTab === tab.id
                                    ? "border-medical-primary text-medical-primary"
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
    );
}
