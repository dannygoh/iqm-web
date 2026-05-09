#!/usr/bin/env python3
"""Replace old Metadata imports + exports with pageMetadata() helper across all (site) pages."""
import re, os, glob

SITE_DIR = '/home/dannygoh/iqm-web/src/app/(site)'
pages = glob.glob(f'{SITE_DIR}/**/page.tsx', recursive=True)
pages.append(f'{SITE_DIR}/page.tsx')

updated = 0
for path in pages:
    text = open(path).read()

    # Skip if already uses pageMetadata or has openGraph
    if 'pageMetadata' in text or 'openGraph' in text:
        print(f'  SKIP {path.replace(SITE_DIR, "")}')
        continue

    # Extract title and description from existing metadata
    m = re.search(
        r"export const metadata: Metadata = \{[^}]*title: '([^']*)'[^}]*description:[^']*'([^']*)'",
        text, re.DOTALL
    )
    if not m:
        m = re.search(
            r'''export const metadata: Metadata = \{[^}]*title: "([^"]*)"[^}]*description:[^"]*"([^"]*)"''',
            text, re.DOTALL
        )
    if not m:
        print(f'  WARN no match: {path.replace(SITE_DIR, "")}')
        continue

    title, description = m.group(1), m.group(2)

    # Replace: import type { Metadata } → import type { Metadata } + import pageMetadata
    text = re.sub(
        r"import type \{ Metadata \} from 'next'",
        "import type { Metadata } from 'next'\nimport { pageMetadata } from '@/lib/metadata'",
        text, count=1
    )

    # Replace the whole metadata block
    old_block = re.search(
        r"export const metadata: Metadata = \{.*?\n\}",
        text, re.DOTALL
    )
    if old_block:
        text = text[:old_block.start()] + \
               f"export const metadata: Metadata = pageMetadata(\n  '{title}',\n  '{description}',\n)" + \
               text[old_block.end():]

    open(path, 'w').write(text)
    print(f'  OK  {path.replace(SITE_DIR, "")} → "{title}"')
    updated += 1

print(f'\nUpdated {updated} pages.')
