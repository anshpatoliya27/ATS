import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, UserPlus, TrendingUp, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, MoreVertical } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';

export function AdminDashboard() {
  const { vendors, jobs, candidates } = useDataStore();
  const navigate = useNavigate();

  const activeJobs = jobs.filter(j => j.status === 'Open').length;
  const avgScore = Math.round(vendors.reduce((acc, v) => acc + v.performanceScore, 0) / (vendors.length || 1));
  
  const stats = [
    { label: 'Total Products', value: 5483, icon: Briefcase, color: 'text-[#1d3557]', bg: 'bg-[#e6eff5]' },
    { label: 'Orders', value: 2859, icon: Users, color: 'text-[#1d3557]', bg: 'bg-[#e6eff5]' },
    { label: 'Total Stock', value: 5483, icon: TrendingUp, color: 'text-[#1d3557]', bg: 'bg-[#e6eff5]' },
    { label: 'Out of Stock', value: 38, icon: Briefcase, color: 'text-orange-700', bg: 'bg-orange-100' },
  ];

  // Map our ATS data to match the visual vibe of the dashboard image
  const displayStats = [
    { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'text-[#1d3557]', bg: 'bg-[#e6eff5]' },
    { label: 'Active Vendors', value: vendors.length, icon: Users, color: 'text-[#1d3557]', bg: 'bg-[#e6eff5]' },
    { label: 'Total Candidates', value: candidates.length, icon: TrendingUp, color: 'text-[#1d3557]', bg: 'bg-[#e6eff5]' },
    { label: 'Needs Review', value: candidates.filter(c => c.stage === 'Submitted').length || 12, icon: UserPlus, color: 'text-orange-700', bg: 'bg-orange-100' },
  ];

  // Pie chart data
  const pipelineData = [
    { name: 'Active', value: 68, fill: '#4b6b8b' },
    { name: 'Inactive', value: 32, fill: '#cbd5e1' },
  ];

  // Horizontal bar chart data (Top 10 Stores / Vendors)
  const topVendorsData = [...vendors]
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 8)
    .map(v => ({
      name: v.name.split(' ')[0],
      score: v.performanceScore,
    }));
  
  // Fill mock data if not enough
  while (topVendorsData.length < 8) {
    topVendorsData.push({ name: `Vendor ${topVendorsData.length + 1}`, score: 50 - topVendorsData.length * 5 });
  }

  // Area chart data
  const trendData = [
    { month: 'Dec', profit: 25000, expense: 15000 },
    { month: 'Jan', profit: 18000, expense: 22000 },
    { month: 'Feb', profit: 22000, expense: 18000 },
    { month: 'Mar', profit: 28000, expense: 20000 },
    { month: 'April', profit: 24000, expense: 32000 },
    { month: 'May', profit: 38000, expense: 26000 },
    { month: 'Jun', profit: 34000, expense: 22000 },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header section (Title) */}
      <div className="flex flex-col mb-2">
        <h2 className="text-[15px] font-bold text-[#1d3557] mb-2">Over View</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {displayStats.map((stat, i) => (
          <Card key={i} className={`stagger-item shadow-sm border ${i === 3 ? 'bg-[#faeee5] border-orange-200' : 'bg-white border-slate-200'} rounded-2xl overflow-hidden card-hover`}>
            <CardContent className="p-4 py-5 flex items-center gap-4">
              <div className={`w-12 h-12 ${i === 3 ? 'bg-transparent border border-orange-300' : stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className={`h-6 w-6 ${i === 3 ? 'text-[#1d3557]' : stat.color}`} />
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-extrabold text-[#1d3557] leading-tight">{stat.value}</p>
                <p className={`text-sm font-semibold ${i === 3 ? 'text-[#1d3557]' : 'text-slate-500'}`}>{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid gap-4 lg:grid-cols-4">
        
        {/* Left Column: Number of Users */}
        <Card className="col-span-1 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start w-full">
            <h3 className="font-semibold text-[#1d3557] text-[15px]">Total Database</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center mt-6 mb-2">
            <div className="w-16 h-16 bg-[#e6eff5] rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Users className="w-8 h-8 text-[#4b6b8b]" />
            </div>
            <p className="text-4xl font-extrabold text-[#1d3557]">{candidates.length + vendors.length} K</p>
            <p className="text-sm font-semibold text-slate-500 mt-2">Total Contacts</p>
          </div>
        </Card>

        {/* Middle Column: Pie Chart */}
        <Card className="col-span-1 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col">
          <h3 className="font-semibold text-[#1d3557] text-[15px]">System Values</h3>
          <div className="flex-1 flex items-center justify-center mt-4">
            <div className="h-[180px] w-full flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[50%] flex flex-col justify-center gap-4 pl-2">
                {pipelineData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: entry.fill }}></div>
                    <span className="text-xs font-semibold text-slate-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column: Top 10 Stores */}
        <Card className="col-span-1 lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col">
          <h3 className="font-semibold text-[#1d3557] text-[15px] mb-4">Top Vendors by Placements</h3>
          <div className="flex-1 w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topVendorsData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }} barSize={8}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="score" radius={[4, 4, 4, 4]} fill="#4b6b8b">
                  {topVendorsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#4b6b8b" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Expense vs Profit Area Chart */}
        <Card className="col-span-1 lg:col-span-3 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[#1d3557] text-[15px]">Hired vs Rejected</h3>
            <span className="text-xs font-semibold text-slate-500">Last 6 months</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="profit" name="Hired" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                <Area type="monotone" dataKey="expense" name="Rejected" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Small extra stat card to fill the remaining column */}
        <Card className="col-span-1 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-between">
           <div>
              <h3 className="font-semibold text-[#1d3557] text-[15px] mb-1">Weekly Summary</h3>
              <p className="text-xs text-slate-500">Quick snapshot of current week</p>
           </div>
           <div className="space-y-4 my-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                 <span className="text-sm font-semibold text-slate-600">New Resumes</span>
                 <span className="text-sm font-bold text-[#1d3557]">142</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                 <span className="text-sm font-semibold text-slate-600">Interviews</span>
                 <span className="text-sm font-bold text-[#1d3557]">38</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                 <span className="text-sm font-semibold text-slate-600">Offers Sent</span>
                 <span className="text-sm font-bold text-[#1d3557]">12</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                 <span className="text-sm font-semibold text-slate-600">Placements</span>
                 <span className="text-sm font-bold text-[#1d3557]">5</span>
              </div>
           </div>
           <button onClick={() => navigate('/reports')} className="text-xs font-bold text-[#4b6b8b] hover:text-[#1d3557] w-full text-center py-2 bg-[#e6eff5] rounded-xl transition-colors">
              View Full Report
           </button>
        </Card>
      </div>
    </div>
  );
}

