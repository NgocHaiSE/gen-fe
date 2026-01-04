import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../utils/auth';

interface RequireRoleProps {
    allowedRoles: UserRole[];
    children?: React.ReactNode;
}

export default function RequireRole({ allowedRoles, children }: RequireRoleProps) {
    const { role } = useAuth();

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/401" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}
