import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo(180 x 40 px).png"
        alt="AIEO Logo"
        width={180}
        height={40}
        priority
        className="object-contain"
      />
    </div>
  );
} 