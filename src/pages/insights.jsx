import SiteLayout from '../components/SiteLayout';
import { ServiceBanner } from '../components/ServiceBody';
import InsightsList from '../components/InsightsList';
import { basePage } from '../lib/basePage';
import { INSIGHTS_ID, RESOURCES_ID } from '../lib/menuIds';

const TITLE = 'Insights: IT Infrastructure, Security and Managed Services Guides | PACE';
const DESC = 'Practical guides from PACE Business Machines on IT infrastructure, cybersecurity, cloud, NOC and SOC, managed services and more.';

export const page = {
  ...basePage,
  path: '/insights/',
  canonical: '/insights/',
  title: TITLE,
  meta: [{ name: 'description', content: DESC }, ...basePage.meta.filter((m) => m.name !== 'description')],
};

export default function Insights() {
  return (
    <SiteLayout
      active={{ [INSIGHTS_ID]: 'current-menu-item page_item current_page_item', [RESOURCES_ID]: 'current-menu-ancestor current-menu-parent' }}
      aria={{ [INSIGHTS_ID]: 'page' }}
    >
      <ServiceBanner
        bg="/assets/images/approach-banner.webp"
        name="Insights"
        sub="Practical guides on IT infrastructure, security, cloud and managed services."
        slug="insights"
      />
      <InsightsList />
    </SiteLayout>
  );
}
