import { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#E8D9C4",
  brown: "#3E1F0E",
  tan: "#B07D52",
  offwhite: "#F4F2EF",
  black: "#111111",
  mid: "#7A5230",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Syne:wght@400;500;700;800&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Syne', sans-serif; background: #F4F2EF; color: #111; overflow-x: hidden; }
  ::selection { background: #B07D52; color: #F4F2EF; }
`;

/* ── useInView hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.4rem 5rem",
      background: scrolled ? "rgba(244,242,239,0.97)" : "rgba(244,242,239,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled ? `1px solid rgba(62,31,14,0.12)` : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.9rem", fontWeight: 900, letterSpacing: "2px", color: COLORS.black,
      }}>Chingum</div>

      {/* Desktop links */}
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }}>
        {["About", "Science", "Ingredients", "Contact"].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase",
              textDecoration: "none", color: COLORS.black, fontWeight: 700,
              transition: "color 0.3s",
            }}
              onMouseEnter={e => e.target.style.color = COLORS.tan}
              onMouseLeave={e => e.target.style.color = COLORS.black}
            >{l}</a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{
            fontSize: "0.72rem", letterSpacing: "2.5px", textTransform: "uppercase",
            textDecoration: "none", color: COLORS.offwhite, fontWeight: 700,
            background: COLORS.brown, padding: "0.75rem 2rem",
            transition: "background 0.3s",
          }}
            onMouseEnter={e => e.target.style.background = COLORS.tan}
            onMouseLeave={e => e.target.style.background = COLORS.brown}
          >Get Early Access</a>
        </li>
      </ul>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const fade = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
  });

  return (
    <section style={{
      minHeight: "100vh", display: "grid", gridTemplateColumns: "55% 45%", paddingTop: 80,
    }}>
      {/* Left */}
      <div style={{
        background: COLORS.cream, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "7rem 5rem",
      }}>
        <p style={{ ...fade(100), fontSize: "0.7rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700, marginBottom: "2rem" }}>
          Plastic-Free · Remineralising · Natural
        </p>
        <h1 style={{
          ...fade(200),
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(4.5rem,7.5vw,9rem)", fontWeight: 900,
          lineHeight: 0.92, color: COLORS.black, letterSpacing: "-3px", marginBottom: "1.5rem",
        }}>
          Chew<br /><span style={{ fontStyle: "italic", color: COLORS.tan }}>Better.</span><br />Live<br />Cleaner.
        </h1>
        <p style={{
          ...fade(300),
          fontSize: "0.85rem", letterSpacing: "4px", textTransform: "uppercase",
          color: COLORS.brown, fontWeight: 700, marginBottom: "2.5rem",
          borderLeft: `3px solid ${COLORS.tan}`, paddingLeft: "1rem",
        }}>
          Chew This, Not Plastic.
        </p>
        <p style={{ ...fade(400), fontSize: "1rem", lineHeight: 1.9, color: COLORS.mid, maxWidth: 420, marginBottom: "3rem", fontWeight: 400 }}>
          Revolutionary nano-hydroxyapatite technology meets ancient natural gum bases.
          Chingum remineralises your enamel while you chew — without a single gram of plastic.
        </p>
        <div style={{ ...fade(500), display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <HoverLink href="#contact" fill>Get Early Access</HoverLink>
          <HoverLink href="#science" arrow>Discover the Science</HoverLink>
        </div>
      </div>

      {/* Right */}
      <div style={{
        background: COLORS.offwhite, display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", fontFamily: "'Playfair Display', serif",
          fontSize: "22vw", fontWeight: 900, color: "rgba(176,125,82,0.05)",
          letterSpacing: "-8px", userSelect: "none", pointerEvents: "none",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap",
        }}>GUM</div>
        <img
          src="https://i.imgur.com/placeholder.png"
          alt="Chingum packaging"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
          style={{ width: "72%", maxWidth: 400, animation: "drift 5s ease-in-out infinite", filter: "drop-shadow(0 40px 70px rgba(62,31,14,0.18))", position: "relative", zIndex: 1 }}
        />
        {/* Fallback placeholder */}
        <div style={{
          display: "none", width: 300, height: 300, background: COLORS.cream,
          borderRadius: 8, alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 12, animation: "drift 5s ease-in-out infinite",
          position: "relative", zIndex: 1, filter: "drop-shadow(0 40px 70px rgba(62,31,14,0.18))",
        }}>
          <div style={{ fontSize: "4rem" }}>🍬</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: COLORS.brown, letterSpacing: 4 }}>CHINGUM</div>
          <div style={{ fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", color: COLORS.tan, fontWeight: 700 }}>Plastic Free Chewing Gum</div>
        </div>
        <style>{`@keyframes drift { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-20px) rotate(2deg)} }`}</style>
      </div>
    </section>
  );
}

function HoverLink({ href, children, fill, arrow }) {
  const [hov, setHov] = useState(false);
  if (fill) return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? COLORS.tan : COLORS.brown, color: COLORS.offwhite,
        padding: "1.1rem 3rem", fontSize: "0.75rem", letterSpacing: "3px",
        textTransform: "uppercase", textDecoration: "none", fontWeight: 700,
        transition: "background 0.3s", display: "inline-block",
      }}>{children}</a>
  );
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "0.75rem", letterSpacing: "3px", textTransform: "uppercase",
        textDecoration: "none", color: hov ? COLORS.tan : COLORS.brown,
        fontWeight: 700, transition: "color 0.3s",
        display: "flex", alignItems: "center", gap: "0.5rem",
      }}>{children} {arrow && <span style={{ fontSize: "1.1rem", transition: "transform 0.3s", transform: hov ? "translateX(4px)" : "translateX(0)" }}>→</span>}
    </a>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = ["Plastic Free", "Nano Hydroxyapatite", "Enamel Remineralisation", "Chicle & Mastic", "Zero Synthetic Base", "Natural Oral Care", "Biodegradable"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", padding: "1.4rem 0", background: COLORS.brown }}>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.cream, fontWeight: 700, padding: "0 2rem" }}>{t}</span>
            <span style={{ color: COLORS.tan, fontSize: "0.8rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ padding: "8rem 5rem", background: COLORS.offwhite, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Reveal><p style={{ fontSize: "0.7rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700, marginBottom: "1.5rem" }}>Our Story</p></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,4.5vw,5.2rem)", fontWeight: 900, lineHeight: 1.0, color: COLORS.black, letterSpacing: "-1px", marginBottom: "2.5rem" }}>
            Gum as it was<br /><em style={{ fontStyle: "italic", color: COLORS.tan }}>always meant</em><br />to be.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div style={{ fontSize: "1rem", lineHeight: 1.9, color: COLORS.mid, fontWeight: 400, maxWidth: 460 }}>
            <p>Most gums are 70–80% synthetic polymer — the same material as glue. You've been chewing plastic for years without knowing it.</p>
            <p style={{ marginTop: "1.3rem" }}>Chingum went back to the roots — to chicle, the original gum base used for centuries — paired with cutting-edge science to make gum that's genuinely good for you.</p>
            <p style={{ marginTop: "1.3rem" }}>The result? The world's first remineralising, plastic-free chewing gum. One that <em>heals while you chew.</em></p>
          </div>
        </Reveal>
      </div>

      {/* Stats */}
      <div style={{ background: COLORS.brown, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {[["100%", "Natural Base"], ["0%", "Plastic"], ["nHA", "Technology"], ["∞", "Cleaner Chews"]].map(([num, label], i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{
              padding: "5rem 3rem",
              borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.07)` : "none",
              borderRight: i % 2 === 0 ? `1px solid rgba(255,255,255,0.07)` : "none",
              height: "100%",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "4.5rem", fontWeight: 900, color: COLORS.cream, lineHeight: 1, marginBottom: "0.5rem" }}>{num}</div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700 }}>{label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── SCIENCE ── */
const scienceCards = [
  { num: "01", icon: "🔬", title: "Nano Hydroxyapatite", desc: "Biomimetic particles identical to tooth enamel mineral. They fill microcracks, restore gloss, and reduce sensitivity — actively and continuously." },
  { num: "02", icon: "🌳", title: "Chicle Gum Base", desc: "Sourced from the sapodilla tree, chicle has been chewed for millennia. Fully biodegradable, sustainably harvested, completely plastic-free." },
  { num: "03", icon: "🌿", title: "Mastic Resin", desc: "Ancient Greek resin with proven antimicrobial properties. Naturally freshens breath and supports gum health alongside enamel repair." },
  { num: "04", icon: "🦷", title: "Enamel Remineralisation", desc: "Unlike fluoride, nHA carries zero toxicity risk. It actively bonds to enamel to reverse early demineralisation and protect against acids." },
  { num: "05", icon: "♻️", title: "Fully Biodegradable", desc: "Synthetic gum stays in landfill for centuries. Chingum breaks down naturally. Better for your teeth, better for the planet." },
  { num: "06", icon: "✨", title: "No Nasties", desc: "No aspartame, no artificial sweeteners, no synthetic polymers. Just clean, honest ingredients that work as nature intended." },
];

function Science() {
  return (
    <section id="science" style={{ background: COLORS.cream, padding: "8rem 5rem" }}>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem", paddingBottom: "3rem", borderBottom: `1px solid rgba(62,31,14,0.15)` }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700, marginBottom: "1.5rem" }}>The Science</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,4.5vw,5.2rem)", fontWeight: 900, lineHeight: 1.0, color: COLORS.black, letterSpacing: "-1px" }}>
              What makes<br /><em style={{ fontStyle: "italic", color: COLORS.tan }}>Chingum</em><br />different.
            </h2>
          </div>
          <p style={{ fontSize: "0.92rem", color: COLORS.mid, maxWidth: 220, lineHeight: 1.75, fontWeight: 400, textAlign: "right" }}>
            Every ingredient serves a purpose. Every chew makes a difference.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {scienceCards.map((card, i) => (
          <SciCard key={i} {...card} i={i} />
        ))}
      </div>
    </section>
  );
}

function SciCard({ num, icon, title, desc, i }) {
  const [hov, setHov] = useState(false);
  const col = i % 3;
  const row = Math.floor(i / 3);
  return (
    <Reveal delay={i * 60}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          padding: "3rem 2.5rem", height: "100%",
          borderRight: col < 2 ? `1px solid rgba(62,31,14,0.12)` : "none",
          borderBottom: row < 1 ? `1px solid rgba(62,31,14,0.12)` : "none",
          background: hov ? "rgba(255,255,255,0.6)" : "transparent",
          transition: "background 0.4s",
        }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", color: COLORS.tan, fontWeight: 700, marginBottom: "1.2rem", display: "block" }}>{num}</span>
        <span style={{ fontSize: "2rem", marginBottom: "1rem", display: "block" }}>{icon}</span>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 700, color: COLORS.black, marginBottom: "1rem", lineHeight: 1.15 }}>{title}</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: COLORS.mid, fontWeight: 400 }}>{desc}</p>
      </div>
    </Reveal>
  );
}

/* ── INGREDIENTS ── */
const ingredients = [
  ["Nano Hydroxyapatite", "Remineralises"],
  ["Chicle", "Natural Base"],
  ["Mastic Resin", "Antimicrobial"],
  ["Natural Flavours", "Clean & Fresh"],
  ["Xylitol", "Cavity Protection"],
];

function Ingredients() {
  return (
    <section id="ingredients" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
      <div style={{ background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem" }}>
        <Reveal>
          <div style={{
            width: 280, height: 280, background: COLORS.offwhite, borderRadius: 8,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12, filter: "drop-shadow(0 20px 50px rgba(62,31,14,0.2))",
          }}>
            <div style={{ fontSize: "4.5rem" }}>🍬</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: COLORS.brown, letterSpacing: 3 }}>CHINGUM</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: 3, textTransform: "uppercase", color: COLORS.tan, fontWeight: 700 }}>Plastic Free Chewing Gum</div>
          </div>
        </Reveal>
      </div>
      <div style={{ background: COLORS.offwhite, padding: "6rem 5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Reveal>
          <p style={{ fontSize: "0.7rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700, marginBottom: "1.5rem" }}>What's Inside</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,4vw,4.5rem)", fontWeight: 900, lineHeight: 1.0, color: COLORS.black, letterSpacing: "-1px", marginBottom: "2.5rem" }}>
            Every ingredient,<br /><em style={{ fontStyle: "italic", color: COLORS.tan }}>intentional.</em>
          </h2>
        </Reveal>
        <div>
          {ingredients.map(([name, tag], i) => (
            <IngRow key={i} name={name} tag={tag} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IngRow({ name, tag, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: "1.5rem",
          padding: `1.5rem ${hov ? "0.6rem" : "0"}`,
          borderBottom: `1px solid rgba(62,31,14,0.1)`,
          transition: "padding 0.3s", cursor: "default",
        }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.tan, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: COLORS.black, flex: 1 }}>{name}</span>
        <span style={{ fontSize: "0.65rem", color: COLORS.tan, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>{tag}</span>
      </div>
    </Reveal>
  );
}

/* ── TESTIMONIALS ── */
const testimonials = [
  { quote: "Finally a gum I feel good about. No guilt, no plastic — and my teeth actually feel smoother after a week.", name: "Priya M.", role: "Beta Tester" },
  { quote: "The science behind nHA is solid. As a dentist, I'm genuinely impressed by the remineralisation potential.", name: "Dr. Arjun S.", role: "Dentist" },
  { quote: "Chingum chews better, tastes cleaner, and knowing it's all-natural makes a huge difference. Never going back.", name: "Rohan K.", role: "Early Supporter" },
];

function Testimonials() {
  return (
    <section style={{ background: COLORS.offwhite, padding: "8rem 5rem", textAlign: "center" }}>
      <Reveal>
        <p style={{ fontSize: "0.7rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700, marginBottom: "1.5rem" }}>What People Say</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,4.5vw,5rem)", fontWeight: 900, lineHeight: 1.0, color: COLORS.black, letterSpacing: "-1px", marginBottom: "1rem" }}>
          Early <em style={{ fontStyle: "italic", color: COLORS.tan }}>Reactions.</em>
        </h2>
        <p style={{ fontSize: "0.72rem", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.mid, fontWeight: 700, marginBottom: "4rem" }}>From beta testers & dental professionals</p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", maxWidth: 1100, margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ background: COLORS.cream, padding: "3rem 2.5rem", textAlign: "left" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "4.5rem", fontWeight: 900, color: COLORS.tan, lineHeight: 0.5, display: "block", marginBottom: "1.5rem" }}>"</span>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: COLORS.brown, fontStyle: "italic", fontWeight: 400, marginBottom: "2rem" }}>{t.quote}</p>
              <div style={{ color: COLORS.tan, marginBottom: "0.5rem" }}>★★★★★</div>
              <div style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, color: COLORS.black }}>{t.name}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.tan, marginTop: "0.2rem" }}>{t.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", type: "", message: "" }); }, 3000);
  };

  const inputStyle = {
    background: "transparent", border: "none", borderBottom: `1px solid rgba(232,217,196,0.2)`,
    padding: "0.9rem 0", fontFamily: "'Syne', sans-serif", fontSize: "1rem",
    color: COLORS.cream, outline: "none", width: "100%", fontWeight: 400,
  };

  return (
    <section id="contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: COLORS.brown }}>
      <div style={{ padding: "8rem 5rem", borderRight: `1px solid rgba(255,255,255,0.07)` }}>
        <Reveal>
          <p style={{ fontSize: "0.7rem", letterSpacing: "5px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700, marginBottom: "1.5rem" }}>Get In Touch</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,4.5vw,5rem)", fontWeight: 900, lineHeight: 1.0, color: COLORS.cream, letterSpacing: "-1px", marginBottom: "2.5rem" }}>
            Join the<br /><em style={{ fontStyle: "italic", color: COLORS.tan }}>revolution.</em>
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "rgba(232,217,196,0.65)", fontWeight: 400, maxWidth: 400 }}>
            Be among the first to experience Chingum. Sign up for early access, wholesale enquiries, or press.
          </p>
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[["hello@chingum.com"], ["India"], ["www.chingum.com"]].map(([v], i) => (
              <div key={i} style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.tan, flexShrink: 0 }} />
                <span style={{ fontSize: "0.92rem", color: "rgba(232,217,196,0.7)", letterSpacing: "1px" }}>{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ padding: "8rem 5rem" }}>
        <Reveal>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[["Full Name", "name", "text", "Your name"], ["Email Address", "email", "email", "your@email.com"], ["Enquiry Type", "type", "text", "Early Access / Wholesale / Press"]].map(([label, field, type, ph]) => (
              <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.62rem", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700 }}>{label}</label>
                <input type={type} placeholder={ph} value={form[field]} required={field !== "type"}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  style={{ ...inputStyle }}
                  onFocus={e => e.target.style.borderBottomColor = COLORS.tan}
                  onBlur={e => e.target.style.borderBottomColor = "rgba(232,217,196,0.2)"}
                />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.62rem", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.tan, fontWeight: 700 }}>Message</label>
              <textarea placeholder="Tell us something..." rows={4} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={e => e.target.style.borderBottomColor = COLORS.tan}
                onBlur={e => e.target.style.borderBottomColor = "rgba(232,217,196,0.2)"}
              />
            </div>
            <SubmitBtn sent={sent} />
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function SubmitBtn({ sent }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        alignSelf: "flex-start", background: sent ? "rgba(176,125,82,0.5)" : (hov ? COLORS.tan : "transparent"),
        border: `1px solid ${sent || hov ? COLORS.tan : "rgba(232,217,196,0.35)"}`,
        color: COLORS.cream, padding: "1.1rem 3rem",
        fontFamily: "'Syne', sans-serif", fontSize: "0.75rem",
        letterSpacing: "4px", textTransform: "uppercase", fontWeight: 700,
        cursor: "pointer", transition: "all 0.3s",
      }}>
      {sent ? "Message Sent ✓" : "Send Message"}
    </button>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{
      background: COLORS.black, display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "2.5rem 5rem", flexWrap: "wrap", gap: "1rem",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 900, letterSpacing: "2px", color: COLORS.cream }}>Chingum</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: COLORS.tan, fontWeight: 700 }}>Chew This, Not Plastic.</div>
      <div style={{ fontSize: "0.62rem", letterSpacing: "2px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontWeight: 700 }}>© 2025 Chingum. All rights reserved.</div>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <style>{fonts}</style>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Science />
      <Ingredients />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
