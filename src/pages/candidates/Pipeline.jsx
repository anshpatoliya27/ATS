import { useDataStore } from '@/store/dataStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { GripVertical, Star, MoreHorizontal, User } from 'lucide-react';

const STAGES = ['Submitted', 'Screened', 'Interview', 'Hired', 'Rejected'];

const stageColors = {
  Submitted: { bg: 'bg-slate-100', text: 'text-slate-600', accent: 'border-slate-300', dot: 'bg-slate-400' },
  Screened: { bg: 'bg-blue-50', text: 'text-blue-700', accent: 'border-blue-300', dot: 'bg-blue-500' },
  Interview: { bg: 'bg-amber-50', text: 'text-amber-700', accent: 'border-amber-300', dot: 'bg-amber-500' },
  Hired: { bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'border-emerald-300', dot: 'bg-emerald-500' },
  Rejected: { bg: 'bg-red-50', text: 'text-red-700', accent: 'border-red-300', dot: 'bg-red-500' },
};

export function Pipeline() {
  const { candidates, jobs, vendors, updateCandidateStage } = useDataStore();
  const { user } = useAuthStore();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (user?.role === 'Vendor') return;

    const destStage = result.destination.droppableId;
    const sourceStage = result.source.droppableId;
    if (sourceStage === destStage) return;

    updateCandidateStage(result.draggableId, destStage);
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Hiring Pipeline</h2>
          <p className="text-[#64748B] mt-1 text-base">Drag candidates between stages to update their status.</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#64748B]">
          <span className="font-semibold text-[#0F172A]">{candidates.length}</span> total candidates
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5 overflow-x-auto pb-4 flex-1 min-h-0">
          {STAGES.map(stage => {
            const stageCandidates = candidates.filter(c => c.stage === stage);
            const colors = stageColors[stage];
            return (
              <div key={stage} className="flex-shrink-0 w-[300px] flex flex-col min-h-0">
                {/* Column Header */}
                <div className={`flex items-center justify-between mb-4 px-1`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></div>
                    <h3 className="font-bold text-sm text-[#0F172A] uppercase tracking-wider">{stage}</h3>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colors.bg} ${colors.text}`}>
                      {stageCandidates.length}
                    </span>
                  </div>
                  <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#94A3B8]" />
                  </button>
                </div>
                
                {/* Droppable column */}
                <Droppable droppableId={stage}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 overflow-y-auto space-y-3 p-2 rounded-xl border-2 border-dashed transition-all duration-200 min-h-[200px] ${
                        snapshot.isDraggingOver 
                          ? `${colors.bg} ${colors.accent}` 
                          : 'border-transparent bg-gray-50/70'
                      }`}
                    >
                      {stageCandidates.map((candidate, index) => {
                        const job = jobs.find(j => j.id === candidate.jobId);
                        const vendor = vendors.find(v => v.id === candidate.vendorId);
                        return (
                          <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`bg-white rounded-xl border border-[#E2E8F0] p-4 cursor-grab active:cursor-grabbing transition-all duration-200 group ${
                                  snapshot.isDragging 
                                    ? 'shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-2 ring-[#2563EB] rotate-[1deg] scale-[1.02]' 
                                    : 'shadow-sm hover:shadow-md hover:border-[#2563EB]/30'
                                }`}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div {...provided.dragHandleProps} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                      <GripVertical className="w-4 h-4 text-[#94A3B8]" />
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 text-xs">
                                      {candidate.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                      <div className="font-bold text-sm text-[#0F172A] leading-tight">{candidate.name}</div>
                                      <div className="text-xs text-[#64748B] mt-0.5">{candidate.email}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2.5 ml-7">
                                  <div className="text-xs font-semibold text-[#2563EB] bg-blue-50 inline-block px-2 py-1 rounded-md">
                                    {job?.title}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                                      <User className="w-3 h-3" />
                                      <span className="font-medium">{vendor?.name}</span>
                                    </div>
                                    {candidate.score && (
                                      <div className="flex items-center gap-1 text-xs">
                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        <span className="font-bold text-[#0F172A]">{candidate.score}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      
                      {/* Empty state */}
                      {stageCandidates.length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <User className="w-5 h-5 text-[#94A3B8]" />
                          </div>
                          <p className="text-sm font-medium text-[#94A3B8]">No candidates</p>
                          <p className="text-xs text-[#CBD5E1] mt-1">Drag candidates here</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
