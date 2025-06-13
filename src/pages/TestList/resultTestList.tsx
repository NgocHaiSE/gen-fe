import { Collapse, Tag, Descriptions, Button, Badge, Card, Tabs, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { testCaseEp } from '../EndPoint';
import { Link, useNavigate, useSearchParams } from '@umijs/max';
import { 
  UserIcon, 
  ClipboardDocumentListIcon,
  BeakerIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ChevronRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const { TabPane } = Tabs;

interface GeneDetail {
  RS_ID: string;
  Nucleotide: string;
  Protein: string;
  VariationType: string;
  Position: string;
  DrugResponse: string;
  VariantRate: number;
  ReadDepth: number;
}

interface GeneData {
  Gene: string;
  details: GeneDetail[];
}

interface DrugResponseInfo {
  text: string;
  color: string;
  priority: number;
}

const translateDrugResponse = (response: string): DrugResponseInfo => {
  switch (response) {
    case 'Pathogenic':
      return { text: 'Gây bệnh', color: 'text-red-700 bg-red-50 border-red-200', priority: 1 };
    case 'Pathogenic/Likely pathogenic':
      return { text: 'Gây bệnh/Có khả năng gây bệnh', color: 'text-orange-700 bg-red-50 border-red-200', priority: 2 };
    case 'Likely pathogenic':
      return { text: 'Có khả năng gây bệnh', color: 'text-red-600 bg-orange-50 border-orange-200', priority: 3 };
    case 'Uncertain significance':
      return { text: 'Chưa xác định', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', priority: 4 };
    case 'VUS':
      return { text: 'Đột biến chưa rõ ý nghĩa (VUS)', color: 'text-gray-700 bg-gray-50 border-gray-200', priority: 5 };
    case 'Benign':
      return { text: 'Lành tính', color: 'text-green-700 bg-green-50 border-green-200', priority: 6 };
    case 'Benign/Likely benign':
      return { text: 'Lành tính/Có khả năng lành tính', color: 'text-teal-700 bg-teal-50 border-teal-200', priority: 7 };
    case 'Likely benign':
      return { text: 'Có khả năng lành tính', color: 'text-cyan-700 bg-cyan-50 border-cyan-200', priority: 8 };
    default:
      return { text: response || 'Không xác định', color: 'text-gray-700 bg-gray-50 border-gray-200', priority: 9 };
  }
};

const getVariationTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'SNV': 'bg-blue-100 text-blue-700 border-blue-200',
    'Insertion': 'bg-green-100 text-green-700 border-green-200',
    'Deletion': 'bg-red-100 text-red-700 border-red-200',
    'Substitution': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'default': 'bg-gray-100 text-gray-600 border-gray-200'
  };
  return colors[type] || colors['default'];
};

const ResultTest = () => {
  const [data, setData] = useState<GeneData[]>([]);
  const [dataPatient, setDataPatient] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGene, setSelectedGene] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '10';

  const currentLocation = location.pathname;
  const id = currentLocation.replace('/tests/detail/', '');

  const handleGoBack = () => {
    // Tạo URL với pagination parameters
    const backUrl = `/tests/add-test?page=${currentPage}&pageSize=${pageSize}`;
    navigate(backUrl, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${testCaseEp}/detail/${id}`);
        const rawData: any[] = await response.json();

        const groupedData = rawData.reduce((acc: Record<string, GeneData>, item: any) => {
          const gene = item.Gene;
          if (!acc[gene]) {
            acc[gene] = {
              Gene: gene,
              details: [],
            };
          }
          acc[gene].details.push({
            RS_ID: item.RS_ID || '-',
            Nucleotide: item.Nucleotide,
            Protein: item.Protein,
            VariationType: item.VariationType,
            Position: item.Position,
            DrugResponse: item.DrugResponse,
            VariantRate: item.VariantRate,
            ReadDepth: item.ReadDepth,
          });
          return acc;
        }, {});

        const sortedData: GeneData[] = Object.values(groupedData);
        sortedData.sort((a, b) => a.Gene.localeCompare(b.Gene));
        setData(sortedData);
        
        // Set first gene as selected by default
        if (sortedData.length > 0) {
          setSelectedGene(sortedData[0].Gene);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`${testCaseEp}/find/${id}`);
        const patientData: any[] = await response.json();
        setDataPatient(patientData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTestData();
  }, []);

  const selectedGeneData = data.find(gene => gene.Gene === selectedGene);
  
  // Sắp xếp biến thể theo thứ tự ưu tiên (nghiêm trọng trước)
  const sortedVariants = selectedGeneData ? [...selectedGeneData.details].sort((a, b) => {
    const priorityA = translateDrugResponse(a.DrugResponse).priority;
    const priorityB = translateDrugResponse(b.DrugResponse).priority;
    return priorityA - priorityB;
  }) : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section - Theme xanh phù hợp với #15b9c6 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-4">
            <Button 
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 border-cyan-200 hover:border-cyan-300"
              icon={<ArrowLeftIcon className="w-4 h-4" />}
            >
              Quay lại
            </Button>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Kết quả giải trình tự gen</h1>
          </div>
          
          {data.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 text-center border border-cyan-200">
                <div className="text-2xl font-bold text-cyan-700">{data.length}</div>
                <div className="text-sm text-cyan-600">Gen được phân tích</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">
                  {data.reduce((sum, gene) => sum + gene.details.length, 0)}
                </div>
                <div className="text-sm text-blue-600">Tổng biến thể</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-700">
                  {data.reduce((sum, gene) => sum + gene.details.filter(d => {
                    const priority = translateDrugResponse(d.DrugResponse).priority;
                    return priority <= 3; // Pathogenic, Pathogenic/Likely pathogenic, Likely pathogenic
                  }).length, 0)}
                </div>
                <div className="text-sm text-red-600">Đột biến gây bệnh</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-700">
                  {data.reduce((sum, gene) => sum + gene.details.filter(d => {
                    const priority = translateDrugResponse(d.DrugResponse).priority;
                    return priority >= 6; // Benign, Benign/Likely benign, Likely benign
                  }).length, 0)}
                </div>
                <div className="text-sm text-green-600">Đột biến lành tính</div>
              </div>
            </div>
          )}
        </div>

        {/* Patient Information */}
        {dataPatient.length > 0 && (
          <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <UserIcon className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Thông tin bệnh nhân</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-sm text-gray-500">Mã xét nghiệm</div>
                    <div className="font-semibold text-gray-900">{dataPatient[0].patientID}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <UserIcon className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-sm text-gray-500">Tên bệnh nhân</div>
                    <div className="font-semibold text-gray-900">{dataPatient[0].patientName}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <BeakerIcon className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-sm text-gray-500">Mẫu mô</div>
                    <div className="font-semibold text-gray-900">{dataPatient[0].testName}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <DocumentTextIcon className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-sm text-gray-500">Mẫu bệnh phẩm</div>
                    <div className="font-semibold text-gray-900">{dataPatient[0].primaryTissue}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200 col-span-full md:col-span-1">
                  <ChartBarIcon className="w-5 h-5 text-cyan-600" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">Thuốc điều trị đích</div>
                    <Link to={`/perdict-drug/${dataPatient[0].patientID}?typeCancer=${dataPatient[0].primaryTissue}`}>
                      <Button 
                        type="primary" 
                        className="bg-cyan-600 hover:bg-cyan-700 border-cyan-600 hover:border-cyan-700"
                        size="large"
                      >
                        Xem thuốc điều trị
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Gene Analysis Results - Layout mới với Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Gene List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 text-white">
                <div className="flex items-center space-x-2">
                  <CpuChipIcon className="w-5 h-5" />
                  <h3 className="font-semibold">Danh sách Gen</h3>
                </div>
                <p className="text-cyan-100 text-sm mt-1">{data.length} gen được phân tích</p>
              </div>
              
              <div className="p-2">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {data.map((geneData) => (
                      <div
                        key={geneData.Gene}
                        onClick={() => setSelectedGene(geneData.Gene)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedGene === geneData.Gene 
                            ? 'bg-cyan-500 text-white shadow-md' 
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{geneData.Gene}</div>
                            <div className={`text-sm ${selectedGene === geneData.Gene ? 'text-cyan-100' : 'text-gray-500'}`}>
                              {geneData.details.length} biến thể
                            </div>
                          </div>
                          <ChevronRightIcon className={`w-4 h-4 ${selectedGene === geneData.Gene ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Gene Details Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden h-full">
              {selectedGeneData ? (
                <>
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Gen {selectedGeneData.Gene}</h3>
                        <p className="text-cyan-100 mt-1">
                          {selectedGeneData.details.length} biến thể được phát hiện
                        </p>
                        {/* Hiển thị phân loại ưu tiên */}
                        <div className="mt-2 text-sm text-cyan-100">
                          Gây bệnh: {sortedVariants.filter(v => translateDrugResponse(v.DrugResponse).priority <= 3).length} • 
                          Chưa rõ: {sortedVariants.filter(v => translateDrugResponse(v.DrugResponse).priority >= 4 && translateDrugResponse(v.DrugResponse).priority <= 5).length} • 
                          Lành tính: {sortedVariants.filter(v => translateDrugResponse(v.DrugResponse).priority >= 6).length}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Variants Grid Layout với Scroll */}
                    <div className="max-h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sortedVariants.map((item, index) => {
                          const drugResponseInfo = translateDrugResponse(item.DrugResponse);
                          
                          return (
                            <div 
                              key={index} 
                              className="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
                            >
                              {/* Variant Header */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    drugResponseInfo.priority <= 3 ? 'bg-red-100' : 
                                    drugResponseInfo.priority <= 5 ? 'bg-yellow-100' : 'bg-green-100'
                                  }`}>
                                    <span className={`text-sm font-bold ${
                                      drugResponseInfo.priority <= 3 ? 'text-red-700' : 
                                      drugResponseInfo.priority <= 5 ? 'text-yellow-700' : 'text-green-700'
                                    }`}>
                                      {index + 1}
                                    </span>
                                  </div>
                                  <h4 className="font-semibold text-gray-900">Biến thể #{index + 1}</h4>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${drugResponseInfo.color}`}>
                                  {drugResponseInfo.text}
                                </span>
                              </div>

                              {/* Variant Details */}
                              <div className="space-y-3">
                                
                                {/* Genetic Info */}
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <h5 className="font-medium text-gray-700 text-xs uppercase tracking-wide mb-2">
                                    Thông tin di truyền
                                  </h5>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">RS ID:</span>
                                      <span className="font-mono text-gray-900">{item.RS_ID}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Nucleotide:</span>
                                      <span className="font-mono text-gray-900">{item.Nucleotide}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Protein:</span>
                                      <span className="font-mono text-gray-900">{item.Protein}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Mutation Info */}
                                <div className="bg-cyan-50 rounded-lg p-3">
                                  <h5 className="font-medium text-cyan-700 text-xs uppercase tracking-wide mb-2">
                                    Chi tiết đột biến
                                  </h5>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Loại:</span>
                                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getVariationTypeColor(item.VariationType)}`}>
                                        {item.VariationType}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Vị trí:</span>
                                      <span className="font-mono text-gray-900">{item.Position}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Quality Metrics */}
                                <div className="bg-blue-50 rounded-lg p-3">
                                  <h5 className="font-medium text-blue-700 text-xs uppercase tracking-wide mb-2">
                                    Chất lượng
                                  </h5>
                                  <div className="space-y-2">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Variant Rate:</span>
                                        <span className="font-semibold text-gray-900">{item.VariantRate}</span>
                                      </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Read Depth:</span>
                                      <span className="font-semibold text-gray-900">{item.ReadDepth}x</span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <CpuChipIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Chọn một gen từ danh sách để xem chi tiết</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

        </div>


      </div>
    </div>
  );
};

export default ResultTest;