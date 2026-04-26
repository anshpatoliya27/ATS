import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, MessageSquare, CheckCircle, XCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HiringManagerDashboard() {
  const { user } = useAuthStore();
  const { candidates, jobs, updateCandidateStage, showToast } = useDataStore();
  const navigate = useNavigate();

  const toReview = candidates.filter(c => c.stage === 'Screened' || c.stage === 'Interview');
  const interviewCandidates = candidates.filter(c => c.stage === 'Interview');
  const hired = candidates.filter(c => c.stage === 'Hired');

  const stats = [
    { label: 'To Review', value: toReview.length, icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'In Interview', value: interviewCandidates.length, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Hired', value: hired.length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  const handleHire = (candidateId, candidateName, e) => {
    e.stopPropagation();
    updateCandidateStage(candidateId, 'Hired');
    showToast(`${candidateName} has been hired! 🎉`, 'success');
  };

  const handleReject = (candidateId, candidateName, e) => {
    e.stopPropagation();
    updateCandidateStage(candidateId, 'Rejected');
    showToast(`${candidateName} has been rejected`, 'info');
  };

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
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Hiring Manager</h2>
          <p className="text-[#64748B] mt-1 text-base">Welcome back, <span className="font-semibold text-[#0F172A]">{user?.name}</span>. Review candidates and make hiring decisions.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
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

      {/* Candidates to review */}
      <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
        <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">Candidates Awaiting Review</h3>
            <p className="text-xs font-medium text-[#64748B] mt-1">Screened and interview candidates need your feedback</p>
          </div>
          <button 
            onClick={() => navigate('/pipeline')}
            className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
          >
            View pipeline <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <CardContent className="p-0 bg-white">
          <div className="divide-y divide-[#F1F5F9]">
            {toReview.map(candidate => {
              const job = jobs.find(j => j.id === candidate.jobId);
              return (
                <div key={candidate.id} className="flex items-center p-5 hover:bg-[#F8FAFC] transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-700 font-bold border border-blue-100 shadow-sm text-lg">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{candidate.name}</p>
                    <p className="text-xs font-medium text-[#64748B] mt-0.5 flex items-center gap-2">
                      <span>{job?.title}</span>
                      <span className="w-1 h-1 bg-[#CBD5E1] rounded-full"></span>
                      <span>{job?.department}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {candidate.score && (
                      <div className="flex items-center gap-1 text-sm bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-extrabold text-[#0F172A]">{candidate.score}</span>
                      </div>
                    )}
                    <span className={`inline-flex items-center border px-3 py-1 text-xs font-bold rounded-full ${stageColors[candidate.stage] || 'bg-gray-100 text-[#64748B] border-gray-200'}`}>
                      {candidate.stage}
                    </span>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-9 w-9 p-0 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={(e) => handleHire(candidate.id, candidate.name, e)}
                        title="Hire candidate"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-9 w-9 p-0 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={(e) => handleReject(candidate.id, candidate.name, e)}
                        title="Reject candidate"
                      >
                        <XCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {toReview.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-100">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="font-extrabold text-lg text-[#0F172A]">All caught up!</p>
                <p className="text-sm font-medium text-[#64748B] mt-1">No candidates waiting for your review.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
