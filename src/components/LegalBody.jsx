// Plain text page (terms, privacy): the article body styles from blog.css.
export default function LegalBody({ html }) {
  return (
    <div className="ins">
      <section className="ins-sec">
        <div className="ins-wrap ins-article">
          <div className="ins-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </div>
  );
}
