import logoSrc from '../../public/logoIEEECSUNI.png'

export function IEEECSLogo({ size = 40 }) {
  return (
    <img
      src={logoSrc}
      width={size}
      height={size}
      alt='IEEE COmputer Society UNI chapter'
      style={{ objectFit: 'contain'}} 
    />
  )
}