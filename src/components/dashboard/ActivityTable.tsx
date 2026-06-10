'use client'

export function ActivityTable({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) return <p>Nenhum log encontrado.</p>;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Atividade Recente</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-3">Email</th>
              <th className="pb-3">IP</th>
              <th className="pb-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-4 font-medium text-gray-900">{log.email}</td>
                <td className="py-4 text-gray-600">{log.ip}</td>
                <td className="py-4 text-gray-500">
                  {new Date(log.dataAcesso).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}