/**
 * Candidate pipeline stages in order.
 */
export const STAGES = ['Submitted', 'Screened', 'Interview', 'Hired', 'Rejected'];

/**
 * Badge variant mapping for each stage.
 */
export const STAGE_BADGE_VARIANT = {
  Submitted: 'default',
  Screened: 'secondary',
  Interview: 'warning',
  Hired: 'success',
  Rejected: 'destructive',
};

/**
 * Color tokens for pipeline columns.
 */
export const STAGE_COLORS = {
  Submitted: { bg: 'bg-slate-100', text: 'text-slate-600', accent: 'border-slate-300', dot: 'bg-slate-400', bar: 'bg-slate-400' },
  Screened: { bg: 'bg-blue-50', text: 'text-blue-700', accent: 'border-blue-300', dot: 'bg-blue-500', bar: 'bg-blue-500' },
  Interview: { bg: 'bg-amber-50', text: 'text-amber-700', accent: 'border-amber-300', dot: 'bg-amber-500', bar: 'bg-amber-500' },
  Hired: { bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'border-emerald-300', dot: 'bg-emerald-500', bar: 'bg-emerald-500' },
  Rejected: { bg: 'bg-red-50', text: 'text-red-700', accent: 'border-red-300', dot: 'bg-red-500', bar: 'bg-red-400' },
};
