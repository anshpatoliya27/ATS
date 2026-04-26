import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function Settings() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#1d3557] tracking-tight">System Settings</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-[#1d3557]">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
               <Label className="font-bold text-[#1d3557]">Full Name</Label>
               <Input placeholder="Enter your name" defaultValue="Demo User" className="rounded-xl border-slate-200 focus-visible:ring-[#1d3557]/20" />
            </div>
            <div className="space-y-2">
               <Label className="font-bold text-[#1d3557]">Email Address</Label>
               <Input placeholder="Enter email" defaultValue="demo@hireflow.com" className="rounded-xl border-slate-200 focus-visible:ring-[#1d3557]/20" />
            </div>
            <Button className="bg-[#1d3557] hover:bg-[#2A4B65] text-white rounded-xl shadow-md w-full mt-4">Save Profile</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-[#1d3557]">System Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
               <div>
                 <p className="font-bold text-[#1d3557]">Email Notifications</p>
                 <p className="text-sm text-slate-500 font-medium">Receive alerts for new candidate submissions.</p>
               </div>
               <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#1d3557] rounded" />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
               <div>
                 <p className="font-bold text-[#1d3557]">Daily Report</p>
                 <p className="text-sm text-slate-500 font-medium">Get a daily digest of pipeline velocity.</p>
               </div>
               <input type="checkbox" className="w-5 h-5 accent-[#1d3557] rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
