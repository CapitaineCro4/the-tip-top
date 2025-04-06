'use client';

import Image from 'next/image';
import logo from '../../assets/brand/logo_BW.svg';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-8 border-[#16803C] border-t-transparent rounded-full animate-spin"></div>
        <Image
          src={logo}
          alt="Logo"
          width={72}
          height={72}
          className="animate-pulse"
        />
      </div>
    </div>
  );
};
