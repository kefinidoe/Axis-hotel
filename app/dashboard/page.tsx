import { 
  Users, 
  Bed, 
  CalendarCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2
} from "lucide-react";
import clsx from "clsx";

export default function DashboardPage() {
  const stats = [
    { label: "Total Guests", value: "142", icon: Users, change: "+12%", trend: "up" },
    { label: "Occupancy Rate", value: "84%", icon: Bed, change: "+5%", trend: "up" },
    { label: "New Bookings", value: "28", icon: CalendarCheck, change: "-3%", trend: "down" },
    { label: "Revenue (Today)", value: "KSh 45k", icon: TrendingUp, change: "+18%", trend: "up" },
  ];

  return (
    <div className="p-8 animate-slide-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy-500">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1 font-medium">Welcome back! Here's what's happening at Axis Hotel today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card p-6 group">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-navy-50 text-navy-500 group-hover:bg-navy-500 group-hover:text-white transition-all">
                <stat.icon size={24} />
              </div>
              <div className={clsx(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-navy-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy-800">Operational Highlights</h2>
            <button className="text-sm font-bold text-teal-600 hover:text-teal-700">View All</button>
          </div>
          <div className="premium-card p-2">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-navy-900">Room 102 Cleaned</p>
                    <p className="text-xs text-text-secondary">Marked as available by Mary</p>
                 </div>
               </div>
               <p className="text-[10px] font-bold text-text-muted uppercase">12 mins ago</p>
            </div>
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-navy-50 text-navy-500 flex items-center justify-center">
                    <Clock size={20} />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-navy-900">Maintenance Request</p>
                    <p className="text-xs text-text-secondary">AC issue reported in Room 304</p>
                 </div>
               </div>
               <p className="text-[10px] font-bold text-text-muted uppercase">45 mins ago</p>
            </div>
            <div className="p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center">
                    <TrendingUp size={20} />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-navy-900">New Booking</p>
                    <p className="text-xs text-text-secondary">Direct booking via Website</p>
                 </div>
               </div>
               <p className="text-[10px] font-bold text-text-muted uppercase">2 hours ago</p>
            </div>
          </div>
        </div>

        {/* Quick Stats/Charts placeholder */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-navy-800">Occupancy Trend</h2>
          <div className="premium-card h-[320px] flex items-center justify-center p-8 bg-gradient-to-br from-navy-950 to-navy-900 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-20" />
             <div className="text-center space-y-2 z-10">
                <Bed size={48} className="text-gold-400 mx-auto opacity-50" />
                <p className="text-white/60 text-sm font-bold">Occupancy Chart Placeholder</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
