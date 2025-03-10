import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../assets/brand/logo_BW.svg'
export const Logo = () => {
  return (
    <Link href="/" className="relative w-32 h-8">
      <Image
        src={logo}
        alt="Thé Tip Top"
        fill
        className="object-contain"
        priority
      />
    </Link>
  )
} 