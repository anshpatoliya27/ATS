import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, UserPlus, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function VendorDashboard() {
  const { user } = useAuthStore();
  const { jobs, candidates } = useDataStore();
  const navigate = useNavigate();

  // Simulate vendor-specific data (vendor v1 as demo)
  const myJobs = jobs.filter(j => j.assignedVendors.includes('v1'));
  const myCandidates = candidates.filter(c => c.vendorId === 'v1');
  const hiredCount = myCandidates.filter(c => c.stage === 'Hired').length;

  const stats = [
    { label: 'Assigned Jobs', value: myJobs.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Submitted Candidates', value: myCandidates.length, icon: UserPlus, color: 'text-violet-600', bg: 'bg-violet-100' },
    { label: 'Hired', value: hiredCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Performance Score', value: '92', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const stageColors = {
    Submitted: 'bg-slate-100 text-slate-700 border-slate-200',
    Screened: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Interview: 'bg-amber-50 text-amber-700 border-amber-200',
    Hired: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="animate-slide-up">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Vendor Dashboard</h2>
          <p className="text-[#64748B] mt-1 text-base">Welcome back, <span className="font-semibold text-[#0F172A]">{user?.name}</span>. Track your submissions and performance.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="stagger-item border-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 card-hover bg-white rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-gray-50 rounded-bl-full opacity-50 -z-10" />
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-[#0F172A]">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center transform transition-transform group-hover:scale-110`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Side: Assigned Jobs */}
        <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Assigned Jobs</h3>
              <p className="text-xs font-medium text-[#64748B] mt-1">Open positions you're sourcing for</p>
            </div>
            <button 
              onClick={() => navigate('/jobs')}
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0 bg-white">
            <div className="divide-y divide-[#F1F5F9]">
              {myJobs.map(job => (
                <div key={job.id} className="flex items-center p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group" onClick={() => navigate('/jobs')}>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{job.title}</p>
                    <p className="text-xs font-medium text-[#64748B] mt-1 flex items-center gap-2">
                      <span>{job.department}</span>
                      <span className="w-1 h-1 bg-[#CBD5E1] rounded-full"></span>
                      <span>{job.location}</span>
                    </p>
                  </div>
                  <Badge variant="success" className="px-3 py-1 text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-none">{job.status}</Badge>
                </div>
              ))}
              {myJobs.length === 0 && (
                <div className="p-8 text-center text-[#64748B] text-sm font-medium">No jobs assigned yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: My Submissions */}
        <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">My Submissions</h3>
              <p className="text-xs font-medium text-[#64748B] mt-1">Candidates you've submitted</p>
            </div>
            <button 
              onClick={() => navigate('/candidates')}
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0 bg-white">
            <div className="divide-y divide-[#F1F5F9]">
              {myCandidates.map(candidate => {
                const job = jobs.find(j => j.id === candidate.jobId);
                return (
                  <div key={candidate.id} className="flex items-center p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group" onClick={() => navigate('/candidates')}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-700 font-bold border border-blue-100 shadow-sm text-lg">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{candidate.name}</p>
                      <p className="text-xs font-medium text-[#64748B] mt-0.5">{job?.title}</p>
                    </div>
                    <span className={`inline-flex items-center border px-3 py-1 text-xs font-bold rounded-full ${stageColors[candidate.stage] || 'bg-gray-100 text-[#64748B] border-gray-200'}`}>
                      {candidate.stage}
                    </span>
                  </div>
                );
              })}
              {myCandidates.length === 0 && (
                <div className="p-8 text-center text-[#64748B] text-sm font-medium">No candidates submitted yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
