export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center text-sm text-gray-600">
                    <p className="font-medium">
                        © {currentYear} Bộ Khoa học và Công nghệ - Trường Đại học Y Hà Nội & Học viện Kỹ thuật quân sự
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Bản quyền thuộc về Bộ Khoa học và Công nghệ
                    </p>
                </div>
            </div>
        </footer>
    );
}
