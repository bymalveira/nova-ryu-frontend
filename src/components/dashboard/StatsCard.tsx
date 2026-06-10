interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
};

export function StatsCard({ title, value, trend }: StatsCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
            {trend && <p className="text-xs text-green-600 mt-2">{trend}</p>}
        </div>
    )
}