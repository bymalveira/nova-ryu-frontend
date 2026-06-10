import { LayoutDashboard, Users, BookOpen, Settings, GraduationCap } from "lucide-react"

export const MENU_CONFIG = {
  ADMIN: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Usuários', href: '/dashboard/admin/usuarios', icon: Users },
    { name: 'Turmas', href: '/dashboard/admin/turmas', icon: BookOpen },
    { name: 'Configurações', href: '/dashboard/admin/config', icon: Settings },
  ],
  PROFESSOR: [
    { name: 'Dashboard', href: '/dashboard/professor', icon: LayoutDashboard },
    { name: 'Minhas Turmas', href: '/dashboard/professor/turmas', icon: BookOpen },
  ],
  ALUNO: [
    { name: 'Meu Perfil', href: '/dashboard/aluno', icon: GraduationCap },
    { name: 'Minhas Aulas', href: '/dashboard/aluno/aulas', icon: BookOpen },
  ]
};