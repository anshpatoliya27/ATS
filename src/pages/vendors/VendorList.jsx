import { useDataStore } from '@/store/dataStore';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Search, Plus, Users, TrendingUp, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export function VendorList() {
  const { vendors, addVendor, showToast } = useDataStore();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', contactName: '', email: '', status: 'Active' });

  const canManage = user?.role === 'Admin' || user?.role === 'HR';

  const filtered = vendors.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.contactName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!newVendor.name.trim() || !newVendor.contactName.trim() || !newVendor.email.trim()) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    addVendor(newVendor);
    setNewVendor({ name: '', contactName: '', email: '', status: 'Active' });
    setShowAddModal(false);
    showToast('Vendor added successfully!', 'success');
  };

  const avgScore = vendors.length > 0 ? Math.round(vendors.reduce((a, v) => a + v.performanceScore, 0) / vendors.length) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Vendors</h2>
          <p className="text-[#64748B] mt-1 text-base">Manage your recruitment agency partners and track performance.</p>
        </div>
        {canManage && (
          <Button 
            onClick={() => setShowAddModal(true)}
            className="h-11 px-6 rounded-xl shadow-md shadow-blue-200/50 bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Vendor
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Vendors', value: vendors.length, icon: Users, color: 'bg-blue-50 text-blue-700' },
          { label: 'Active', value: vendors.filter(v => v.status === 'Active').length, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Inactive', value: vendors.filter(v => v.status === 'Inactive').length, icon: Users, color: 'bg-red-50 text-red-700' },
          { label: 'Avg Score', value: `${avgScore}%`, icon: Briefcase, color: 'bg-amber-50 text-amber-700' },
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
                <TableRow key={vendor.id} className="group cursor-pointer">
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
                          className={`h-full rounded-full transition-all duration-700 ${vendor.performanceScore >= 90 ? 'bg-emerald-500' : vendor.performanceScore >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
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
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-7 h-7 text-[#94A3B8]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">No vendors found</p>
                        <p className="text-sm text-[#64748B] mt-1">Try adjusting your search criteria.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm text-[#64748B] bg-gray-50/50">
            <div>Showing <span className="font-semibold text-[#0F172A]">{filtered.length}</span> of {vendors.length} vendors</div>
          </div>
        </CardContent>
      </Card>

      {/* Add Vendor Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} size="md">
        <ModalHeader onClose={() => setShowAddModal(false)}>
          <h3 className="text-xl font-bold text-[#0F172A]">Add New Vendor</h3>
          <p className="text-sm text-[#64748B] mt-1">Register a new recruitment agency partner.</p>
        </ModalHeader>
        <form onSubmit={handleAddVendor}>
          <ModalBody>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Agency Name *</Label>
                <Input
                  placeholder="e.g. TechTalent Partners"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, name: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Contact Person *</Label>
                <Input
                  placeholder="e.g. John Smith"
                  value={newVendor.contactName}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, contactName: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Email *</Label>
                <Input
                  type="email"
                  placeholder="e.g. john@agency.com"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, email: e.target.value }))}
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-[#0F172A]">Status</Label>
                <select
                  className="flex h-11 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] shadow-sm transition-colors"
                  value={newVendor.status}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="rounded-xl px-5">Cancel</Button>
            <Button type="submit" className="rounded-xl px-6 bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md shadow-blue-200/50">
              <Plus className="mr-2 h-4 w-4" /> Add Vendor
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
