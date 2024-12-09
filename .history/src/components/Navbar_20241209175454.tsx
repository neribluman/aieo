import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="flex items-center">
      <Image
        src="/Favicon(40x40).png"
        alt="xFunnel Logo"
        width={32}
        height={32}
        className="mr-2"
      />
      <span className="text-xl font-semibold">xFunnel</span>
    </div>
  );
} 