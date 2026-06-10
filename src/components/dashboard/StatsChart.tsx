'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function StatsChart({ data }: { data: any }) {
  const chartData = [
    { name: 'Alunos', total: data?.totalAlunos || 0 },
    { name: 'Professores', total: data?.totalProfessores || 0 },
    { name: 'Admins', total: data?.totalAdmins || 0 },
  ];

  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Distribuição de Usuários</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip cursor={{ fill: '#f3f4f6' }} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#374151'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}