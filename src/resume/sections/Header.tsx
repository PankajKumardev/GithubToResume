import { Globe, Mail, MapPin, Twitter, Building2, Github } from 'lucide-react';
import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { formatDate } from '@/lib/format';

export function HeaderSection({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  const p = data.profile;
  return (
    <header className="flex items-start gap-5">
      <img
        src={p.avatarUrl}
        alt={`${p.login} avatar`}
        className="h-20 w-20 shrink-0 rounded-md object-cover"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }}
        crossOrigin="anonymous"
      />
      <div className="min-w-0 flex-1">
        <h1
          className="truncate text-[28px] font-semibold leading-[1.05]"
          style={{
            fontFamily: 'var(--theme-font-heading)',
            color: 'var(--theme-text-primary)',
            letterSpacing: theme.variant.tightHeadings ? '-0.025em' : '-0.015em',
          }}
        >
          {p.name ?? p.login}
        </h1>
        <div
          className="mt-0.5 text-sm"
          style={{
            color: 'var(--theme-text-muted)',
            fontFamily: 'var(--theme-font-mono)',
          }}
        >
          @{p.login}
          {p.joinedAt ? (
            <span className="ml-2 opacity-80">· joined {formatDate(p.joinedAt)}</span>
          ) : null}
        </div>
        <ul
          className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px]"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {p.location && (
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{p.location}</span>
            </li>
          )}
          {p.company && (
            <li className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>{p.company}</span>
            </li>
          )}
          {p.email && (
            <li className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <a href={`mailto:${p.email}`} className="underline-offset-2 hover:underline">
                {p.email}
              </a>
            </li>
          )}
          {p.website && (
            <li className="inline-flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              <a
                href={p.website}
                target="_blank"
                rel="noreferrer"
                className="max-w-[18ch] truncate underline-offset-2 hover:underline"
              >
                {p.website.replace(/^https?:\/\//, '')}
              </a>
            </li>
          )}
          {p.twitter && (
            <li className="inline-flex items-center gap-1.5">
              <Twitter className="h-3.5 w-3.5" />
              <a
                href={`https://twitter.com/${p.twitter}`}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                @{p.twitter}
              </a>
            </li>
          )}
          <li className="inline-flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" />
            <a
              href={`https://github.com/${p.login}`}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:underline"
            >
              github.com/{p.login}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
