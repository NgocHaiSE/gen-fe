import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Home from './pages/Home.tsx'
import Overview from './pages/Overview.tsx'
import PatientDetail from './pages/PatientDetail.tsx'
import NotFound from './pages/NotFound.tsx'
import CancerInformation from './pages/CancerInformation.tsx'
import DrugTreatment from './pages/DrugTreatment.tsx'
import OtherTreatment from './pages/OtherTreatment.tsx'
import Article from './pages/Article.tsx'
import HealthRecord from './pages/HealthRecord.tsx'
import Statistics from './pages/Statistics.tsx'
import Collections from './pages/Collections.tsx'
import CollectionDetail from './pages/CollectionDetail.tsx'
import VariantDetail from './pages/VariantDetail.tsx'
import DevTeams from './pages/DevTeams.tsx'
import HealthRecordDetail from './pages/HealthRecordDetail.tsx'
import TestList from './pages/TestList.tsx'
import TestDetail from './pages/TestDetail.tsx'
import PredictionDrugDetail from './pages/PredictionDrugDetail.tsx'
import GeneralGeneInfo from './pages/GeneralGeneInfo.tsx'
import GeneralDrugInfo from './pages/GeneralDrugInfo.tsx'
import DrugTherapy from './pages/DrugTherapy.tsx'
import DNALibrary from './pages/DNALibrary.tsx'
import MedicinesList from './pages/MedicinesList.tsx'
import CosmicSamples from './pages/CosmicSamples.tsx'
import CosmicSampleDetail from './pages/CosmicSampleDetail.tsx'
import MutationInfoPage from './pages/MutationInfoPage.tsx'
import PanelData from './pages/PanelData.tsx'
import UserManagement from './pages/UserManagement.tsx'
import AccountInfo from './pages/AccountInfo.tsx'
import Unauthorized from './pages/Unauthorized.tsx'
import RequireRole from './components/RequireRole.tsx'


function App() {
    return (
        <Routes>
            <Route path="/user" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
            </Route>

            <Route path="/" element={
                <RequireAuth>
                    <DashboardLayout />
                </RequireAuth>
            }>
                <Route path="401" element={<Unauthorized />} />
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="welcome" element={<Dashboard />} />
                <Route path="account" element={<AccountInfo />} />

                {/* Cancer Routes - explicit for now to match menu */}
                <Route path="lung-cancer">
                    <Route path="overview" element={<Overview type="lung-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="lung-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="lung-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="lung-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="lung-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="lung-cancer" />} />
                    <Route path="article" element={<Article type="lung-cancer" />} />
                    <Route path="health-record" element={
                        <RequireRole allowedRoles={['admin', 'doctor']}>
                            <HealthRecord type="lung-cancer" />
                        </RequireRole>
                    } />
                </Route>

                <Route path="liver-cancer">
                    <Route path="overview" element={<Overview type="liver-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="liver-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="liver-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="liver-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="liver-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="liver-cancer" />} />
                    <Route path="article" element={<Article type="liver-cancer" />} />
                    <Route path="health-record" element={
                        <RequireRole allowedRoles={['admin', 'doctor']}>
                            <HealthRecord type="liver-cancer" />
                        </RequireRole>
                    } />
                </Route>

                <Route path="breast-cancer">
                    <Route path="overview" element={<Overview type="breast-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="breast-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="breast-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="breast-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="breast-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="breast-cancer" />} />
                    <Route path="article" element={<Article type="breast-cancer" />} />
                    <Route path="health-record" element={
                        <RequireRole allowedRoles={['admin', 'doctor']}>
                            <HealthRecord type="breast-cancer" />
                        </RequireRole>
                    } />
                </Route>

                <Route path="thyroid-cancer">
                    <Route path="overview" element={<Overview type="thyroid-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="thyroid-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="thyroid-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="thyroid-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="thyroid-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="thyroid-cancer" />} />
                    <Route path="article" element={<Article type="thyroid-cancer" />} />
                    <Route path="health-record" element={
                        <RequireRole allowedRoles={['admin', 'doctor']}>
                            <HealthRecord type="thyroid-cancer" />
                        </RequireRole>
                    } />
                </Route>

                <Route path="colorectal-cancer">
                    <Route path="overview" element={<Overview type="colorectal-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="colorectal-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="colorectal-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="colorectal-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="colorectal-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="colorectal-cancer" />} />
                    <Route path="article" element={<Article type="colorectal-cancer" />} />
                    <Route path="health-record" element={
                        <RequireRole allowedRoles={['admin', 'doctor']}>
                            <HealthRecord type="colorectal-cancer" />
                        </RequireRole>
                    } />
                </Route>

                {/* Tests Routes */}
                <Route path="tests" element={<RequireRole allowedRoles={['admin', 'doctor']} />}>
                    <Route path="add-test" element={<TestList />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="collections/:id" element={<CollectionDetail />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="detail/:patientId" element={<TestDetail />} />
                    <Route path="variant/:patientId/:variantId" element={<TestDetail />} />
                    <Route path="variant-detail/:patientId/:rsId" element={<VariantDetail />} />
                    <Route path="prediction-drug/:patientId" element={<PredictionDrugDetail />} />
                </Route>

                {/* Thông tin chung (General Information) Routes */}
                <Route path="over-view">
                    <Route path="gene-mutation" element={<GeneralGeneInfo />} />
                    <Route path="drug" element={<GeneralDrugInfo />} />
                    <Route path="drugtest" element={<DrugTherapy />} />
                </Route>

                {/* DNA Library */}
                <Route path="dna-library" element={<DNALibrary />} />

                {/* Medicines List */}
                <Route path="medicines-list" element={<MedicinesList />} />

                {/* Cosmic Samples */}
                <Route path="cosmic-samples" element={<CosmicSamples />} />
                <Route path="cosmic-samples/:sampleId" element={<CosmicSampleDetail />} />
                <Route path="cosmic-samples/:sampleId/mutations/:organType/:individualId" element={<MutationInfoPage />} />

                {/* Dev Teams */}
                <Route path="dev-teams" element={<DevTeams />} />

                {/* Panel Data - Mối quan hệ gen-thuốc */}
                <Route path="panel-data" element={<PanelData />} />

                {/* User Management - Admin only (or Doctor as per request) */}
                <Route path="user-manager" element={
                    <RequireRole allowedRoles={['admin', 'doctor']}>
                        <UserManagement />
                    </RequireRole>
                } />

                {/* Health Record Detail Routes */}
                <Route path="health-record" element={<RequireRole allowedRoles={['admin', 'doctor']} />}>
                    <Route path="lung-record/:id" element={<HealthRecordDetail recordType="lung-record" />} />
                    <Route path="liver-record/:id" element={<HealthRecordDetail recordType="liver-record" />} />
                    <Route path="breast-record/:id" element={<HealthRecordDetail recordType="breast-record" />} />
                    <Route path="thyroid-record/:id" element={<HealthRecordDetail recordType="thyroid-record" />} />
                    <Route path="colorectal-record/:id" element={<HealthRecordDetail recordType="colorectal-record" />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App

