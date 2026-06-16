import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
};

export const DefaultButton = ({ children, className, ...props }:ButtonProps) => {
    return (
        <button
            className={`px-4 py-2 cursor-pointer ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    )
};

