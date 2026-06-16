import Image from "next/image"
import { DefaultButton } from "../ui/buttons"
import Link from "next/link"

export const Navbar = () => {
    return (
        <header className="fixed top-0 z-50 bg-transparent min-w-full h-20 flex items-center justify-between gap-8 px-10">
            <Link href="/">
                <Image
                    src="/images/logo-ryu-nobackground.png"
                    alt="Nova Ryu"
                    width={100}
                    height={100}
                    className="mt-2"
                />  
            </Link>

            <ul className="flex gap-10 font-sans uppercase tracking-widest text-sm">
               <Link href="/" className="hover:text-[#b3aa92] transition-colors ease-in-out duration-250">Início</Link>
               <Link href="#about" className="hover:text-[#b3aa92] transition-colors ease-in-out duration-250">Sobre</Link>
               <Link href="#contact" className="hover:text-[#b3aa92] transition-colors ease-in-out duration-250">Contatos</Link>
            </ul>

            <Link href="/login">
                <DefaultButton className="bg-red-pri text-white rounded-2xl hover:text-[#cbc3ad] transition-colors ease-in-out duration-300 uppercase text-sm px-5">
                    Login
                </DefaultButton>            
            </Link>

        </header>
    )
};


