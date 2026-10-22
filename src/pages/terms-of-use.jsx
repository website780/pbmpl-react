import SiteLayout from '../components/SiteLayout';
import { ServiceBanner } from '../components/ServiceBody';
import LegalBody from '../components/LegalBody';
import html from '../data/legal/terms-of-use.js';
import { basePage } from '../lib/basePage';

const TITLE = 'Terms of Use | PACE Business Machines';

export const page = {
  ...basePage,
  path: '/terms-of-use/',
  canonical: '/terms-of-use/',
  title: TITLE,
  meta: [{ name: 'description', content: 'Terms of use for the Pace Business Machines Pvt. Ltd. website.' }, ...basePage.meta.filter((m) => m.name !== 'description')],
};

export default function Legal() {
  return (
    <SiteLayout>
      <ServiceBanner tint bg="/assets/images/terms-of-use-banner.webp" name="Terms of Use" slug="terms-of-use" />
      <LegalBody html={html} />
    </SiteLayout>
  );
}
