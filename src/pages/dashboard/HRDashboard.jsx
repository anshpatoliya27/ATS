import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { Briefcase, UserPlus, Calendar, PlusCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HRDashboard() {
  const { user } = useAuthStore();
  const { jobs, candidates, vendors, addJob, showToast } = useDataStore();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '', department: '', location: '', type: 'Full-time',
    status: 'Open', openings: 1, salary: '', description: '', assignedVendors: [],
  });

  const activeJobs = jobs.filter(j => j.status === 'Open');
  const inPipeline = candidates.filter(c => c.stage !== 'Hired' && c.stage !== 'Rejected');
  const interviewCandidates = candidates.filter(c => c.stage === 'Interview');

  const stats = [
    { label: 'Active Requisitions', value: activeJobs.length, icon: Briefcase, color: 'from-blue-500 to-blue-600', desc: `${jobs.filter(j => j.status === 'Draft').length} in draft` },
    { label: 'Candidates in Pipeline', value: inPipeline.length, icon: UserPlus, color: 'from-violet-500 to-violet-600', desc: `${candidates.filter(c => c.stage === 'Submitted').length} new today` },
    { label: 'Interviews Scheduled', value: interviewCandidates.length, icon: Calendar, color: 'from-amber-500 to-amber-600', desc: 'This week' },
  ];

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJob.title.trim() || !newJob.department.trim() || !newJob.location.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    addJob(newJob);
    setNewJob({ title: '', department: '', location: '', type: 'Full-time', status: 'Open', openings: 1, salary: '', description: '', assignedVendors: [] });
    setShowCreateModal(false);
    showToast('Job requisition created successfully!', 'success');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">HR Dashboard</h2>
          <p className="text-[#64748B] mt-1 text-base">Welcome back, {user?.name}. Here's your recruitment overview.</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="h-11 px-6 rounded-xl shadow-md shadow-blue-200/50 bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Create Job
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="stagger-item border-none shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden card-hover">
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
              <div className="mt-4 flex items-center text-sm">
                <span className="text-[#64748B] font-medium">{stat.desc}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Candidate pipeline mini-view */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Pipeline Overview</h3>
              <p className="text-sm text-[#64748B]">Current stage distribution</p>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {['Submitted', 'Screened', 'Interview', 'Hired', 'Rejected'].map(stage => {
                const count = candidates.filter(c => c.stage === stage).length;
                const percent = candidates.length > 0 ? (count / candidates.length) * 100 : 0;
                const colors = {
                  Submitted: 'bg-slate-400',
                  Screened: 'bg-blue-500',
                  Interview: 'bg-amber-500',
                  Hired: 'bg-emerald-500',
                  Rejected: 'bg-red-400',
                };
                return (
                  <div key={stage} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-[#0F172A] w-24">{stage}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${colors[stage]} transition-all duration-500`} style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-[#0F172A] w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0] shadow-sm">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Active Requisitions</h3>
              <p className="text-sm text-[#64748B]">Open positions requiring attention</p>
            </div>
            <button 
              onClick={() => navigate('/jobs')}
              className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {activeJobs.slice(0, 4).map(job => (
                <div 
                  key={job.id} 
                  className="flex items-center p-5 hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => navigate('/jobs')}
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{job.title}</p>
                    <p className="text-xs text-[#64748B] mt-1 flex items-center gap-2">
                      {job.department}
                      <span className="w-1 h-1 bg-[#CBD5E1] rounded-full"></span>
                      {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="success" className="px-3 py-1 text-xs">{job.status}</Badge>
                    <div className="flex items-center gap-1 text-xs text-[#64748B]">
                      <Clock className="w-3.5 h-3.5" />
                      {job.createdAt}
                    </div>
                  </div>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <div className="p-8 text-center text-[#64748B]">No active requisitions.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Create Job Modal */}
      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} size="md">
        <ModalHeader onClose={() => setShowCreateModal(false)}>
          <h3 className="text-xl font-bold text-[#0F172A]">Quick Create Job</h3>
          <p className="text-sm text-[#64748B] mt-1">Add a new job requisition.</p>
        </ModalHeader>
        <form onSubmit={handleCreateJob}>
          <ModalBody>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Job Title *</Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Department *</Label>
                <Input
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Location *</Label>
                <Input
                  placeholder="e.g. Remote"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Type</Label>
                <select
                  className="flex h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] shadow-sm transition-colors"
                  value={newJob.type}
                  onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Openings</Label>
                <Input
                  type="number"
                  min="1"
                  value={newJob.openings}
                  onChange={(e) => setNewJob(prev => ({ ...prev, openings: parseInt(e.target.value) || 1 }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="rounded-xl px-5">Cancel</Button>
            <Button type="submit" className="rounded-xl px-6 bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md shadow-blue-200/50">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Job
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
