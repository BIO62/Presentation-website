export const metadata = {
  title: 'Хүсэлтийн самбар',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-neutral-50 font-sans text-neutral-950">
      {children}
    </div>
  )
}
