export default function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            {eyebrow}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-teal-400/45" />
        </div>
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>
      </div>

      {action ? (
        <div className="flex shrink-0 items-center justify-start lg:justify-end">{action}</div>
      ) : description ? (
        <p className="max-w-sm font-mono text-xs leading-relaxed text-slate-400 sm:text-sm">
          <span aria-hidden="true" className="mr-1 text-teal-400/70">//</span>
          {description}
        </p>
      ) : null}
    </div>
  );
}
