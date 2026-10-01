import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Logo() {
  const { name, logo } = siteConfig.business;
  return (
    <a className="brand" href="#inicio" aria-label={name}>
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="brand-image"
        />
      ) : (
        <>
          {name}
          <span>®</span>
        </>
      )}
    </a>
  );
}
