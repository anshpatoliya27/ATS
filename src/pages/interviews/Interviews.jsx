import { useDataStore } from '@/store/dataStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Video, User, Star } from 'lucide-react';

export function Interviews() {
  const { candidates, jobs, vendors } = useDataStore();
  const { user } = useAuthStore();
  
  const interviewCandidates = candidates.filter(c => c.stage === 'Interview');

  // Generate mock interview times
  const getInterviewTime = (index) => {
    const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
    return times[index % times.length];
  };
  
  const getInterviewDate = (index) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Interviews</h2>
          <p className="text-[#64748B] mt-1 text-base">Manage scheduled interviews and candidate meetings.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-bold text-[#2563EB]">{interviewCandidates.length} scheduled</span>
          </div>
        </div>
      </div>

      {interviewCandidates.length > 0 ? (
        <div className="grid gap-5">
          {interviewCandidates.map((candidate, index) => {
            const job = jobs.find(j => j.id === candidate.jobId);
            const vendor = vendors.find(v => v.id === candidate.vendorId);
            return (
              <Card key={candidate.id} className="stagger-item border-none shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Date section */}
                    <div className="w-28 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex flex-col items-center justify-center p-4 text-white">
                      <span className="text-xs font-semibold opacity-80 uppercase">
                        {getInterviewDate(index).split(' ')[0]}
                      </span>
                      <span className="text-2xl font-black mt-1">
                        {getInterviewDate(index).split(' ')[2]}
                      </span>
                      <span className="text-xs font-medium opacity-80">
                        {getInterviewDate(index).split(' ')[1]}
                      </span>
                    </div>
                    
                    {/* Details section */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-base group-hover:text-[#2563EB] transition-colors">{candidate.name}</h4>
                          <p className="text-sm text-[#64748B] mt-0.5">{candidate.email}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">{job?.title}</span>
                            <span className="text-xs text-[#64748B] flex items-center gap-1">
                              <User className="w-3 h-3" /> {vendor?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        {candidate.score && (
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-bold text-[#0F172A]">{candidate.score}</span>
                          </div>
                        )}
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]">
                            <Clock className="w-4 h-4 text-[#64748B]" />
                            {getInterviewTime(index)}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                            <Video className="w-3.5 h-3.5" /> Video Call
                          </div>
                        </div>
                        <Badge variant="warning" className="px-3 py-1 text-xs">Interview</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
          <CardContent className="p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-9 h-9 text-[#94A3B8]" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">No interviews scheduled</h3>
            <p className="text-[#64748B] mt-2 max-w-md mx-auto">When candidates move to the interview stage, they'll appear here with scheduling details.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
