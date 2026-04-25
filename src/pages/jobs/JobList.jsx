import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, MapPin, Briefcase as BriefcaseIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export function JobList() {
  const { jobs, vendors } = useDataStore();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');

  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Job Requisitions</h2>
          <p className="text-[#64748B] mt-1 text-base">Manage open roles and track vendor assignments.</p>
        </div>
        {(user?.role === 'Admin' || user?.role === 'HR') && (
          <Button className="h-11 px-6 rounded-xl shadow-md shadow-primary/20 bg-[#2563EB] hover:bg-[#1D4ED8]">
            <Plus className="mr-2 h-5 w-5" /> Create Requisition
          </Button>
        )}
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
                <TableHead className="w-[35%]">Role Details</TableHead>
                <TableHead>Location & Type</TableHead>
                <TableHead>Assigned Agencies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((job) => (
                <TableRow key={job.id} className="group cursor-pointer">
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
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-[#64748B]">
                    No job requisitions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm text-[#64748B] bg-gray-50/50">
            <div>Showing {filtered.length} requisitions</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md border border-[#E2E8F0] bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-md border border-[#E2E8F0] bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
