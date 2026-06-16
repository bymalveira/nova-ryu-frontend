import { cookies } from 'next/headers';
import { UserTable } from '@/components/dashboard/UserTable';

export default async function ViewUsersTeacherPage() {
    const cookieStore = await cookies();
    const role = cookieStore.get('role')?.value || null;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-serif mb-6">Gestão de Usuários</h1>
            <UserTable initialRole={role} />
        </div>
    );
}