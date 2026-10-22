// Company social profiles (footer bottom bar and contact page).
export const SOCIAL = [
  {
    name: 'X',
    href: 'https://x.com/pacebusinessoff',
    viewBox: '0 0 512 512',
    path: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61581008355241&sk=reels_tab',
    viewBox: '0 0 320 512',
    path: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
  },
];

export default function SocialLinks({ label = '' }) {
  return (
    <div className="social-links">
      {label ? <span className="social-links__label">{label}</span> : null}
      {SOCIAL.map((s) => (
        <a key={s.name} className="social-links__btn" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={'PACE on ' + s.name}>
          <svg aria-hidden="true" viewBox={s.viewBox} xmlns="http://www.w3.org/2000/svg"><path d={s.path} /></svg>
        </a>
      ))}
    </div>
  );
}
