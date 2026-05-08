import { cn } from '@/lib/utils'

type Breadcrumb = { label: string; href?: string }

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  className?: string
}

export function PageHero({ title, subtitle, breadcrumbs, className }: PageHeroProps) {
  return (
    <section className={cn('bg-primary text-white py-12 px-6', className)}>
      <div className="max-w-7xl mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-3 flex items-center gap-2 text-sm text-white/60">
            <a href="/" className="hover:text-accent-light transition-colors">Home</a>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <a href={crumb.href} className="hover:text-accent-light transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="border-l-4 border-accent pl-5">
          <h1 className="font-display text-3xl md:text-4xl font-normal">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-white/70 text-base max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  )
}
