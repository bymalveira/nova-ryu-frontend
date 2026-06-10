'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { MENU_CONFIG } from '@/constants/menu'
import Image from 'next/image'
import { Logout } from '@/lib/api'


export function Sidebar() {
  const pathname = usePathname()
  const { role } = useAuth()
  
  if (!role) return null;

  const links = MENU_CONFIG[role as keyof typeof MENU_CONFIG] || []


  return (
    <div className="flex flex-col h-screen w-64 bg-white p-4 border-r-2 border-red-600/30">
      <Image
        src="/images/logo-ryu-nobackground.png"
        alt="Nova Ryu"
        width={80}
        height={80}
        className="mt-2"
      />
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-red-600 text-white' : 'hover:text-[#b3aa92]'
              }`}
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          )
        })}
      </nav>

      <button 
        onClick={Logout}
        className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-black rounded-lg"
      >
        <LogOut size={20} />
        <span>Sair</span>
      </button>
    </div>
  )
};