export const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function InsightCard({ post, featured = false }) {
  const href = '/insights/' + post.slug + '/';
  return (
    <article className={'ins-card' + (featured ? ' ins-card--featured' : '')}>
      <a className="ins-card__img" href={href} tabIndex={-1} aria-hidden="true">
        <img src={post.image} alt="" loading={featured ? 'eager' : 'lazy'} />
      </a>
      <div className="ins-card__body">
        <p className="ins-meta">
          {fmtDate(post.date)} <span aria-hidden="true">·</span> {post.readMin} min read
        </p>
        <h3 className="ins-card__title">
          <a href={href}>{post.title}</a>
        </h3>
        <p className="ins-card__text">{post.excerpt}</p>
        <a className="ins-card__link" href={href}>
          Read article <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
