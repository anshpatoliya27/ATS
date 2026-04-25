import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, UserPlus, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function AdminDashboard() {
  const { user } = useAuthStore();
  const { vendors, jobs, candidates } = useDataStore();

  const activeJobs = jobs.filter(j => j.status === 'Open').length;
  const avgScore = Math.round(vendors.reduce((acc, v) => acc + v.performanceScore, 0) / vendors.length);
  
  const stats = [
    { label: 'Total Vendors', value: vendors.length, icon: Users, desc: `${vendors.filter(v => v.status === 'Active').length} active vendors` },
    { label: 'Active Jobs', value: activeJobs, icon: Briefcase, desc: `+${jobs.length - activeJobs} draft/closed` },
    { label: 'Total Candidates', value: candidates.length, icon: UserPlus, desc: `${candidates.filter(c => c.stage === 'Hired').length} hired so far` },
    { label: 'Avg Vendor Score', value: avgScore, icon: TrendingUp, desc: 'Across all active vendors' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Overview</h2>
        <p className="text-[#64748B] mt-1 text-base">Welcome back, {user?.name}. Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#0F172A] mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-[#2563EB]" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-[#64748B] font-medium">{stat.desc}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Recent Candidates</h3>
              <p className="text-sm text-[#64748B]">Latest submissions from your vendors.</p>
            </div>
            <button className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8]">View all</button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {candidates.slice(0, 5).map(candidate => {
                const job = jobs.find(j => j.id === candidate.jobId);
                const vendor = vendors.find(v => v.id === candidate.vendorId);
                return (
                  <div key={candidate.id} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                      {candidate.name.charAt(0)}
                    </div>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-bold text-[#0F172A] leading-none">{candidate.name}</p>
                      <p className="text-sm text-[#64748B]">
                        {job?.title} • <span className="font-medium">{vendor?.name}</span>
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center rounded-full border border-transparent px-3 py-1 text-xs font-bold bg-gray-100 text-[#64748B]">
                        {candidate.stage}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Top Vendors</h3>
              <p className="text-sm text-[#64748B]">Ranked by performance score.</p>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {[...vendors].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5).map(vendor => (
                <div key={vendor.id} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                  <div className="ml-2 space-y-1 flex-1">
                    <p className="text-sm font-bold text-[#0F172A] leading-none">{vendor.name}</p>
                    <p className="text-sm text-[#64748B]">
                      {vendor.totalSubmissions} submissions
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${vendor.performanceScore >= 90 ? 'bg-emerald-500' : vendor.performanceScore >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} 
                        style={{ width: `${vendor.performanceScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-[#0F172A] w-8 text-right">{vendor.performanceScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
