const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function api(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login'
        }
    }

    return response
};

export const getAdminStats = async () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const res = await fetch('http://localhost:4000/admin/stats', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if(!res.ok) {
        throw new Error("Não autorizado.")
    }
    return res.json();
};

export const Logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login'
};

export const getAdminLogs = async () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  const response = await fetch('http://localhost:4000/admin/logs', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Falha ao buscar logs');
  return response.json();
};