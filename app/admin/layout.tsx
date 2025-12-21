import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asakia Admin - Gallery Management',
  description: 'Admin panel for managing Asakia Hanan gallery',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-ivory text-earth-500">
      {children}
    </main>
  )
}
