import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, UserPlus, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export function VendorDashboard() {
  const { user } = useAuthStore();
  const { jobs, candidates } = useDataStore();

  // Simulate vendor-specific data (vendor v1 as demo)
  const myJobs = jobs.filter(j => j.assignedVendors.includes('v1'));
  const myCandidates = candidates.filter(c => c.vendorId === 'v1');
  const hiredCount = myCandidates.filter(c => c.stage === 'Hired').length;

  const stats = [
    { label: 'Assigned Jobs', value: myJobs.length, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { label: 'Submitted Candidates', value: myCandidates.length, icon: UserPlus, color: 'from-violet-500 to-violet-600' },
    { label: 'Hired', value: hiredCount, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Performance Score', value: '92', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Vendor Dashboard</h2>
        <p className="text-[#64748B] mt-1 text-base">Welcome back, {user?.name}. Track your submissions and performance.</p>
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
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Assigned Jobs</h3>
              <p className="text-sm text-[#64748B]">Open positions you're sourcing for</p>
            </div>
            <button className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {myJobs.map(job => (
                <div key={job.id} className="flex items-center p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{job.title}</p>
                    <p className="text-xs text-[#64748B] mt-1">{job.department} • {job.location}</p>
                  </div>
                  <Badge variant="success" className="px-3 py-1 text-xs">{job.status}</Badge>
                </div>
              ))}
              {myJobs.length === 0 && (
                <div className="p-8 text-center text-[#64748B]">No jobs assigned yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">My Submissions</h3>
              <p className="text-sm text-[#64748B]">Candidates you've submitted</p>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {myCandidates.map(candidate => {
                const job = jobs.find(j => j.id === candidate.jobId);
                const stageBadge = {
                  Submitted: 'default', Screened: 'secondary', Interview: 'warning', Hired: 'success', Rejected: 'destructive'
                };
                return (
                  <div key={candidate.id} className="flex items-center p-5 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 text-xs">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-bold text-[#0F172A]">{candidate.name}</p>
                      <p className="text-xs text-[#64748B]">{job?.title}</p>
                    </div>
                    <Badge variant={stageBadge[candidate.stage]} className="px-3 py-1 text-xs">{candidate.stage}</Badge>
                  </div>
                );
              })}
              {myCandidates.length === 0 && (
                <div className="p-8 text-center text-[#64748B]">No candidates submitted yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
