import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, LayoutDashboard } from 'lucide-react'
import { menuConfig } from '../config/menu'
import { cn } from '../utils/cn'

import { canAccessMenuItem } from '../utils/auth'

export default function Sidebar() {
    const { pathname } = useLocation()

    return (
        <aside className="w-[280px] bg-pure-white text-ink-black flex flex-col h-full transition-all duration-300 z-10 overflow-hidden shrink-0 border-r border-slate-light">
            <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                <ul className="space-y-0.5">
                    {menuConfig.filter(canAccessMenuItem).map((item) => (
                        <SidebarItem key={item.path} item={item} currentPath={pathname} />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

function SidebarItem({ item, currentPath }: { item: any; currentPath: string }) {
    const [isOpen, setIsOpen] = useState(
        item.children?.some((child: any) => currentPath.startsWith(child.path))
    )

    const Icon = item.icon || LayoutDashboard
    const hasChildren = item.children && item.children.length > 0

    const handleClick = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault()
            setIsOpen(!isOpen)
        }
    }

    // Render icon - prefer iconImage if exists
    const renderIcon = () => {
        if (item.iconImage) {
            return <img src={item.iconImage} alt={item.name} className="w-5 h-5 mr-3 object-contain" />
        }
        return <Icon className="w-5 h-5 mr-3 text-teal-500" />
    }

    return (
        <li>
            {/* Parent Link */}
            <NavLink
                to={item.path}
                onClick={handleClick}
                className={({ isActive }) => cn(
                    "flex items-center px-4 py-3 text-[15px] transition-all duration-200 cursor-pointer relative border-l-3",
                    isActive
                        ? "text-teal-700 bg-teal-100 border-l-teal-500 font-semibold"
                        : "text-slate-dark hover:text-teal-700 hover:bg-teal-50 border-l-transparent"
                )}
            >
                {renderIcon()}
                <span className="flex-1 truncate">{item.name}</span>
                {hasChildren && (
                    <span className="ml-auto opacity-60">
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                )}
            </NavLink>

            {/* Submenu */}
            {hasChildren && (
                <div
                    className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-[500px]" : "max-h-0"
                    )}
                >
                    <ul className="py-1 bg-teal-50/50">
                        {item.children.filter(canAccessMenuItem).map((child: any) => (
                            <li key={child.path}>
                                <NavLink
                                    to={child.path}
                                    className={({ isActive }) => cn(
                                        "block pl-12 pr-4 py-2.5 text-[14px] transition-colors duration-200 border-l-3",
                                        isActive
                                            ? "text-teal-700 bg-teal-100 border-l-teal-500 font-medium"
                                            : "text-slate-medium hover:text-teal-700 hover:bg-teal-50 border-l-transparent"
                                    )}
                                >
                                    {child.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
}

