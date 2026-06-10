'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '@/lib/api';
import { StatsCard } from "@/components/dashboard/StatsCard";
import { StatsChart } from '@/components/dashboard/StatsChart';
import { ActivityTable } from '@/components/dashboard/ActivityTable';
import { getAdminLogs } from '@/lib/api';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { CreateUserForm } from '@/components/forms/forms';

export default function AdminDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStats,
  });
  
  const { data: logsData, isLoading: logsLoading } = useQuery({
      queryKey: ['accessLogs'],
      queryFn: getAdminLogs,
  });

  if (isLoading) return <div className="p-8">Carregando métricas...</div>;
  if (error) return <div className="p-8 text-red-600">Erro ao carregar dados.</div>;

  return (
    <div className="p-8 space-y-8">
        <h1 className="text-3xl font-serif">Visão Geral do Administrador</h1>
        <div className="flex gap-4 mb-6">
            <button className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700" onClick={() => setIsModalOpen(true)}>Novo Aluno</button>
            <Modal
                isOpen={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cadastrar Novos Usuários"
            >
                <CreateUserForm />
            </Modal>
            <button className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">Nova Turma</button>
            <button className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">Relatórios</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="Total de Alunos" value={data?.totalAlunos?.toString() || "0"} />
            <StatsCard title="Total de Professores" value={data?.totalProfessores.toString() || "0" } />
            <StatsCard title="Total de Admins" value={data?.totalAdmins.toString() || "0"} />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-3xl">
                <StatsChart data={data} />
                <div className="my-10">
                    <ActivityTable logs={logsData?.logs || []} />
                </div>
            </div>
        </div>
    </div>
  );
};