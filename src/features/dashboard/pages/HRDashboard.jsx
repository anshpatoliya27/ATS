import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { Briefcase, UserPlus, Calendar, PlusCircle, ArrowRight, Clock, PieChart as PieChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

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
    { label: 'Active Requisitions', value: activeJobs.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100', desc: `${jobs.filter(j => j.status === 'Draft').length} in draft` },
    { label: 'Candidates in Pipeline', value: inPipeline.length, icon: UserPlus, color: 'text-violet-600', bg: 'bg-violet-100', desc: `${candidates.filter(c => c.stage === 'Submitted').length} new today` },
    { label: 'Interviews Scheduled', value: interviewCandidates.length, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-100', desc: 'This week' },
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

  const pipelineData = [
    { name: 'Submitted', value: candidates.filter(c => c.stage === 'Submitted').length, fill: '#94a3b8' },
    { name: 'Screened', value: candidates.filter(c => c.stage === 'Screened').length, fill: '#6366f1' },
    { name: 'Interview', value: candidates.filter(c => c.stage === 'Interview').length, fill: '#f59e0b' },
    { name: 'Hired', value: candidates.filter(c => c.stage === 'Hired').length, fill: '#10b981' },
    { name: 'Rejected', value: candidates.filter(c => c.stage === 'Rejected').length, fill: '#ef4444' },
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
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">HR Dashboard</h2>
          <p className="text-[#64748B] mt-1 text-base">Welcome back, <span className="font-semibold text-[#0F172A]">{user?.name}</span>. Here's your recruitment overview.</p>
        </div>
        <div className="animate-slide-up">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="h-11 px-6 rounded-xl shadow-md shadow-blue-500/20 bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 hover:shadow-lg active:scale-[0.98] font-bold"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Create Job
          </Button>
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
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-[#64748B] font-medium text-xs">{stat.desc}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Side: Pipeline Overview */}
        <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item flex flex-col">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-50 rounded-lg">
                <PieChartIcon className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Pipeline Overview</h3>
                <p className="text-xs font-medium text-[#64748B]">Current stage distribution</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/pipeline')}
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
              Go to Pipeline <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-6 bg-white flex-1 flex flex-col justify-center">
            <div className="h-[280px] w-full relative">
              {candidates.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pipelineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      formatter={(value, entry) => <span className="text-sm font-medium text-[#0F172A] ml-1">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#64748B] text-sm font-medium">
                  No candidates in pipeline
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Active Requisitions */}
        <Card className="border-[#E2E8F0] shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl overflow-hidden stagger-item">
          <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Active Requisitions</h3>
                <p className="text-xs font-medium text-[#64748B]">Open positions requiring attention</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/jobs')}
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
              All Jobs <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0 bg-white">
            <div className="divide-y divide-[#F1F5F9]">
              {activeJobs.slice(0, 4).map(job => (
                <div 
                  key={job.id} 
                  className="flex items-center p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                  onClick={() => navigate('/jobs')}
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{job.title}</p>
                    <p className="text-xs font-medium text-[#64748B] mt-1 flex items-center gap-2">
                      {job.department}
                      <span className="w-1 h-1 bg-[#CBD5E1] rounded-full"></span>
                      {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      {job.createdAt}
                    </div>
                    <Badge variant="success" className="px-3 py-1 text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-none">
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <div className="p-8 text-center text-[#64748B] text-sm">No active requisitions.</div>
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
                <Label className="text-sm font-bold text-[#0F172A]">Job Title *</Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#0F172A]">Department *</Label>
                <Input
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#0F172A]">Location *</Label>
                <Input
                  placeholder="e.g. Remote"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#0F172A]">Type</Label>
                <select
                  className="flex h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] shadow-sm transition-colors cursor-pointer"
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
                <Label className="text-sm font-bold text-[#0F172A]">Openings</Label>
                <Input
                  type="number"
                  min="1"
                  value={newJob.openings}
                  onChange={(e) => setNewJob(prev => ({ ...prev, openings: parseInt(e.target.value) || 1 }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white transition-colors"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="rounded-xl px-5 font-bold">Cancel</Button>
            <Button type="submit" className="rounded-xl px-6 bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md shadow-blue-500/20 font-bold">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Job
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
