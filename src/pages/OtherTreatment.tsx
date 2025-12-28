import LungTreatment from '../components/OtherTreatment/LungTreatment';
import LiverTreatment from '../components/OtherTreatment/LiverTreatment';
import BreastTreatment from '../components/OtherTreatment/BreastTreatment';
import ThyroidTreatment from '../components/OtherTreatment/ThyroidTreatment';
import ColorectalTreatment from '../components/OtherTreatment/ColorectalTreatment';

interface OtherTreatmentProps {
    type: string;
}

const OtherTreatment = ({ type }: OtherTreatmentProps) => {
    const renderContent = () => {
        switch (type) {
            case 'lung-cancer':
                return <LungTreatment />;
            case 'liver-cancer':
                return <LiverTreatment />;
            case 'breast-cancer':
                return <BreastTreatment />;
            case 'thyroid-cancer':
                return <ThyroidTreatment />;
            case 'colorectal-cancer':
                return <ColorectalTreatment />;
            default:
                return (
                    <div className="p-6 bg-white rounded-xl shadow-sm">
                        <p className="text-slate-medium">Không tìm thấy thông tin điều trị.</p>
                    </div>
                );
        }
    };

    return (
        <div className="animate-fade-in">
            {renderContent()}
        </div>
    );
};

export default OtherTreatment;
