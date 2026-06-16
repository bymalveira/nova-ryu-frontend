interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <input
            type="text"
            placeholder="Filtrar por nome ou email..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded-lg w-full max-w-sm mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
    );
};