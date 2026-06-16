import { getCookie } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {

      const response = await fetch('http://localhost:4000/users', { 
        headers: { 'Authorization': `Bearer ${getCookie('token')}` }
      });
      
      if (!response.ok) throw new Error('Falha na requisição');
      
      return response.json(); 
    }
  });
};