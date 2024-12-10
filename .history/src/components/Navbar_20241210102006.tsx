import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image
          src="/logo-180x40.png"
          alt="AIEO Logo"
          width={180}
          height={40}
          priority
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
} 