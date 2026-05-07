import React, { useState } from 'react';
import { School, Bell, Shield, Palette, Save } from 'lucide-react';
import { cn } from '../../components/ui';

const TABS = [
  { id: 'school', label: 'School Info', icon: School },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export function SettingsPage() {
  const [tab, setTab] = useState('school');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-950">Settings</h1>

      <div className="flex gap-1 border-b border-neutral-200">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn('flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors', tab === t.id ? 'border-neutral-950 text-neutral-950' : 'border-transparent text-neutral-500 hover:text-neutral-950')}>
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </div>

      <div className="max-w-lg">
        {tab === 'school' && (
          <div className="space-y-4">
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">School Name</label><input defaultValue="Tinkacode Academy" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">School Code</label><input defaultValue="TKC-001" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Contact Email</label><input type="email" defaultValue="admin@tinkacode.com" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Phone</label><input defaultValue="+254 700 000 000" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Address</label><textarea rows={2} defaultValue="Nairobi, Kenya" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 resize-none" /></div>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="space-y-4">
            {[
              { label: 'New enrollment alerts', desc: 'Notify when a student enrolls', defaultOn: true },
              { label: 'Overdue invoice reminders', desc: 'Weekly reminders for unpaid invoices', defaultOn: true },
              { label: 'At-risk student alerts', desc: 'Alert when students fall below thresholds', defaultOn: true },
              { label: 'Weekly summary emails', desc: 'Receive school overview every Monday', defaultOn: false },
              { label: 'Instructor activity reports', desc: 'Monthly instructor performance digest', defaultOn: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                <div>
                  <div className="text-sm font-medium text-neutral-900">{n.label}</div>
                  <div className="text-xs text-neutral-500">{n.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={n.defaultOn} className="sr-only peer" />
                  <div className="w-10 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-neutral-950 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        )}

        {tab === 'security' && (
          <div className="space-y-4">
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Current Password</label><input type="password" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">New Password</label><input type="password" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div><label className="text-xs font-medium text-neutral-600 block mb-1.5">Confirm New Password</label><input type="password" className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400" /></div>
            <div className="pt-2 border-t border-neutral-100">
              <div className="text-sm font-medium text-neutral-900 mb-1">Two-Factor Authentication</div>
              <div className="text-xs text-neutral-500 mb-3">Add an extra layer of security to your account</div>
              <button className="h-9 px-4 rounded-md border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Enable 2FA</button>
            </div>
          </div>
        )}

        {tab === 'appearance' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-600 block mb-2">Theme</label>
              <div className="flex gap-3">
                {['Light', 'Dark', 'System'].map((t) => (
                  <button key={t} className={cn('flex-1 h-10 rounded-md border text-sm font-medium transition-colors', t === 'Light' ? 'bg-neutral-950 text-white border-neutral-950' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50')}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600 block mb-2">Language</label>
              <select className="w-full h-9 rounded-md border border-neutral-200 px-3 text-sm outline-none focus:border-neutral-400 bg-white">
                <option>English</option><option>Swahili</option><option>French</option>
              </select>
            </div>
          </div>
        )}

        <button onClick={handleSave} className="mt-6 flex items-center gap-2 h-10 px-5 rounded-md bg-neutral-950 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
          <Save size={14} />{saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
