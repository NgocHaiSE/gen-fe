import {
    Users,
    Activity,
    FileText,
    FlaskConical,
    Home,
    Stethoscope,
    Heart,
    HeartPulse,
    Ribbon,
    Info,
    BookOpen,
    Database,
    Code2,
    Pill
} from 'lucide-react'

// Mapping icons is manual since we are switching to lucide-react
export const menuConfig = [
    {
        path: '/home',
        name: 'Trang chủ',
        icon: Home
    },
    {
        path: '/welcome',
        name: 'Giới thiệu',
        icon: Info
    },
    {
        path: '/user-manager',
        name: 'Quản lý người dùng',
        icon: Users,
        access: 'canAdmin'
    },
    {
        path: '/lung-cancer',
        name: 'Ung thư phổi',
        icon: Activity,
        children: [
            { path: '/lung-cancer/overview', name: 'Tổng quan' },
            { path: '/lung-cancer/gene-mutation', name: 'Gen đột biến' },
            { path: '/lung-cancer/article', name: 'Bài báo liên quan' },
            { path: '/lung-cancer/drug', name: 'Thuốc điều trị' },
            { path: '/lung-cancer/other-treatment', name: 'Các điều trị khác' },
            { path: '/lung-cancer/health-record', name: 'Quản lý bệnh án' },
        ]
    },
    {
        path: '/liver-cancer',
        name: 'Ung thư gan',
        icon: Stethoscope,
        children: [
            { path: '/liver-cancer/overview', name: 'Tổng quan' },
            { path: '/liver-cancer/gene-mutation', name: 'Gen đột biến' },
            { path: '/liver-cancer/article', name: 'Bài báo liên quan' },
            { path: '/liver-cancer/drug', name: 'Thuốc điều trị' },
            { path: '/liver-cancer/other-treatment', name: 'Các điều trị khác' },
            { path: '/liver-cancer/health-record', name: 'Quản lý bệnh án' },
        ]
    },
    {
        path: '/breast-cancer',
        name: 'Ung thư vú',
        icon: Ribbon,
        children: [
            { path: '/breast-cancer/overview', name: 'Tổng quan' },
            { path: '/breast-cancer/gene-mutation', name: 'Gen đột biến' },
            { path: '/breast-cancer/article', name: 'Bài báo liên quan' },
            { path: '/breast-cancer/drug', name: 'Thuốc điều trị' },
            { path: '/breast-cancer/other-treatment', name: 'Các điều trị khác' },
            { path: '/breast-cancer/health-record', name: 'Quản lý bệnh án' },
        ]
    },
    {
        path: '/thyroid-cancer',
        name: 'Ung thư tuyến giáp',
        icon: Heart,
        children: [
            { path: '/thyroid-cancer/overview', name: 'Tổng quan' },
            { path: '/thyroid-cancer/gene-mutation', name: 'Gen đột biến' },
            { path: '/thyroid-cancer/article', name: 'Bài báo liên quan' },
            { path: '/thyroid-cancer/drug', name: 'Thuốc điều trị' },
            { path: '/thyroid-cancer/other-treatment', name: 'Các điều trị khác' },
            { path: '/thyroid-cancer/health-record', name: 'Quản lý bệnh án' },
        ]
    },
    {
        path: '/colorectal-cancer',
        name: 'Ung thư đại trực tràng',
        icon: HeartPulse,
        children: [
            { path: '/colorectal-cancer/overview', name: 'Tổng quan' },
            { path: '/colorectal-cancer/gene-mutation', name: 'Gen đột biến' },
            { path: '/colorectal-cancer/article', name: 'Bài báo liên quan' },
            { path: '/colorectal-cancer/drug', name: 'Thuốc điều trị' },
            { path: '/colorectal-cancer/other-treatment', name: 'Các điều trị khác' },
            { path: '/colorectal-cancer/health-record', name: 'Quản lý bệnh án' },
        ]
    },
    {
        path: '/tests',
        name: 'Xét nghiệm',
        icon: FlaskConical,
        children: [
            { path: '/tests/add-test', name: 'Thêm mới xét nghiệm' },
            { path: '/tests/collections', name: 'Danh mục xét nghiệm' },
            { path: '/tests/statistics', name: 'Thống kê' },
        ]
    },
    {
        path: '/over-view',
        name: 'Thông tin chung',
        icon: Database,
        children: [
            { path: '/over-view/gene-mutation', name: 'Chuyên gia gen đột biến' },
            { path: '/over-view/drug', name: 'Chuyên gia điều trị đích' },
            { path: '/over-view/drugtest', name: 'Chuyên gia thuốc điều trị' },
        ]
    },
    {
        path: '/dev-teams',
        name: 'Nhóm phát triển',
        icon: Code2
    }
]
