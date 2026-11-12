"use client";

import { BarChart3, TrendingUp, Wallet, Package } from "lucide-react";

import { useState, useEffect } from "react";

export default function ReportsClient({ initialData }: { initialData: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-500">Financial Reports</h1>
          <p className="text-text-secondary mt-1 font-medium">Analyze revenue, expenses, and operational performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card p-6 border-l-4 border-l-teal-500">
           <TrendingUp className="text-teal-500 mb-2" />
           <p className="text-[10px] font-black uppercase text-text-muted">Total Revenue</p>
           <p className="text-2xl font-black text-navy-900" suppressHydrationWarning>KSh {mounted ? initialData.billedTotal.toLocaleString() : "---"}</p>
        </div>
        <div className="premium-card p-6 border-l-4 border-l-rose-500">
           <Wallet className="text-rose-500 mb-2" />
           <p className="text-[10px] font-black uppercase text-text-muted">Total Expenses</p>
           <p className="text-2xl font-black text-navy-900" suppressHydrationWarning>KSh {mounted ? initialData.expensesTotal.toLocaleString() : "---"}</p>
        </div>
        <div className="premium-card p-6 border-l-4 border-l-navy-500">
           <Package className="text-navy-500 mb-2" />
           <p className="text-[10px] font-black uppercase text-text-muted">Net Cash Flow</p>
           <p className="text-2xl font-black text-navy-900" suppressHydrationWarning>KSh {mounted ? initialData.netCashFlow.toLocaleString() : "---"}</p>
        </div>
      </div>

      <div className="premium-card p-8 bg-navy-50/30 flex items-center justify-center min-h-[400px]">
         <div className="text-center space-y-4 opacity-50">
            <BarChart3 size={64} className="mx-auto text-navy-200" />
            <p className="font-bold text-navy-800">Advanced Analytics Coming Soon</p>
         </div>
      </div>
    </div>
  );
}
