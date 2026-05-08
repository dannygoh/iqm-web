import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'

export const metadata: Metadata = {
  title: 'Board of Management',
  description: 'The current Board of Management of the Institute of Quality Malaysia.',
}

type BoardMember = { name: string; credentials?: string }

const BOARD = {
  President: [{ name: 'Dr. Wong Wei Khiang', credentials: 'Ph.D, M.Tech, BSc, FIQM' }],
  'Vice President': [{ name: 'Mr. Lee Chee Keong, Barry', credentials: 'BSc, MIQM' }],
  'Hon. Secretary': [{ name: 'En. Kamarul Arifin Abd Karim', credentials: 'BSc (Hons), MIQM' }],
  'Asst. Hon. Secretary': [{ name: 'Mr. Wong Wee Kean', credentials: 'BSc (Hons), MIQM' }],
  'Hon. Treasurer': [{ name: 'Mr. Boh Tuan Sim, Johnson', credentials: 'BSc (Hons), MIQM' }],
  'Ordinary Board Members': [
    { name: 'Paramadevan S/O Navaratnam', credentials: 'M.Eng, MIQM' },
    { name: 'En. Ahmad Marwan bin Mohamad', credentials: 'BSc (Hons), MIQM' },
    { name: 'Mr. Cheong Weng Wai' },
    { name: 'Mr. Tee Thian Soon', credentials: 'M.Eng, MIQM' },
    { name: 'Mr. Kueh Boon Kwong' },
    { name: 'Mr. Ng Chee Hooi' },
    { name: 'Mr. Lee Choon Foh, Andy' },
    { name: 'Mr. Nga Song Hoe' },
  ],
  'Honorary Auditors': [
    { name: 'Mr. Woon Yong Hao' },
    { name: 'Ms. Chew Lina' },
  ],
}

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="bg-white border border-border rounded-lg px-5 py-4">
      <p className="font-semibold text-primary text-sm">{member.name}</p>
      {member.credentials && (
        <p className="text-muted text-xs mt-0.5">{member.credentials}</p>
      )}
    </div>
  )
}

export default function BoardPage() {
  return (
    <>
      <PageHero
        title="Board of Management"
        subtitle="Term 2025–2027"
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Board of Management' }]}
      />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {Object.entries(BOARD).map(([role, members]) => (
          <section key={role}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 border-b border-border pb-2">
              {role}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {members.map((m) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
