'use client';

import { MoveLeft } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";


export function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Email ou senha inválidos');
            }

            const data = await res.json();

            document.cookie = `token=${data.token}; path=/; max-age=86400`;
            document.cookie = `role=${data.user.role}; path=/; max-age=86400`;

            router.push(`/dashboard/${data.user.role.toLowerCase()}`);
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 w-full">
            <div
                className="hidden md:block relative"
                style={{
                    backgroundImage: "url('/images/background.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="absolute top-10 left-10">
                <Link href="/">
                    <div className="bg-red-600 hover:bg-red-700 rounded-2xl backdrop-blur-lg p-2">
                        <MoveLeft color="white" />
                    </div>
                </Link>
            </div>

            <div className="flex items-center justify-center bg-gray-100 p-6">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
                >
                    <div className="flex justify-end mb-4">
                        <Image
                            src="/images/logo-ryu-nobackground.png"
                            alt="Logo"
                            width={60}
                            height={60}
                        />
                    </div>

                    <h1 className="text-3xl font-serif mb-2">
                        Entrar na sua conta
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Acesse sua conta para continuar
                    </p>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-pri text-white font-semibold py-3 rounded-lg 
                        hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>

                    <p className="text-sm text-center mt-4">
                        Esqueceu a senha?{" "}
                        <span className="text-red-pri cursor-pointer hover:underline">
                            Recupere
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};
