import { useDataStore } from '@/store/dataStore';
import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function ToastNotification() {
  const { toast, clearToast } = useDataStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => clearToast(), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-lg shadow-black/5 backdrop-blur-xl min-w-[320px] max-w-[480px] ${bgColors[toast.type] || bgColors.success}`}>
        {icons[toast.type] || icons.success}
        <span className="text-sm font-semibold text-[#0F172A] flex-1">{toast.message}</span>
        <button onClick={clearToast} className="p-1 rounded-lg hover:bg-black/5 transition-colors">
          <X className="w-4 h-4 text-[#64748B]" />
        </button>
      </div>
    </div>
  );
}
