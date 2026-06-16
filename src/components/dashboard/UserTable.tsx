'use client';

import { SearchInput } from "../ui/SearchInput";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { DeleteUserButton } from "../ui/DeleteUserButton";
import { Modal } from "../ui/modal";
import { EditUserForm } from "../forms/formEditUser";

export function UserTable({ initialRole }: { initialRole: string | null }) {
    const [userToEdit, setUserToEdit] = useState<any | null>(null);
    const { data: users } = useUsers();
    const safeUsers = Array.isArray(users) ? users : [];
    const [searchTerm, setSearchTerm] = useState("");
    const filteredUsers = safeUsers.filter((user) => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <SearchInput  
                value={searchTerm} 
                onChange={setSearchTerm}
            />
            
            <table className="min-w-full">
                <tbody>
                    {filteredUsers.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {(initialRole === 'ADMIN' || (initialRole === 'PROFESSOR' && user.role === 'ALUNO')) && (
                                    <div className="flex gap-4">
                                        <DeleteUserButton id={user.id} />
                                        <button onClick={() => setUserToEdit(user)} className="font-bold text-blue-600 cursor-pointer hover:text-blue-800">Editar</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {userToEdit && (
                <Modal 
                    isOpen={!!userToEdit} // Adicione isso
                    onClose={() => setUserToEdit(null)} 
                    title="Editar"
                >
                    <EditUserForm onSuccess={() => setUserToEdit(null)} currentRole={initialRole} user={userToEdit} />
                </Modal>
            )}
        </>
    );
}