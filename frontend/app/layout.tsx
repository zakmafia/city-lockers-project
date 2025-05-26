import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'City Lockers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">City Lockers</h1>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/book">Book</Link>
            <Link href="/my-bookings">My Bookings</Link>
            <Link href="/create-unit">Create Unit</Link>
          </div>
        </nav>

        {/* Main content area (flex-grow to push footer) */}
        <main className="flex-grow max-w-4xl mx-auto mt-6 w-full px-4">
          {children}
        </main>

        {/* Sticky footer */}
        <footer className="border-t text-center text-sm text-gray-500 py-6">
          Developed by <span className="font-semibold text-black">Zekarias Mesfin Biru</span>
        </footer>
      </body>
    </html>
  );
}
