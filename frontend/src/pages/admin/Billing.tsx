import { useState } from 'react';
import { DollarSign, Download, AlertCircle, CheckCircle, Clock, X, TrendingUp } from 'lucide-react';
import { cn } from '../../components/ui';

const INVOICES = [
  { id: 'INV-044', school: "St. Mary's Academy", period: 'Apr 2026', students: 45, amount: 135000, status: 'overdue', dueDate: '30 Apr 2026', daysOverdue: 4 },
  { id: 'INV-045', school: 'Greenfield High', period: 'Apr 2026', students: 38, amount: 114000, status: 'pending', dueDate: '10 May 2026', daysOverdue: 0 },
  { id: 'INV-046', school: 'Rift Valley Academy', period: 'Apr 2026', students: 29, amount: 87000, status: 'paid', dueDate: '30 Apr 2026', daysOverdue: 0 },
  { id: 'INV-043', school: "St. Mary's Academy", period: 'Mar 2026', students: 44, amount: 132000, status: 'paid', dueDate: '31 Mar 2026', daysOverdue: 0 },
  { id: 'INV-042', school: 'Greenfield High', period: 'Mar 2026', students: 36, amount: 108000, status: 'paid', dueDate: '31 Mar 2026', daysOverdue: 0 },
];

const MONTHLY_REVENUE = [
  { month: 'Jan', amount: 620 },
  { month: 'Feb', amount: 680 },
  { month: 'Mar', amount: 724 },
  { month: 'Apr', amount: 842 },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  paid: { label: 'Paid', color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle },
  pending: { label: 'Pending', color: 'text-amber-700 bg-amber-100', icon: Clock },
  overdue: { label: 'Overdue', color: 'text-red-700 bg-red-100', icon: AlertCircle },
};

const maxRevenue = Math.max(...MONTHLY_REVENUE.map((r) => r.amount));

export function BillingPage() {
  const [filter, setFilter] = useState('all');
  const [payModal, setPayModal] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const filtered = INVOICES.filter((i) => filter === 'all' || i.status === filter);
  const totalRevenue = INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const outstanding = INVOICES.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0);
  const payingInvoice = INVOICES.find((i) => i.id === payModal);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); }, 2500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-950">Billing</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Collected', value: `KES ${(totalRevenue / 1000).toFixed(0)}K`, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Outstanding', value: `KES ${(outstanding / 1000).toFixed(0)}K`, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Revenue This Term', value: 'KES 842K', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-5 flex items-center gap-4">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', s.color)}>
              <s.icon size={18} />
            </div>
            <div>
              <div className="text-xl font-bold text-neutral-950">{s.value}</div>
              <div className="text-xs text-neutral-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-950 mb-5">Monthly Revenue (KES '000)</h2>
        <div className="flex items-end gap-6 h-28">
          {MONTHLY_REVENUE.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs font-medium text-neutral-700">{d.amount}</span>
              <div className="w-full rounded-t-md bg-neutral-950" style={{ height: `${(d.amount / maxRevenue) * 100}%` }} />
              <span className="text-xs text-neutral-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        <div className="flex gap-2">
          {['all', 'pending', 'paid', 'overdue'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('h-8 px-4 rounded-full text-xs font-medium capitalize transition-colors', filter === f ? 'bg-neutral-950 text-white' : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50')}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Invoice', 'School', 'Period', 'Students', 'Amount (KES)', 'Due Date', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((inv) => {
                const cfg = STATUS_CONFIG[inv.status];
                return (
                  <tr key={inv.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-medium text-neutral-700">{inv.id}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900">{inv.school}</td>
                    <td className="px-4 py-3 text-neutral-600">{inv.period}</td>
                    <td className="px-4 py-3 text-neutral-600">{inv.students}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{inv.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {inv.daysOverdue > 0 ? (
                        <span className="text-red-600 font-medium">{inv.dueDate} <span className="text-xs">({inv.daysOverdue}d overdue)</span></span>
                      ) : inv.dueDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', cfg.color)}>
                        <cfg.icon size={10} />{cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button className="h-7 px-2 rounded-md border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors flex items-center gap-1">
                          <Download size={11} />PDF
                        </button>
                        {inv.status !== 'paid' && (
                          <button onClick={() => { setPayModal(inv.id); setPaid(false); }} className="h-7 px-2.5 rounded-md bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                            Pay
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {payModal && payingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-neutral-950">Pay {payingInvoice.id}</h2>
              <button onClick={() => setPayModal(null)} className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500"><X size={16} /></button>
            </div>

            {paid ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={24} className="text-emerald-600" />
                </div>
                <div className="font-semibold text-neutral-950 mb-1">Payment Successful!</div>
                <div className="text-sm text-neutral-500">KES {payingInvoice.amount.toLocaleString()} received</div>
                <button onClick={() => setPayModal(null)} className="mt-5 w-full h-10 rounded-md bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">Done</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-neutral-50 p-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-500">Amount Due</span>
                    <span className="font-bold text-neutral-950">KES {payingInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>{payingInvoice.school}</span><span>{payingInvoice.period}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-600 block mb-2">Payment Method</label>
                  <div className="flex gap-2">
                    {(['mpesa', 'card', 'bank'] as const).map((m) => (
                      <button key={m} onClick={() => setPayMethod(m)} className={cn('flex-1 h-9 rounded-md border text-xs font-medium uppercase transition-colors', payMethod === m ? 'bg-neutral-950 text-white border-neutral-950' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50')}>
                        {m === 'mpesa' ? 'M-Pesa' : m === 'card' ? 'Card' : 'Bank'}
                      </button>
                    ))}
                  </div>
                </div>

                {payMethod === 'mpesa' && (
                  <div>
                    <label className="text-xs font-medium text-neutral-600 block mb-1.5">M-Pesa Phone Number</label>
                    <input value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} placeholder="0712 345 678" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" />
                    <p className="text-xs text-neutral-400 mt-1.5">An STK push will be sent to this number</p>
                  </div>
                )}

                {payMethod === 'card' && (
                  <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-3 text-xs text-neutral-500 text-center">Stripe card form would appear here</div>
                )}

                {payMethod === 'bank' && (
                  <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-3 text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-neutral-500">Bank</span><span className="font-medium">Equity Bank</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Account</span><span className="font-medium">0123456789</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Ref</span><span className="font-medium">{payingInvoice.id}</span></div>
                  </div>
                )}

                <button onClick={handlePay} disabled={paying} className="w-full h-10 rounded-md bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
                  {paying ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</> : 'Confirm Payment'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
