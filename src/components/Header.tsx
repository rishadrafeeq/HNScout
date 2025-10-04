import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-[#f8f8f8] border-b border-[#dcdcdc] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#ff6600] leading-tight">HN Scout</h1>
              <p className="text-sm text-[#666666] -mt-1">Discover quality Hacker News posts with smart ranking</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
