// src/app/admin/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { Home, Users, FileText, DollarSign, PieChart, Settings, Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row">
      {/* Sidebar (Hidden on mobile, block on md screens) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <div className="text-xl font-bold mb-8 text-blue-600">BS Kigamboni</div>
        <nav className="flex-1 space-y-2">
          <NavItem href="/admin" icon={<Home size={20} />} label="Dashboard" />
          <NavItem href="/admin/tenants" icon={<Users size={20} />} label="Tenants" />
          <NavItem href="/admin/agreements" icon={<FileText size={20} />} label="Agreements" />
          <NavItem href="/admin/finances" icon={<DollarSign size={20} />} label="Financials" />
          <NavItem href="/admin/equity" icon={<PieChart size={20} />} label="Equity & Shares" />
        </nav>
        <div className="pt-4 border-t border-gray-200">
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <div className="text-lg font-bold text-blue-600">BS Kigamboni</div>
          <button className="p-2 text-gray-600"><Menu size={24} /></button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium">
      {icon}
      <span>{label}</span>
    </Link>
  );
}