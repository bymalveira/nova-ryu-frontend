'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { userFormSchema } from "@/schemas/userSchema";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const editUserSchema = userFormSchema.extend({
    password: z.string().optional(),
})

interface EditUserFormProps {
    user: any;
    onSuccess: () => void;
    currentRole: string | null;
};

type UserFormData = z.infer<typeof editUserSchema>;

export function EditUserForm({ user, onSuccess, currentRole }: EditUserFormProps) {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
        }
    });

    const onSubmit = async (data: UserFormData) => {
        setLoading(true);
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log("Token extraído:", token);

        try {
            const response = await fetch(`http://localhost:4000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast.success("Usuario atualizado com sucesso!")
                queryClient.invalidateQueries({ queryKey: ['users'] });
                onSuccess();
            } else {
                toast.error("Erro ao atualizar, verifique os dados.")
            }
        } catch (err: any) {
            toast.error("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl border">
            <div className="flex flex-col gap-4">
                <input 
                    {...register("name")}
                    className="border p-2 rounded focus:outline-none" 
                    type="text" 
                    placeholder="Nome" 
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <input 
                    {...register("email")}
                    className="border p-2 rounded focus:outline-none" 
                    type="email" 
                    placeholder="Email" 
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <input 
                    {...register("password")}
                    className="border p-2 rounded focus:outline-none" 
                    type="password" 
                    placeholder="Nova Senha (deixe vazio para manter)" 
                />
                
                <select 
                    {...register("role")}
                    className="cursor-pointer border p-2 rounded"
                >
                    <option value="ALUNO">Aluno</option>
                    {currentRole === 'ADMIN' && (
                        <>
                            <option value="PROFESSOR">Professor</option>
                            <option value="ADMIN">Administrador</option>
                        </>
                    )}
                </select>
                {errors.role && <p className="text-red-500 text-sm">Selecione um cargo válido</p>}
            </div>

            <div className="flex items-end justify-end mt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </form>
    );
}