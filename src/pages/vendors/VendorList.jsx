import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function VendorList() {
  const { vendors } = useDataStore();
  const [search, setSearch] = useState('');

  const filtered = vendors.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.contactName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Vendors</h2>
          <p className="text-[#64748B] mt-1 text-base">Manage your recruitment agency partners and track performance.</p>
        </div>
      </div>

      <Card className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] bg-white">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#64748B] transition-colors group-focus-within:text-[#2563EB]" />
            <Input
              type="search"
              placeholder="Search vendors by name or contact..."
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
                <TableHead className="w-[30%]">Agency Details</TableHead>
                <TableHead>Performance Score</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Total Submissions</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((vendor) => (
                <TableRow key={vendor.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{vendor.name}</div>
                        <div className="text-sm text-[#64748B]">{vendor.contactName} • {vendor.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full ${vendor.performanceScore >= 90 ? 'bg-emerald-500' : vendor.performanceScore >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${vendor.performanceScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#0F172A]">{vendor.performanceScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-[#0F172A]">{vendor.activeJobs}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-[#0F172A]">{vendor.totalSubmissions}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vendor.status === 'Active' ? 'success' : 'secondary'} className="px-3 py-1 text-xs">
                      {vendor.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-[#64748B]">
                    No vendors found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm text-[#64748B] bg-gray-50/50">
            <div>Showing {filtered.length} vendors</div>
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
