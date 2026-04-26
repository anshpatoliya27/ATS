import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, UserPlus, TrendingUp, ArrowRight, ArrowUpRight, BarChart3, PieChart, LineChart as LineChartIcon } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export function AdminDashboard() {
  const { user } = useAuthStore();
  const { vendors, jobs, candidates } = useDataStore();
  const navigate = useNavigate();

  const activeJobs = jobs.filter(j => j.status === 'Open').length;
  const avgScore = Math.round(vendors.reduce((acc, v) => acc + v.performanceScore, 0) / (vendors.length || 1));
  
  const stats = [
    { label: 'Total Vendors', value: vendors.length, icon: Users, desc: `${vendors.filter(v => v.status === 'Active').length} active vendors`, trend: '+2', color: 'text-blue-600', bg: 'bg-blue-100', trendColor: 'text-emerald-600' },
    { label: 'Active Jobs', value: activeJobs, icon: Briefcase, desc: `+${jobs.length - activeJobs} draft/closed`, trend: '+3', color: 'text-indigo-600', bg: 'bg-indigo-100', trendColor: 'text-emerald-600' },
    { label: 'Total Candidates', value: candidates.length, icon: UserPlus, desc: `${candidates.filter(c => c.stage === 'Hired').length} hired so far`, trend: '+5', color: 'text-violet-600', bg: 'bg-violet-100', trendColor: 'text-emerald-600' },
    { label: 'Avg Vendor Score', value: avgScore, icon: TrendingUp, desc: 'Across all active vendors', trend: '+1.2', color: 'text-amber-600', bg: 'bg-amber-100', trendColor: 'text-emerald-600' },
  ];

  // Mock data for Hiring Trend Chart
  const trendData = [
    { month: 'Jan', candidates: 12, hired: 2 },
    { month: 'Feb', candidates: 19, hired: 4 },
    { month: 'Mar', candidates: 15, hired: 3 },
    { month: 'Apr', candidates: 25, hired: 7 },
    { month: 'May', candidates: 32, hired: 10 },
    { month: 'Jun', candidates: 28, hired: 8 },
  ];

  // Vendor Performance Data for Bar Chart
  const topVendorsData = [...vendors]
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 6)
    .map(v => ({
      name: v.name.split(' ')[0],
      score: v.performanceScore,
    }));

  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const stageColors = {
    Submitted: 'bg-slate-100 text-slate-700 border-slate-200',
    Screened: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Interview: 'bg-blue-50 text-blue-700 border-blue-200',
    Hired: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  const getAvatarColor = (name) => {
    const charCode = name.charCodeAt(0);
    const colorIndex = charCode % COLORS.length;
    return { bg: COLORS[colorIndex] + '20', text: COLORS[colorIndex] };
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="animate-slide-up">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Overview</h2>
          <p className="text-[#64748B] mt-1 text-base">Welcome back, <span className="font-semibold text-[#0F172A]">{user?.name}</span>. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3 animate-slide-up">
           <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all shadow-sm">
             Export Data
           </button>
           <button className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-500/20">
             Create Report
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className={`inline-flex items-center gap-1 font-bold ${stat.trendColor} bg-emerald-50 px-2 py-0.5 rounded-md text-xs`}>
                  <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                </span>
                <span className="text-[#64748B] font-medium text-xs">{stat.desc}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <LineChartIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Hiring Trends</h3>
                <p className="text-xs font-medium text-[#64748B]">Candidates vs Hires (Last 6 Months)</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6 bg-white">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="candidates" name="Candidates" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCandidates)" />
                  <Area type="monotone" dataKey="hired" name="Hired" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHired)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Top Vendor Performance</h3>
                <p className="text-xs font-medium text-[#64748B]">Average quality score</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6 bg-white">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVendorsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="score" name="Score" radius={[6, 6, 0, 0]}>
                    {topVendorsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Layout - Bottom */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Left Side: Recent Candidates */}
        <Card className="col-span-1 lg:col-span-4 border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Recent Candidates</h3>
              <p className="text-xs font-medium text-[#64748B] mt-1">Latest submissions across all jobs</p>
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
              {candidates.slice(0, 5).map(candidate => {
                const job = jobs.find(j => j.id === candidate.jobId);
                const vendor = vendors.find(v => v.id === candidate.vendorId);
                const { bg, text } = getAvatarColor(candidate.name);
                
                return (
                  <div key={candidate.id} className="flex items-center p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group" onClick={() => navigate('/candidates')}>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm"
                      style={{ backgroundColor: bg, color: text }}
                    >
                      {candidate.name.charAt(0)}
                    </div>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{candidate.name}</p>
                      <p className="text-xs font-medium text-[#64748B] flex items-center gap-2">
                        <span>{job?.title || 'Unknown Job'}</span>
                        <span className="w-1 h-1 bg-[#CBD5E1] rounded-full"></span>
                        <span className="text-[#94A3B8]">{vendor?.name || 'Direct'}</span>
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className={`inline-flex items-center border px-3 py-1 text-xs font-bold rounded-full ${stageColors[candidate.stage] || 'bg-gray-100 text-[#64748B] border-gray-200'}`}>
                        {candidate.stage}
                      </span>
                    </div>
                  </div>
                )
              })}
              {candidates.length === 0 && (
                <div className="p-8 text-center text-[#64748B] text-sm">No recent candidates found.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Top Vendors */}
        <Card className="col-span-1 lg:col-span-3 border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Top Vendors</h3>
              <p className="text-xs font-medium text-[#64748B] mt-1">Ranked by performance score</p>
            </div>
            <button 
              onClick={() => navigate('/vendors')}
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
              All Vendors <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0 bg-white">
            <div className="divide-y divide-[#F1F5F9]">
              {[...vendors].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5).map((vendor, index) => (
                <div key={vendor.id} className="flex items-center p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group" onClick={() => navigate('/vendors')}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm ${index === 0 ? 'bg-amber-100 text-amber-700' : index === 1 ? 'bg-slate-200 text-slate-700' : index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-[#64748B]'}`}>
                    #{index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{vendor.name}</p>
                    <p className="text-xs font-medium text-[#64748B] mt-0.5">
                      {vendor.totalSubmissions} submissions
                    </p>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${vendor.performanceScore >= 90 ? 'bg-emerald-500' : vendor.performanceScore >= 75 ? 'bg-blue-500' : 'bg-red-500'}`} 
                          style={{ width: `${vendor.performanceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-extrabold text-[#0F172A] w-6 text-right">{vendor.performanceScore}</span>
                    </div>
                  </div>
                </div>
              ))}
              {vendors.length === 0 && (
                <div className="p-8 text-center text-[#64748B] text-sm">No vendors found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

