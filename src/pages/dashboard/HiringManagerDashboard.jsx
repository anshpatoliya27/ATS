import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, MessageSquare, CheckCircle, XCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HiringManagerDashboard() {
  const { user } = useAuthStore();
  const { candidates, jobs } = useDataStore();

  const toReview = candidates.filter(c => c.stage === 'Screened' || c.stage === 'Interview');
  const interviewCandidates = candidates.filter(c => c.stage === 'Interview');
  const hired = candidates.filter(c => c.stage === 'Hired');

  const stats = [
    { label: 'To Review', value: toReview.length, icon: UserPlus, color: 'from-blue-500 to-blue-600' },
    { label: 'In Interview', value: interviewCandidates.length, icon: MessageSquare, color: 'from-amber-500 to-amber-600' },
    { label: 'Hired', value: hired.length, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Hiring Manager</h2>
        <p className="text-[#64748B] mt-1 text-base">Welcome back, {user?.name}. Review candidates and make hiring decisions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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

      {/* Candidates to review */}
      <Card className="border-[#E2E8F0] shadow-sm">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">Candidates Awaiting Review</h3>
            <p className="text-sm text-[#64748B]">Screened and interview candidates need your feedback</p>
          </div>
          <button className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1">
            View pipeline <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E2E8F0]">
            {toReview.map(candidate => {
              const job = jobs.find(j => j.id === candidate.jobId);
              const stageBadge = {
                Screened: 'secondary', Interview: 'warning',
              };
              return (
                <div key={candidate.id} className="flex items-center p-5 hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 text-sm">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-bold text-[#0F172A]">{candidate.name}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">{job?.title} • {job?.department}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {candidate.score && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-[#0F172A]">{candidate.score}</span>
                      </div>
                    )}
                    <Badge variant={stageBadge[candidate.stage]} className="px-3 py-1 text-xs">{candidate.stage}</Badge>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-emerald-50 hover:text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 hover:text-red-600">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {toReview.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-500" />
                </div>
                <p className="font-semibold text-[#0F172A]">All caught up!</p>
                <p className="text-sm text-[#64748B] mt-1">No candidates waiting for your review.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
