import Image from 'next/image'

export interface ImagePlaceholderProps {
  src: string
  altText: string
  priority?: boolean
}

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

// 164 bytes base64
const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export function ImagePlaceholder({ src, altText, priority }: ImagePlaceholderProps) {
  return (
    <div className="relative overflow-hidden rounded-[inherit] pt-[100%]">
      <Image
        fill
        src={src}
        alt={altText}
        quality={100}
        priority={priority}
        placeholder="blur"
        blurDataURL={rgbDataURL(246, 246, 246)}
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  )
}
