// Brochures and flyers. Files stay on Google Drive; "Download PDF" opens them there.
const drive = (id) => 'https://drive.google.com/file/d/' + id + '/view';

export const brochures = [
  { title: 'Annual Maintenance Contracts (AMC)', href: drive('1eitD631oz1QI9pyadlAXyoaUJDAwm9dX') },
  { title: 'Audit Services', href: drive('1ShQUN7oLWR7S0xMRGKW5Xu2xWAJP_gd3') },
  { title: 'EdTech Solutions', href: drive('1ficT701WVmk20O18egl2SZnjNfyuIxIU') },
  { title: 'Facility Management Services', href: drive('1dkGpBPnqUS600NseKo3QbGCn3XLtxJVZ') },
  { title: 'Managed Services', href: drive('1myrm0bKUk1ODWtNXpSHlNWhesdMN1ReX') },
  { title: 'Training Services', href: drive('1QcWnV0IRDTyoCw5d-v3KvcOrHj5HBR12') },
];

export const flyers = [
  { title: 'AI and Robotics Lab', href: drive('155wJraHB1Qz_8LpfbuGRXKYaREXj3IHl') },
  { title: 'Interactive Panel', href: drive('1EpI2ottRQH17l6rN1AjMCke2GQGXEsBe') },
  { title: 'Our Network Solutions', href: drive('1_i5bT14rZWKFgWQvyrKKYSUYJ_0yCclg') },
  { title: 'Security Solution', href: drive('19Fa83am_iN-FRD8T9HXUslioT1XFS0bk') },
];

export const brochuresPage = {
  slug: 'brochures',
  name: 'Brochures & Flyers',
  seoTitle: 'Brochures and Flyers | PACE Business Machines',
  sub: 'Download our service brochures and solution flyers.',
};
