// src/app/admin/page.tsx
import { auth } from '@/auth';

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || 'Admin'}!
        </h1>
        <p className="text-gray-500">Here is your live financial snapshot.</p>
      </header>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Available Cash" amount="Tsh 14,500,000" trend="+12% this month" isPositive={true} />
        <MetricCard title="YTD Expenses" amount="Tsh 2,150,000" description="TRA, Maintenance" />
        <MetricCard title="Outstanding Rent" amount="Tsh 850,000" description="2 Tenants Late" isAlert={true} />
      </div>

      {/* Quick Actions & Pending Validations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">+ Log Payment</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-medium">+ Log Expense</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-medium">+ New Agreement</button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <h2 className="text-lg font-semibold mb-4 text-red-700">Action Required: Bank Transfers</h2>
          <p className="text-sm text-gray-600 mb-4">You have 1 pending receipt to verify.</p>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium">Madina Tarimo</p>
              <p className="text-xs text-gray-500">Tsh 550,000 • Jan 2026</p>
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50">Review</button>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ title, amount, trend, description, isPositive, isAlert }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold mt-2 ${isAlert ? 'text-red-600' : 'text-gray-900'}`}>{amount}</p>
      {trend && <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-gray-500'}`}>{trend}</p>}
      {description && <p className="text-sm mt-2 text-gray-500">{description}</p>}
    </div>
  );
}