import SiteLayout from '../components/SiteLayout';
import { ServiceBanner } from '../components/ServiceBody';
import LegalBody from '../components/LegalBody';
import html from '../data/legal/privacy-statement.js';
import { basePage } from '../lib/basePage';

const TITLE = 'Privacy Statement | PACE Business Machines';

export const page = {
  ...basePage,
  path: '/privacy-statement/',
  canonical: '/privacy-statement/',
  title: TITLE,
  meta: [{ name: 'description', content: 'How Pace Business Machines Pvt. Ltd. collects, uses and protects your information.' }, ...basePage.meta.filter((m) => m.name !== 'description')],
};

export default function Legal() {
  return (
    <SiteLayout>
      <ServiceBanner tint bg="/assets/images/privacy-statement-banner.webp" name="Privacy Statement" slug="privacy-statement" />
      <LegalBody html={html} />
    </SiteLayout>
  );
}
