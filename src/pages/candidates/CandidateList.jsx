import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileText, Star } from 'lucide-react';
import { useState } from 'react';

const stageBadgeVariant = {
  Submitted: 'default',
  Screened: 'secondary',
  Interview: 'warning',
  Hired: 'success',
  Rejected: 'destructive',
};

export function CandidateList() {
  const { candidates, jobs, vendors } = useDataStore();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');

  const stages = ['All', 'Submitted', 'Screened', 'Interview', 'Hired', 'Rejected'];

  const filtered = candidates.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'All' || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Candidates</h2>
          <p className="text-[#64748B] mt-1 text-base">Review and manage all submitted candidates.</p>
        </div>
      </div>

      {/* Stage filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {stages.map(stage => (
          <button
            key={stage}
            onClick={() => setStageFilter(stage)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              stageFilter === stage
                ? 'bg-[#2563EB] text-white border-transparent shadow-md shadow-blue-200'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:bg-gray-50 hover:text-[#0F172A]'
            }`}
          >
            {stage}
            {stage !== 'All' && (
              <span className={`ml-1.5 text-xs ${stageFilter === stage ? 'text-blue-200' : 'text-[#94A3B8]'}`}>
                {candidates.filter(c => c.stage === stage).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <Card className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] bg-white">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#64748B] transition-colors group-focus-within:text-[#2563EB]" />
            <Input
              type="search"
              placeholder="Search by name or email..."
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
                <TableHead className="w-[25%]">Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((candidate) => {
                const job = jobs.find(j => j.id === candidate.jobId);
                const vendor = vendors.find(v => v.id === candidate.vendorId);
                return (
                  <TableRow key={candidate.id} className="group cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 text-sm">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{candidate.name}</div>
                          <div className="text-sm text-[#64748B]">{candidate.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-[#0F172A]">{job?.title}</div>
                      <div className="text-sm text-[#64748B]">{job?.department}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-[#0F172A]">{vendor?.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stageBadgeVariant[candidate.stage] || 'secondary'} className="px-3 py-1 text-xs">
                        {candidate.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {candidate.score ? (
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-[#0F172A]">{candidate.score}</span>
                          <span className="text-[#94A3B8] text-xs">/100</span>
                        </div>
                      ) : (
                        <span className="text-[#94A3B8] text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-[#64748B] text-sm font-medium">{candidate.submittedAt}</TableCell>
                    <TableCell>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-gray-100" title="View Resume">
                        <FileText className="w-4 h-4 text-[#64748B]" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="w-7 h-7 text-[#94A3B8]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">No candidates found</p>
                        <p className="text-sm text-[#64748B] mt-1">Try adjusting your search or filter criteria.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm text-[#64748B] bg-gray-50/50">
            <div>Showing <span className="font-semibold text-[#0F172A]">{filtered.length}</span> of {candidates.length} candidates</div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-gray-50 font-medium disabled:opacity-50 transition-colors" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-gray-50 font-medium disabled:opacity-50 transition-colors" disabled>Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
