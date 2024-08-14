'use client';

import { useState } from 'react';

import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  alt: string;
}

const ImageContainer = ({ className, src, alt = '', children, ...props }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div {...props} className={cn('relative overflow-hidden', className)}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="h-full object-cover object-center"
        loading="lazy"
        onError={() => setImgSrc('/no_picture.png')}
      />
      {children}
    </div>
  );
};

export default ImageContainer;
