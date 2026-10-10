import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, Menu, X, MapPin,
  Phone, Clock3, Sparkles, MoveUpRight, CheckCircle2, AlertCircle
} from 'lucide-react';

const PHONE = '+856 20 54 166 166';
const TEL = 'tel:+8562054166166';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=XJ6C%2B9X%20Vientiane%2C%20Laos';

const artwork = [
  { title: 'Quiet intensity', category: 'Black & Grey', image: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=1000&q=85', className: 'art-tall' },
  { title: 'Fine detail', category: 'Fine Line', image: 'https://images.unsplash.com/photo-1590246814883-57c511e8d6f2?auto=format&fit=crop&w=900&q=85', className: 'art-short' },
  { title: 'The human canvas', category: 'Realism', image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1000&q=85', className: 'art-medium' },
  { title: 'Form & flow', category: 'Ornamental', image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=900&q=85', className: 'art-short' },
  { title: 'A living story', category: 'Custom Designs', image: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1000&q=85', className: 'art-tall' },
  { title: 'Bold tradition', category: 'Japanese-inspired', image: 'https://images.unsplash.com/photo-1612459284970-e8a862c4a4f2?auto=format&fit=crop&w=900&q=85', className: 'art-medium' }
];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }
};

function Eyebrow({ children, number }) {
  return <div className="eyebrow">{number && <span className="eyebrow-number">{number}</span>}<span>{children}</span></div>;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['Home', '#home'], ['Tattoo Art', '#artwork'], ['Our Craft', '#philosophy'], ['Studio', '#studio'], ['Contact', '#contact']];
  const close = () => setMenuOpen(false);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="wordmark" href="#home" onClick={close} aria-label="Ken Tattoo home">
        <span className="wordmark-symbol">K<span>✳</span></span>
        <span className="wordmark-copy"><strong>KEN TATTOO</strong><small>VIENTIANE · LAOS</small></span>
      </a>
      <nav className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={close}>{label}</a>)}
        <a className="nav-book" href="#contact" onClick={close}>Book a consultation <ArrowRight size={14} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero" id="home">
      <div className="hero-image" role="img" aria-label="Artistic close-up of tattoo work">
        <img src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=2200&q=90" alt="" fetchPriority="high" />
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="hero-kicker">
          <span className="kicker-line" /> Contemporary Tattoo Studio <span className="kicker-dot">·</span> Vientiane, Laos
        </motion.div>
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }}>
          Art that<br />lives <em>on</em><br />your skin<span className="gold-period">.</span>
        </motion.h1>
        <motion.p className="hero-intro" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .38 }}>
          Thoughtfully crafted tattoos. Distinctive artistry. Personal expression that stays with you.
        </motion.p>
        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .5 }}>
          <a className="button button-gold" href="#contact">Book your consultation <ArrowRight size={16} /></a>
          <a className="text-link" href="#artwork">Explore the art <ArrowDownRight size={17} /></a>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <div className="hero-location"><MapPin size={14} /><span>Dongpalane Road <i>·</i> Vientiane</span></div>
        <a href="#artwork" className="scroll-cue"><span>Scroll to discover</span><ArrowDown size={15} /></a>
        <span className="hero-index">01 <i>/</i> 05</span>
      </div>
      <div className="hero-vertical">PERSONAL ART. PERMANENT MEANING.</div>
    </section>
  );
}

function SectionIntro({ label, title, children, side }) {
  return <div className={`section-intro ${side ? 'intro-side' : ''}`}><div><Eyebrow>{label}</Eyebrow><h2>{title}</h2></div>{children && <p>{children}</p>}</div>;
}

function TattooGallery() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (active === null) return;
    const onKey = e => { if (e.key === 'Escape') setActive(null); if (e.key === 'ArrowRight') setActive(v => (v + 1) % artwork.length); if (e.key === 'ArrowLeft') setActive(v => (v - 1 + artwork.length) % artwork.length); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active]);
  return (
    <section className="gallery-section section-pad" id="artwork">
      <div className="section-shell">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <SectionIntro label="The artwork" title={<>Every line tells<br /><em>a story.</em></>}>
            Explore the details, contrasts, and creativity behind tattoo artistry. A visual study in form, feeling, and personal expression.
          </SectionIntro>
        </motion.div>
        <div className="gallery-note"><span>VISUAL INSPIRATION</span><span>01 — 06 <i> / </i> SELECTED MOODS</span></div>
        <div className="art-grid">
          {artwork.map((item, i) => (
            <motion.button className={`art-card ${item.className}`} key={item.title} onClick={() => setActive(i)} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} transition={{ delay: i * .06 }} aria-label={`View ${item.category} inspiration image`}>
              <img src={item.image} alt={`${item.category} tattoo inspiration`} loading="lazy" />
              <span className="art-shade" />
              <span className="art-number">0{i + 1}</span>
              <span className="art-meta"><span><small>{item.category}</small><strong>{item.title}</strong></span><span className="art-arrow"><MoveUpRight size={18} /></span></span>
            </motion.button>
          ))}
        </div>
        <p className="gallery-disclaimer">A visual moodboard of tattoo styles. Please contact the studio to discuss your idea and available options.</p>
      </div>
      <AnimatePresence>
        {active !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label="Tattoo inspiration gallery">
          <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery"><X /></button>
          <button className="lightbox-prev" onClick={e => { e.stopPropagation(); setActive((active - 1 + artwork.length) % artwork.length); }} aria-label="Previous image">←</button>
          <motion.div key={active} className="lightbox-frame" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}>
            <img src={artwork[active].image} alt={`${artwork[active].category} tattoo inspiration`} />
            <div><small>{artwork[active].category}</small><h3>{artwork[active].title}</h3></div>
          </motion.div>
          <button className="lightbox-next" onClick={e => { e.stopPropagation(); setActive((active + 1) % artwork.length); }} aria-label="Next image">→</button>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

function Philosophy() {
  const principles = [
    ['01', 'Personal expression', 'A thoughtful conversation begins with what matters to you.'],
    ['02', 'Attention to detail', 'Every element deserves care, from the first idea to the final line.'],
    ['03', 'Artistry with intention', 'A considered approach to creating something personal and lasting.']
  ];
  return (
    <section className="philosophy-section section-pad" id="philosophy">
      <div className="section-shell philosophy-layout">
        <motion.div className="philosophy-image-wrap" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <div className="philosophy-image"><img src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=85" alt="Close-up details of tattoo art" loading="lazy" /></div>
          <div className="image-caption"><span>THE ART OF INDIVIDUALITY</span><span>VTE · LAOS</span></div>
          <div className="image-stamp"><span>KEN</span><span>TATTOO</span><i>✳</i></div>
        </motion.div>
        <motion.div className="philosophy-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <Eyebrow number="02">The philosophy</Eyebrow>
          <h2>Not just ink.<br /><em>A piece of you.</em></h2>
          <p className="philosophy-lead">Every tattoo begins with an idea. Our goal is to help transform personal inspiration into a piece of art that feels meaningful, considered, and uniquely yours.</p>
          <div className="principles">{principles.map(([num, title, body]) => <div className="principle" key={num}><span className="principle-num">{num}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowDownRight size={17} /></div>)}</div>
          <a className="text-link philosophy-link" href="#contact">Start a conversation <ArrowRight size={16} /></a>
        </motion.div>
      </div>
    </section>
  );
}

function Consultation() {
  const [form, setForm] = useState({ name: '', contact: '', idea: '', date: '' });
  const [feedback, setFeedback] = useState(null);
  const update = e => { setForm({ ...form, [e.target.name]: e.target.value }); setFeedback(null); };
  const submit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.idea.trim()) {
      setFeedback({ type: 'error', text: 'Please complete your name, contact details, and tattoo idea.' }); return;
    }
    const body = `Hello Ken Tattoo,\\n\\nI'd like to request a consultation.\\nName: ${form.name}\\nContact: ${form.contact}\\nTattoo idea: ${form.idea}\\nPreferred date: ${form.date || 'Flexible'}\\n\\nPlease let me know the next steps.`;
    setFeedback({ type: 'success', text: 'Your request is prepared. Choose Call Studio to contact Ken Tattoo directly, or open your email app to send these details.' });
    const mail = `mailto:?subject=${encodeURIComponent('Tattoo consultation request — ' + form.name)}&body=${encodeURIComponent(body)}`;
    setForm(f => ({ ...f, mailto: mail }));
  };
  return (
    <section className="consult-section section-pad" id="contact">
      <div className="consult-texture" />
      <div className="section-shell consult-layout">
        <motion.div className="consult-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <Eyebrow number="03">Begin your story</Eyebrow>
          <h2>Your next piece<br />starts <em>here.</em></h2>
          <p>Have an idea in mind? Get in touch with Ken Tattoo to discuss your inspiration and arrange a consultation.</p>
          <a className="button button-gold" href={TEL}><Phone size={16} /> Call {PHONE}</a>
          <a className="direction-link" href={MAPS} target="_blank" rel="noreferrer">Get directions <MoveUpRight size={15} /></a>
          <div className="consult-footnote"><Sparkles size={14} /><span>Every great piece starts with a conversation.</span></div>
        </motion.div>
        <motion.div className="consult-form-wrap" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <div className="form-heading"><span>LET'S TALK INK</span><span className="form-mark">✳</span></div>
          <h3>Request a consultation</h3>
          <p className="form-subtitle">Tell us a little about the piece you have in mind.</p>
          <form onSubmit={submit} noValidate>
            <label>Your name <span>*</span><input name="name" value={form.name} onChange={update} placeholder="How should we call you?" autoComplete="name" /></label>
            <label>Phone or preferred contact <span>*</span><input name="contact" value={form.contact} onChange={update} placeholder="Phone, email, or messaging app" autoComplete="tel" /></label>
            <label>Your tattoo idea <span>*</span><textarea name="idea" value={form.idea} onChange={update} placeholder="Style inspiration, placement, size, meaning..." rows="3" /></label>
            <label>Preferred appointment date <span className="optional">(optional)</span><input type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().slice(0, 10)} /></label>
            <button className="button button-gold form-submit" type="submit">Prepare consultation request <ArrowRight size={16} /></button>
            {feedback && <div className={`form-feedback ${feedback.type}`} role="status">{feedback.type === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}<span>{feedback.text}{feedback.type === 'success' && form.mailto && <> <a href={form.mailto}>Open email draft</a></>}</span></div>}
          </form>
          <p className="form-privacy">Demo-ready form · No details are sent or stored by this website.</p>
        </motion.div>
      </div>
    </section>
  );
}

function StudioLocation() {
  return (
    <section className="studio-section section-pad" id="studio">
      <div className="section-shell">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <SectionIntro label="Find the studio" title={<>A place for<br /><em>your next chapter.</em></>}>
            Find Ken Tattoo on Dongpalane Road in Vientiane. Call ahead to discuss your idea and arrange your visit.
          </SectionIntro>
        </motion.div>
        <div className="studio-card">
          <div className="studio-photo"><img src="https://images.unsplash.com/photo-1590246814883-57c511e8d6f2?auto=format&fit=crop&w=1200&q=85" alt="Tattoo art detail" loading="lazy" /><div className="studio-photo-overlay"><span>KEN TATTOO</span><span>VIENTIANE, LAOS</span></div></div>
          <div className="studio-details">
            <div className="studio-detail"><span className="detail-icon"><MapPin size={18} /></span><div><small>VISIT US</small><strong>Dongpalane Road</strong><p>Vientiane, Laos<br />XJ6C+9X, Vientiane</p><a href={MAPS} target="_blank" rel="noreferrer" className="detail-link">Open in Google Maps <ArrowRight size={13} /></a></div></div>
            <div className="studio-detail"><span className="detail-icon"><Phone size={18} /></span><div><small>GET IN TOUCH</small><strong>{PHONE}</strong><p>Call to discuss your tattoo idea<br />and consultation availability.</p><a href={TEL} className="detail-link">Call the studio <ArrowRight size={13} /></a></div></div>
            <div className="studio-detail"><span className="detail-icon"><Clock3 size={18} /></span><div><small>STUDIO HOURS</small><strong>Closes at 8:00 PM</strong><p>For the latest availability,<br />please contact the studio directly.</p></div></div>
            <a className="button button-outline studio-directions" href={MAPS} target="_blank" rel="noreferrer">Plan your visit <MoveUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return <section className="final-cta">
    <img src="https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=2000&q=85" alt="" loading="lazy" />
    <div className="final-cta-overlay" />
    <motion.div className="final-cta-content" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }}>
      <Eyebrow>Make it personal</Eyebrow>
      <h2>Make your idea<br /><em>permanent.</em></h2>
      <p>Start a conversation about your next tattoo.</p>
      <a className="button button-gold" href={TEL}>Contact Ken Tattoo <ArrowRight size={16} /></a>
    </motion.div>
    <span className="final-vertical">YOUR STORY. YOUR SKIN.</span>
  </section>;
}

function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => { const f = () => setShowTop(window.scrollY > 500); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  return <footer className="site-footer">
    <div className="footer-main section-shell">
      <div className="footer-brand"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-symbol">K<span>✳</span></span><span className="wordmark-copy"><strong>KEN TATTOO</strong><small>VIENTIANE · LAOS</small></span></a><p>Tattoo art<br />Vientiane, Laos</p></div>
      <div className="footer-nav"><small>EXPLORE</small><a href="#home">Home</a><a href="#artwork">Tattoo Art</a><a href="#philosophy">Our Craft</a><a href="#studio">Studio</a><a href="#contact">Contact</a></div>
      <div className="footer-contact"><small>GET IN TOUCH</small><p>Dongpalane Road,<br />Vientiane, Laos</p><a href={TEL}>{PHONE}</a><a href={MAPS} target="_blank" rel="noreferrer">Get directions <MoveUpRight size={13} /></a></div>
      <div className="footer-note"><span className="footer-ornament">✳</span><p>Art that lives<br />on your skin.</p><a href="#contact" className="footer-book">Begin your story <ArrowRight size={14} /></a></div>
    </div>
    <div className="footer-bottom section-shell"><span>© 2026 Ken Tattoo. All rights reserved.</span><span className="developer-credit">Designed & developed with care by <a href="https://www.tcpitsolution.in/" target="_blank" rel="noreferrer">TCP IT Solution</a></span><span className="footer-location">VIENTIANE, LAOS</span></div>
    <AnimatePresence>{showTop && <motion.button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><ArrowUp size={16} /></motion.button>}</AnimatePresence>
  </footer>;
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);
  return <><Navbar /><main><Hero /><TattooGallery /><Philosophy /><Consultation /><StudioLocation /><FinalCTA /></main><Footer /></>;
}