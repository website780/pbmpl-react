import Header from './Header';
import Footer from './Footer';
import FooterTemplate from './FooterTemplate';

// Header + page content + site footer, for the data-driven pages (Insights and articles).
export default function SiteLayout({ active = {}, aria = {}, children }) {
  return (
    <>
      <div id="page" className="site">
        <a className="skip-link screen-reader-text" href="#primary">Skip to content</a>
        <Header active={active} aria={aria} />
        <div id="content" className="site-content">{children}</div>
      </div>
      <FooterTemplate />
      <Footer />
    </>
  );
}
