import { insights } from '../data/insights';
import { contact } from '../data/managedServices';
import InsightCard, { fmtDate } from './InsightCard';

// One article: cover image, meta line, the article body, related articles and a contact band.
export default function InsightArticle({ post, html }) {
  const idx = insights.findIndex((p) => p.slug === post.slug);
  const related = [];
  for (let i = 1; related.length < 3 && i < insights.length; i++) related.push(insights[(idx + i) % insights.length]);
  return (
    <div className="ins">
      <section className="ins-sec">
        <div className="ins-wrap ins-article">
          <p className="ins-meta ins-meta--lg">
            {fmtDate(post.date)} <span aria-hidden="true">·</span> {post.readMin} min read
          </p>
          <img className="ins-cover" src={post.image} alt={post.title} />
          <div className="ins-content" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="ins-back">
            <a className="ins-card__link" href="/insights/">
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> All insights
            </a>
          </div>
        </div>
      </section>

      <section className="ins-sec ins-sec--alt">
        <div className="ins-wrap">
          <div className="ins-head">
            <h6 className="ins-kicker">Keep reading</h6>
            <h2 className="ins-h2">More from PACE</h2>
          </div>
          <div className="ins-grid">
            {related.map((p) => (
              <InsightCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="ins-sec ins-cta">
        <div className="ins-wrap ins-center">
          <h2 className="ins-h2">Talk to a solution expert</h2>
          <p className="ins-cta__text">
            Call <a href={contact.phones[0].href}>{contact.phones[0].label}</a> or{' '}
            <a href={contact.phones[1].href}>{contact.phones[1].label}</a>, or visit{' '}
            <a href={contact.site.href} target="_blank" rel="noreferrer">{contact.site.label}</a>.
          </p>
          <a className="ins-btn" href="/contact/">
            Request a consultation <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
