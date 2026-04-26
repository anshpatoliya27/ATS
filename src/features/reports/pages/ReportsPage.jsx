import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Briefcase, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Reports() {
  const { vendors, jobs, candidates } = useDataStore();

  const totalCandidates = candidates.length;
  const hiredCount = candidates.filter(c => c.stage === 'Hired').length;
  const rejectedCount = candidates.filter(c => c.stage === 'Rejected').length;
  const conversionRate = totalCandidates > 0 ? Math.round((hiredCount / totalCandidates) * 100) : 0;
  const activeVendors = vendors.filter(v => v.status === 'Active').length;
  const avgScore = Math.round(vendors.reduce((acc, v) => acc + v.performanceScore, 0) / vendors.length);
  const openJobs = jobs.filter(j => j.status === 'Open').length;

  const stageData = ['Submitted', 'Screened', 'Interview', 'Hired', 'Rejected'].map(stage => ({
    stage,
    count: candidates.filter(c => c.stage === stage).length,
    percent: totalCandidates > 0 ? Math.round((candidates.filter(c => c.stage === stage).length / totalCandidates) * 100) : 0,
  }));

  const stageColors = {
    Submitted: 'bg-slate-400',
    Screened: 'bg-blue-500',
    Interview: 'bg-amber-500',
    Hired: 'bg-emerald-500',
    Rejected: 'bg-red-400',
  };

  const kpis = [
    { label: 'Total Candidates', value: totalCandidates, icon: Users, trend: '+12%', positive: true },
    { label: 'Open Positions', value: openJobs, icon: Briefcase, trend: `${jobs.filter(j => j.status === 'Draft').length} draft`, positive: true },
    { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, trend: '+3.2%', positive: true },
    { label: 'Avg Vendor Score', value: avgScore, icon: BarChart3, trend: `${activeVendors} active`, positive: true },
  ];

  // Department breakdown
  const departments = [...new Set(jobs.map(j => j.department))];
  const deptData = departments.map(dept => {
    const deptJobs = jobs.filter(j => j.department === dept);
    const deptCandidates = candidates.filter(c => deptJobs.some(j => j.id === c.jobId));
    return { dept, jobs: deptJobs.length, candidates: deptCandidates.length };
  });

  // Top vendors by submissions
  const vendorPerf = vendors.map(v => ({
    ...v,
    candidateCount: candidates.filter(c => c.vendorId === v.id).length,
    hiredCount: candidates.filter(c => c.vendorId === v.id && c.stage === 'Hired').length,
  })).sort((a, b) => b.candidateCount - a.candidateCount);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Reports & Analytics</h2>
        <p className="text-[#64748B] mt-1 text-base">Recruitment metrics and performance insights.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="stagger-item border-none shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] transition-all duration-300 card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-3xl font-bold text-[#0F172A] mt-2">{kpi.value}</p>
                </div>
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                  <kpi.icon className="h-6 w-6 text-[#2563EB]" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm">
                {kpi.positive ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`font-semibold ${kpi.positive ? 'text-emerald-600' : 'text-red-600'}`}>{kpi.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pipeline Funnel */}
        <Card className="border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="text-lg font-bold text-[#0F172A]">Pipeline Funnel</h3>
            <p className="text-sm text-[#64748B]">Candidate distribution across stages</p>
          </div>
          <CardContent className="p-6">
            <div className="space-y-5">
              {stageData.map(item => (
                <div key={item.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#0F172A]">{item.stage}</span>
                    <span className="text-sm font-bold text-[#0F172A]">{item.count} <span className="text-[#94A3B8] font-medium">({item.percent}%)</span></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stageColors[item.stage]} transition-all duration-700`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Breakdown */}
        <Card className="border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h3 className="text-lg font-bold text-[#0F172A]">Department Overview</h3>
            <p className="text-sm text-[#64748B]">Jobs and candidates per department</p>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {deptData.map(item => (
                <div key={item.dept} className="flex items-center p-5 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 text-sm">
                    {item.dept.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-bold text-[#0F172A]">{item.dept}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">{item.jobs} job(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0F172A]">{item.candidates}</p>
                    <p className="text-xs text-[#64748B]">candidates</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance */}
      <Card className="border-[#E2E8F0] shadow-sm">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-bold text-[#0F172A]">Vendor Performance</h3>
          <p className="text-sm text-[#64748B]">Submissions and hiring success by agency</p>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="text-left p-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Agency</th>
                  <th className="text-left p-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Score</th>
                  <th className="text-left p-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Candidates</th>
                  <th className="text-left p-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Hired</th>
                  <th className="text-left p-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {vendorPerf.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                          {v.name.charAt(0)}
                        </div>
                        <span className="font-bold text-sm text-[#0F172A]">{v.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${v.performanceScore >= 90 ? 'bg-emerald-500' : v.performanceScore >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${v.performanceScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-[#0F172A]">{v.performanceScore}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-[#0F172A]">{v.candidateCount}</td>
                    <td className="p-4 text-sm font-semibold text-emerald-600">{v.hiredCount}</td>
                    <td className="p-4 text-sm font-semibold text-[#0F172A]">
                      {v.candidateCount > 0 ? Math.round((v.hiredCount / v.candidateCount) * 100) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
