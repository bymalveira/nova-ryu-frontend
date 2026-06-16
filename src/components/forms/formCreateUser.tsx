'use client';

import { toast } from "sonner";
import { useState, useEffect } from "react";


interface CreateStudentFormProps {
    onSuccess: () => void;
}


export function CreateStudentForm({ onSuccess }: CreateStudentFormProps) {

    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'ALUNO' });
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('')
    
    useEffect(() => {
        const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        setUserRole(role)
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        try {
            const response = await fetch('http://localhost:4000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                onSuccess();
            } else {
                toast.error("Erro ao Criar Usuario, verifique se a senha é maior que 6 caracteres.")
            }
        } catch (err: any) {
            toast.error(err.massage)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border">
            <div className="flex flex-col gap-4">
                <input className="focus:outline-none" type="text" placeholder="Nome" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input className="focus:outline-none" type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input className="focus:outline-none" type="password" placeholder="Senha" onChange={e => setFormData({ ...formData, password: e.target.value })} />
                <select onChange={e => setFormData({ ...formData, role: e.target.value })} className="cursor-pointer">
                    <option value="ALUNO">Aluno</option>

                    {userRole === 'ADMIN' && (
                        <>
                            <option value="PROFESSOR">Professor</option>
                            <option value="ADMIN">Admin</option>
                        </>
                    )}
                </select>
            </div>


            <div className="flex items-end justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                    {loading ? 'Criando Usuario...' : 'Criar Usuario'}
                </button>
            </div>
        </form>
    );
};