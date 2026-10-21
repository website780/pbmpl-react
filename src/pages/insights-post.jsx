import SiteLayout from '../components/SiteLayout';
import { ServiceBanner } from '../components/ServiceBody';
import InsightArticle from '../components/InsightArticle';
import { insights } from '../data/insights';
import { basePage } from '../lib/basePage';
import { INSIGHTS_ID, RESOURCES_ID } from '../lib/menuIds';

// Each article body is its own small module, loaded only on that article's page.
const bodies = import.meta.glob('../data/posts/*.js');

// Builds the module (page config + component) PageShell expects for one article.
export async function postModule(slug) {
  const post = insights.find((p) => p.slug === slug);
  const html = (await bodies['../data/posts/' + slug + '.js']()).default;
  const page = {
    ...basePage,
    path: '/insights/' + slug + '/',
    canonical: '/insights/' + slug + '/',
    title: post.title + ' | PACE Business Machines',
    meta: [{ name: 'description', content: post.description }, ...basePage.meta.filter((m) => m.name !== 'description')],
  };
  function Article() {
    return (
      <SiteLayout
        active={{ [INSIGHTS_ID]: 'current-menu-item page_item current_page_item', [RESOURCES_ID]: 'current-menu-ancestor current-menu-parent' }}
        aria={{ [INSIGHTS_ID]: 'page' }}
      >
        <ServiceBanner
          bg="/assets/images/approach-banner.webp"
          name={post.title}
          sub=""
          long
          crumbs={[{ label: 'Insights', href: '/insights/' }, { label: post.title, href: '/insights/' + slug + '/' }]}
        />
        <InsightArticle post={post} html={html} />
      </SiteLayout>
    );
  }
  return { page, default: Article };
}
