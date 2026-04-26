/**
 * PageHeader — reusable page header component.
 * Used across all feature pages for consistent title + description + optional action button.
 */
export function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">{title}</h2>
        {description && (
          <p className="text-[#64748B] mt-1 text-base">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
