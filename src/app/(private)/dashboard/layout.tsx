import { Sidebar } from "@/components/layout/sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex min-h-screen">
        <aside className="w-64 bg-white border-r-2 border-red-600/30">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-gray-50 min-h-screen p-8">
          {children}
        </main>
      </div>
    </>
  );
}