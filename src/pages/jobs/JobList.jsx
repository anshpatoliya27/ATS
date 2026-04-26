import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Search, Plus, MapPin, Briefcase as BriefcaseIcon, X, Trash2, Eye, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const emptyJob = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  status: 'Open',
  openings: 1,
  salary: '',
  description: '',
  assignedVendors: [],
};

export function JobList() {
  const { jobs, vendors, addJob, deleteJob, showToast } = useDataStore();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({ ...emptyJob });
  const [errors, setErrors] = useState({});

  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.department.toLowerCase().includes(search.toLowerCase())
  );

  const canManage = user?.role === 'Admin' || user?.role === 'HR';

  const validateForm = () => {
    const newErrors = {};
    if (!newJob.title.trim()) newErrors.title = 'Job title is required';
    if (!newJob.department.trim()) newErrors.department = 'Department is required';
    if (!newJob.location.trim()) newErrors.location = 'Location is required';
    if (newJob.openings < 1) newErrors.openings = 'Must have at least 1 opening';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    addJob(newJob);
    setNewJob({ ...emptyJob });
    setShowCreateModal(false);
    setErrors({});
    showToast('Job requisition created successfully!', 'success');
  };

  const handleDeleteJob = (jobId, e) => {
    e.stopPropagation();
    deleteJob(jobId);
    showToast('Job requisition deleted', 'info');
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowViewModal(true);
  };

  const toggleVendorAssignment = (vendorId) => {
    setNewJob(prev => ({
      ...prev,
      assignedVendors: prev.assignedVendors.includes(vendorId)
        ? prev.assignedVendors.filter(id => id !== vendorId)
        : [...prev.assignedVendors, vendorId]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Job Requisitions</h2>
          <p className="text-[#64748B] mt-1 text-base">Manage open roles and track vendor assignments.</p>
        </div>
        {canManage && (
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="h-11 px-6 rounded-xl shadow-md shadow-blue-200/50 bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/60 active:scale-[0.98]"
          >
            <Plus className="mr-2 h-5 w-5" /> Create Requisition
          </Button>
        )}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: jobs.length, color: 'bg-slate-100 text-slate-700' },
          { label: 'Open', value: jobs.filter(j => j.status === 'Open').length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Draft', value: jobs.filter(j => j.status === 'Draft').length, color: 'bg-amber-50 text-amber-700' },
          { label: 'Closed', value: jobs.filter(j => j.status === 'Closed').length, color: 'bg-red-50 text-red-700' },
        ].map(stat => (
          <div key={stat.label} className={`px-5 py-3.5 rounded-xl ${stat.color} flex items-center justify-between`}>
            <span className="text-sm font-semibold">{stat.label}</span>
            <span className="text-xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      <Card className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] bg-white">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#64748B] transition-colors group-focus-within:text-[#2563EB]" />
            <Input
              type="search"
              placeholder="Search by role or department..."
              className="w-full pl-10 bg-[#F8FAFC] border-transparent focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] transition-all h-10 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30%]">Role Details</TableHead>
                <TableHead>Location & Type</TableHead>
                <TableHead>Assigned Agencies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                {canManage && <TableHead className="w-16"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((job) => (
                <TableRow 
                  key={job.id} 
                  className="group cursor-pointer" 
                  onClick={() => handleViewJob(job)}
                >
                  <TableCell>
                    <div className="font-bold text-[#0F172A] text-base group-hover:text-[#2563EB] transition-colors">{job.title}</div>
                    <div className="text-sm text-[#64748B] mt-1 flex items-center gap-1.5">
                      <BriefcaseIcon className="w-3.5 h-3.5" />
                      {job.department} • <span className="font-medium text-[#0F172A]">{job.openings} opening(s)</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-[#0F172A] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                      {job.location}
                    </div>
                    <div className="text-sm text-[#64748B] mt-1">{job.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2 relative z-0">
                      {job.assignedVendors.slice(0, 3).map(vId => {
                        const vendor = vendors.find(v => v.id === vId);
                        return (
                          <div 
                            key={vId} 
                            className="w-9 h-9 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-700 shadow-sm relative z-10 hover:z-20 transition-transform hover:scale-110" 
                            title={vendor?.name}
                          >
                            {vendor?.name.charAt(0)}
                          </div>
                        )
                      })}
                      {job.assignedVendors.length > 3 && (
                        <div className="w-9 h-9 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm relative z-10">
                          +{job.assignedVendors.length - 3}
                        </div>
                      )}
                      {job.assignedVendors.length === 0 && (
                        <span className="text-[#64748B] text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">Unassigned</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'Open' ? 'success' : job.status === 'Draft' ? 'secondary' : 'outline'} className="px-3 py-1 text-xs">
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#64748B] text-sm font-medium">{job.createdAt}</TableCell>
                  {canManage && (
                    <TableCell>
                      <button 
                        onClick={(e) => handleDeleteJob(job.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={canManage ? 6 : 5} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <BriefcaseIcon className="w-7 h-7 text-[#94A3B8]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">No job requisitions found</p>
                        <p className="text-sm text-[#64748B] mt-1">Try adjusting your search or create a new one.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm text-[#64748B] bg-gray-50/50">
            <div>Showing <span className="font-semibold text-[#0F172A]">{filtered.length}</span> of {jobs.length} requisitions</div>
          </div>
        </CardContent>
      </Card>

      {/* === CREATE JOB MODAL === */}
      <Modal open={showCreateModal} onClose={() => { setShowCreateModal(false); setErrors({}); }} size="lg">
        <ModalHeader onClose={() => { setShowCreateModal(false); setErrors({}); }}>
          <h3 className="text-xl font-bold text-[#0F172A]">Create New Requisition</h3>
          <p className="text-sm text-[#64748B] mt-1">Fill in the details for the new job opening.</p>
        </ModalHeader>
        <form onSubmit={handleCreateJob}>
          <ModalBody>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="job-title" className="text-sm font-semibold text-[#0F172A]">Job Title *</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  className={`h-11 bg-[#F8FAFC] ${errors.title ? 'border-red-300 focus-visible:ring-red-200' : 'border-[#E2E8F0]'}`}
                />
                {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-semibold text-[#0F172A]">Department *</Label>
                <Input
                  id="department"
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                  className={`h-11 bg-[#F8FAFC] ${errors.department ? 'border-red-300' : 'border-[#E2E8F0]'}`}
                />
                {errors.department && <p className="text-xs text-red-500 font-medium">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-[#0F172A]">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. Remote, New York, NY"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  className={`h-11 bg-[#F8FAFC] ${errors.location ? 'border-red-300' : 'border-[#E2E8F0]'}`}
                />
                {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-type" className="text-sm font-semibold text-[#0F172A]">Employment Type</Label>
                <select
                  id="job-type"
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
                <Label htmlFor="status" className="text-sm font-semibold text-[#0F172A]">Status</Label>
                <select
                  id="status"
                  className="flex h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] shadow-sm transition-colors"
                  value={newJob.status}
                  onChange={(e) => setNewJob(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="Open">Open</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openings" className="text-sm font-semibold text-[#0F172A]">Openings *</Label>
                <Input
                  id="openings"
                  type="number"
                  min="1"
                  value={newJob.openings}
                  onChange={(e) => setNewJob(prev => ({ ...prev, openings: parseInt(e.target.value) || 1 }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-sm font-semibold text-[#0F172A]">Salary Range</Label>
                <Input
                  id="salary"
                  placeholder="e.g. $120k - $160k"
                  value={newJob.salary}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-[#0F172A]">Description</Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe the role and responsibilities..."
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  className="flex w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] shadow-sm transition-colors resize-none"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-semibold text-[#0F172A]">Assign Vendors</Label>
                <div className="grid grid-cols-2 gap-2">
                  {vendors.filter(v => v.status === 'Active').map(vendor => (
                    <button
                      key={vendor.id}
                      type="button"
                      onClick={() => toggleVendorAssignment(vendor.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                        newJob.assignedVendors.includes(vendor.id)
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-sm'
                          : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        newJob.assignedVendors.includes(vendor.id) 
                          ? 'bg-[#2563EB] text-white' 
                          : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{vendor.name}</p>
                        <p className="text-xs text-[#64748B]">Score: {vendor.performanceScore}%</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => { setShowCreateModal(false); setErrors({}); }} className="rounded-xl px-5">
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl px-6 bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md shadow-blue-200/50">
              <Plus className="mr-2 h-4 w-4" /> Create Requisition
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* === VIEW JOB MODAL === */}
      <Modal open={showViewModal} onClose={() => setShowViewModal(false)} size="md">
        {selectedJob && (
          <>
            <ModalHeader onClose={() => setShowViewModal(false)}>
              <h3 className="text-xl font-bold text-[#0F172A]">{selectedJob.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={selectedJob.status === 'Open' ? 'success' : selectedJob.status === 'Draft' ? 'secondary' : 'outline'} className="px-3 py-1 text-xs">
                  {selectedJob.status}
                </Badge>
                <span className="text-sm text-[#64748B]">{selectedJob.type}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Department</p>
                    <p className="text-sm font-bold text-[#0F172A] mt-1 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#2563EB]" />{selectedJob.department}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Location</p>
                    <p className="text-sm font-bold text-[#0F172A] mt-1 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#2563EB]" />{selectedJob.location}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Openings</p>
                    <p className="text-sm font-bold text-[#0F172A] mt-1">{selectedJob.openings} position(s)</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Created</p>
                    <p className="text-sm font-bold text-[#0F172A] mt-1">{selectedJob.createdAt}</p>
                  </div>
                </div>
                {selectedJob.salary && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Salary Range</p>
                    <p className="text-lg font-bold text-[#0F172A] mt-1">{selectedJob.salary}</p>
                  </div>
                )}
                {selectedJob.description && (
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Description</p>
                    <p className="text-sm text-[#0F172A] leading-relaxed">{selectedJob.description}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">Assigned Vendors ({selectedJob.assignedVendors.length})</p>
                  {selectedJob.assignedVendors.length > 0 ? (
                    <div className="space-y-2">
                      {selectedJob.assignedVendors.map(vId => {
                        const vendor = vendors.find(v => v.id === vId);
                        return vendor ? (
                          <div key={vId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">{vendor.name.charAt(0)}</div>
                            <span className="text-sm font-semibold text-[#0F172A]">{vendor.name}</span>
                            <span className="ml-auto text-xs font-medium text-[#64748B]">Score: {vendor.performanceScore}%</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-[#94A3B8] italic">No vendors assigned yet</p>
                  )}
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </Modal>
    </div>
  );
}
