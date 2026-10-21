import { insights } from '../data/insights';
import InsightCard from './InsightCard';

// /insights/ : the latest article featured, the rest in a grid.
export default function InsightsList() {
  const [first, ...rest] = insights;
  return (
    <div className="ins">
      <section className="ins-sec">
        <div className="ins-wrap">
          <div className="ins-head">
            <h6 className="ins-kicker">Insights</h6>
            <h2 className="ins-h2">Practical guides on IT infrastructure, security and managed services</h2>
          </div>
          <InsightCard post={first} featured />
          <div className="ins-grid">
            {rest.map((p) => (
              <InsightCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
