import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="relative h-15 w-15">
        <Image
          src="/medisync-logo.png"
          alt="MediSync"
          fill
          className="object-contain object-left"
          priority
          sizes="100"
        />
      </div>
    </Link>
  );
}
