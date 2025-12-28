import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Overview from './pages/Overview.tsx'
import PatientDetail from './pages/PatientDetail.tsx'
import NotFound from './pages/NotFound.tsx'
import CancerInformation from './pages/CancerInformation.tsx'
import DrugTreatment from './pages/DrugTreatment.tsx'
import OtherTreatment from './pages/OtherTreatment.tsx'
import Article from './pages/Article.tsx'
import HealthRecord from './pages/HealthRecord.tsx'
import Statistics from './pages/Statistics.tsx'
import PatientManagement from './pages/PatientManagement.tsx'
import PatientList from './pages/PatientList.tsx'
import Collections from './pages/Collections.tsx'
import DevTeams from './pages/DevTeams.tsx'
import HealthRecordDetail from './pages/HealthRecordDetail.tsx'
import TestList from './pages/TestList.tsx'
import TestDetail from './pages/TestDetail.tsx'



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
                <Route index element={<Navigate to="/welcome" replace />} />
                <Route path="welcome" element={<Dashboard />} />

                {/* Cancer Routes - explicit for now to match menu */}
                <Route path="lung-cancer">
                    <Route path="overview" element={<Overview type="lung-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="lung-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="lung-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="lung-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="lung-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="lung-cancer" />} />
                    <Route path="article" element={<Article type="lung-cancer" />} />
                    <Route path="health-record" element={<HealthRecord type="lung-cancer" />} />
                </Route>

                <Route path="liver-cancer">
                    <Route path="overview" element={<Overview type="liver-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="liver-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="liver-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="liver-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="liver-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="liver-cancer" />} />
                    <Route path="article" element={<Article type="liver-cancer" />} />
                    <Route path="health-record" element={<HealthRecord type="liver-cancer" />} />
                </Route>

                <Route path="breast-cancer">
                    <Route path="overview" element={<Overview type="breast-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="breast-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="breast-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="breast-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="breast-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="breast-cancer" />} />
                    <Route path="article" element={<Article type="breast-cancer" />} />
                    <Route path="health-record" element={<HealthRecord type="breast-cancer" />} />
                </Route>

                <Route path="thyroid-cancer">
                    <Route path="overview" element={<Overview type="thyroid-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="thyroid-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="thyroid-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="thyroid-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="thyroid-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="thyroid-cancer" />} />
                    <Route path="article" element={<Article type="thyroid-cancer" />} />
                    <Route path="health-record" element={<HealthRecord type="thyroid-cancer" />} />
                </Route>

                <Route path="colorectal-cancer">
                    <Route path="overview" element={<Overview type="colorectal-cancer" />} />
                    <Route path="patient/new" element={<PatientDetail type="colorectal-cancer" />} />
                    <Route path="patient/:id" element={<PatientDetail type="colorectal-cancer" />} />
                    <Route path="gene-mutation" element={<CancerInformation type="colorectal-cancer" />} />
                    <Route path="drug" element={<DrugTreatment type="colorectal-cancer" />} />
                    <Route path="other-treatment" element={<OtherTreatment type="colorectal-cancer" />} />
                    <Route path="article" element={<Article type="colorectal-cancer" />} />
                    <Route path="health-record" element={<HealthRecord type="colorectal-cancer" />} />
                </Route>

                {/* Tests Routes */}
                <Route path="tests">
                    <Route path="add-test" element={<TestList />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="detail/:patientId" element={<TestDetail />} />
                    <Route path="variant/:patientId/:variantId" element={<TestDetail />} />
                </Route>

                {/* Patient Management Routes */}
                <Route path="patient-management">
                    <Route path="patient-information" element={<PatientManagement />} />
                    <Route path="patient-list" element={<PatientList type="all" />} />
                </Route>

                {/* Dev Teams */}
                <Route path="dev-teams" element={<DevTeams />} />

                {/* Health Record Detail Routes */}
                <Route path="health-record">
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

