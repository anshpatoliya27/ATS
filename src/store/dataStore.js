import { create } from 'zustand';

export const useDataStore = create((set, get) => ({
  vendors: [
    { id: 'v1', name: 'TechTalent Partners', contactName: 'Alice Smith', email: 'alice@techtalent.com', performanceScore: 92, activeJobs: 3, totalSubmissions: 45, status: 'Active' },
    { id: 'v2', name: 'Global Recruits', contactName: 'Bob Johnson', email: 'bob@globalrec.com', performanceScore: 78, activeJobs: 5, totalSubmissions: 120, status: 'Active' },
    { id: 'v3', name: 'Elite Hire', contactName: 'Charlie Davis', email: 'charlie@elitehire.com', performanceScore: 85, activeJobs: 2, totalSubmissions: 30, status: 'Inactive' },
    { id: 'v4', name: 'PrimeStaff Solutions', contactName: 'Diana Lee', email: 'diana@primestaff.com', performanceScore: 88, activeJobs: 4, totalSubmissions: 67, status: 'Active' },
    { id: 'v5', name: 'HireRight Agency', contactName: 'Evan Park', email: 'evan@hireright.com', performanceScore: 71, activeJobs: 1, totalSubmissions: 15, status: 'Active' },
  ],
  jobs: [
    { id: 'j1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', status: 'Open', openings: 2, assignedVendors: ['v1', 'v2'], createdAt: '2023-10-01', salary: '$120k - $160k', description: 'We are looking for an experienced Frontend Engineer to lead UI development.' },
    { id: 'j2', title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time', status: 'Open', openings: 1, assignedVendors: ['v2', 'v4'], createdAt: '2023-10-05', salary: '$130k - $170k', description: 'Lead product strategy and drive feature development for our SaaS platform.' },
    { id: 'j3', title: 'UX Designer', department: 'Design', location: 'San Francisco, CA', type: 'Contract', status: 'Draft', openings: 1, assignedVendors: [], createdAt: '2023-10-10', salary: '$90k - $120k', description: 'Design intuitive user experiences for our growing product suite.' },
    { id: 'j4', title: 'Backend Engineer', department: 'Engineering', location: 'Austin, TX', type: 'Full-time', status: 'Open', openings: 3, assignedVendors: ['v1', 'v4', 'v5'], createdAt: '2023-09-28', salary: '$110k - $150k', description: 'Build scalable backend services and APIs.' },
    { id: 'j5', title: 'Data Analyst', department: 'Analytics', location: 'Remote', type: 'Full-time', status: 'Open', openings: 1, assignedVendors: ['v2'], createdAt: '2023-10-12', salary: '$80k - $110k', description: 'Analyze data and generate insights to drive business decisions.' },
    { id: 'j6', title: 'DevOps Engineer', department: 'Infrastructure', location: 'Seattle, WA', type: 'Full-time', status: 'Closed', openings: 1, assignedVendors: ['v3'], createdAt: '2023-08-15', salary: '$120k - $155k', description: 'Manage cloud infrastructure and CI/CD pipelines.' },
  ],
  candidates: [
    { id: 'c1', name: 'John Doe', email: 'john@example.com', jobId: 'j1', vendorId: 'v1', stage: 'Submitted', submittedAt: '2023-10-11', resumeUrl: '#', score: 85 },
    { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', jobId: 'j1', vendorId: 'v2', stage: 'Interview', submittedAt: '2023-10-12', resumeUrl: '#', score: 92 },
    { id: 'c3', name: 'Michael Brown', email: 'michael@example.com', jobId: 'j2', vendorId: 'v2', stage: 'Screened', submittedAt: '2023-10-13', resumeUrl: '#', score: 78 },
    { id: 'c4', name: 'Emily Chen', email: 'emily.chen@example.com', jobId: 'j4', vendorId: 'v1', stage: 'Interview', submittedAt: '2023-10-14', resumeUrl: '#', score: 90 },
    { id: 'c5', name: 'David Wilson', email: 'david.w@example.com', jobId: 'j1', vendorId: 'v1', stage: 'Screened', submittedAt: '2023-10-14', resumeUrl: '#', score: 76 },
    { id: 'c6', name: 'Sarah Miller', email: 'sarah.m@example.com', jobId: 'j2', vendorId: 'v4', stage: 'Submitted', submittedAt: '2023-10-15', resumeUrl: '#', score: 82 },
    { id: 'c7', name: 'Alex Kumar', email: 'alex.k@example.com', jobId: 'j4', vendorId: 'v5', stage: 'Submitted', submittedAt: '2023-10-16', resumeUrl: '#', score: 68 },
    { id: 'c8', name: 'Rachel Torres', email: 'rachel.t@example.com', jobId: 'j5', vendorId: 'v2', stage: 'Hired', submittedAt: '2023-09-20', resumeUrl: '#', score: 95 },
    { id: 'c9', name: 'Kevin Patel', email: 'kevin.p@example.com', jobId: 'j4', vendorId: 'v4', stage: 'Rejected', submittedAt: '2023-10-01', resumeUrl: '#', score: 55 },
    { id: 'c10', name: 'Lisa Nguyen', email: 'lisa.n@example.com', jobId: 'j1', vendorId: 'v2', stage: 'Screened', submittedAt: '2023-10-17', resumeUrl: '#', score: 88 },
  ],

  // Notifications
  notifications: [
    { id: 'n1', message: 'New candidate Jane Smith submitted for Senior Frontend Engineer', time: '2 hours ago', read: false },
    { id: 'n2', message: 'Rachel Torres has been hired for Data Analyst role', time: '1 day ago', read: false },
    { id: 'n3', message: 'TechTalent Partners updated their profile', time: '2 days ago', read: true },
  ],

  // Toast state
  toast: null,
  showToast: (message, type = 'success') => set({ toast: { message, type, id: Date.now() } }),
  clearToast: () => set({ toast: null }),

  // Job CRUD
  addJob: (job) => set((state) => {
    const newJob = {
      ...job,
      id: 'j' + (state.jobs.length + 1) + '_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    return { jobs: [...state.jobs, newJob] };
  }),
  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map(j => j.id === jobId ? { ...j, ...updates } : j)
  })),
  deleteJob: (jobId) => set((state) => ({
    jobs: state.jobs.filter(j => j.id !== jobId)
  })),

  // Candidate operations
  addCandidate: (candidate) => set((state) => {
    const newCandidate = {
      ...candidate,
      id: 'c' + (state.candidates.length + 1) + '_' + Date.now(),
      submittedAt: new Date().toISOString().split('T')[0],
      stage: 'Submitted',
    };
    return { candidates: [...state.candidates, newCandidate] };
  }),
  updateCandidateStage: (candidateId, stage) => set((state) => ({
    candidates: state.candidates.map(c => c.id === candidateId ? { ...c, stage } : c)
  })),

  // Vendor operations
  addVendor: (vendor) => set((state) => {
    const newVendor = {
      ...vendor,
      id: 'v' + (state.vendors.length + 1) + '_' + Date.now(),
      performanceScore: 0,
      activeJobs: 0,
      totalSubmissions: 0,
    };
    return { vendors: [...state.vendors, newVendor] };
  }),
  updateVendor: (vendorId, updates) => set((state) => ({
    vendors: state.vendors.map(v => v.id === vendorId ? { ...v, ...updates } : v)
  })),

  // Notification operations
  markNotificationRead: (notifId) => set((state) => ({
    notifications: state.notifications.map(n => n.id === notifId ? { ...n, read: true } : n)
  })),
  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
}));
