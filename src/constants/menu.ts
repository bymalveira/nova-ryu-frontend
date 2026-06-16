import { LayoutDashboard, Users, BookOpen, GraduationCap } from "lucide-react"

export const MENU_CONFIG = {
  ADMIN: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Usuários', href: '/dashboard/admin/usuarios', icon: Users },
    { name: 'Turmas', href: '/dashboard/admin/turmas', icon: BookOpen },
  ],
  PROFESSOR: [
    { name: 'Dashboard', href: '/dashboard/professor', icon: LayoutDashboard },
    { name: 'Usuários', href: '/dashboard/professor/usuarios', icon: Users },
  ],
  ALUNO: [
    { name: 'Meu Perfil', href: '/dashboard/aluno', icon: GraduationCap },
  ]
};