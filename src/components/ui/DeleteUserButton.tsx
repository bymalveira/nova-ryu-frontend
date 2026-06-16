import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCookie } from '@/utils/auth';

export function DeleteUserButton({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      const token = getCookie('token');
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("Usuário deletado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  return (
    <button
      onClick={() => {
        if (confirm("Tem certeza que deseja deletar este usuário?")) {
          mutation.mutate(id);
        }
      }}
      disabled={mutation.isPending}
      className="text-red-600 hover:text-red-800 font-bold cursor-pointer"
    >
      {mutation.isPending ? 'Deletando...' : 'Excluir'}
    </button>
  );
}