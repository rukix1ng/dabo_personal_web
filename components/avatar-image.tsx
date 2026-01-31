"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  priority?: boolean;
}

export function AvatarImage({
  src,
  alt,
  fallbackSrc = "/avatar.svg",
  className,
  priority = false,
}: AvatarImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 640px) 192px, 224px"
      className={className}
      priority={priority}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
