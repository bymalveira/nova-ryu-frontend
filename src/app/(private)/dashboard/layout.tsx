// src/app/dashboard/layout.tsx
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r-2 border-red-600/30">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-gray-50 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}