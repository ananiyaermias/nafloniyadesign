import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Layout,
  Palette,
  Megaphone,
  Rocket,
  Quote,
  ChevronDown,
} from "lucide-react";
import monogram from "@/assets/monogram.png";
import ananiya from "@/assets/ananiya.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Layout,
    title: "Web Design",
    desc: "Custom, modern, responsive websites engineered for performance and story.",
  },
  {
    icon: Palette,
    title: "Brand & Logo Design",
    desc: "Identity systems, monograms, and stationery that hold their own on any surface.",
  },
  {
    icon: Megaphone,
    title: "Digital Promotion",
    desc: "Growth for Telegram, Instagram, and paid campaigns — content that converts.",
  },
  {
    icon: Rocket,
    title: "Content & Motion",
    desc: "Cinematic promotional videos, motion graphics, and campaign visuals.",
  },
];

const PROJECTS = [
  { img: work1, name: "Aurelia Atelier", tag: "Web" },
  { img: work2, name: "Leora Identity", tag: "Branding" },
  { img: work3, name: "Lonk Campaign", tag: "Promotion" },
  { img: work6, name: "Maison Noire", tag: "Web" },
  { img: work5, name: "Lasscuery Store", tag: "Web" },
  { img: work4, name: "Cinema Reel", tag: "Promotion" },
];

const FILTERS = ["All", "Web", "Branding", "Promotion"] as const;

const TESTIMONIALS = [
  {
    quote:
      "Nafloniya didn't just design our site — they gave our brand a voice. Every pixel feels intentional.",
    author: "Selam T.",
    role: "Founder, Aurelia Atelier",
  },
  {
    quote:
      "The campaign visuals felt like a film. Our engagement tripled in the first month.",
    author: "Michael B.",
    role: "Marketing Lead, Lonk",
  },
  {
    quote:
      "A rare studio that treats craft with real reverence. The identity system is flawless.",
    author: "Hanna G.",
    role: "Creative Director, Leora",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Monogram({ className = "" }: { className?: string }) {
  return <img src={monogram} alt="Nafloniya monogram" className={className} />;
}

function Divider() {
  return (
    <div className="my-24 flex items-center justify-center gap-4 text-[color:var(--gold)]">
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--gold)]/60 to-transparent" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[color:var(--gold)]" />
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--gold)]/60 to-transparent" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[0.72rem] font-medium uppercase tracking-[0.42em] text-[color:var(--gold)]">
      {children}
    </span>
  );
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const projects = PROJECTS.filter((p) => filter === "All" || p.tag === filter);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[color:var(--gold)]/15 bg-black/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#home" className="flex items-center gap-3">
            <Monogram className="h-9 w-9 object-contain" />
            <span className="font-serif text-lg tracking-[0.35em] text-ivory">
              NAFLONIYA
            </span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-xs uppercase tracking-[0.28em] text-ivory/80 transition-colors hover:text-[color:var(--gold)]"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-gold hidden md:inline-flex">
            Get in Touch
          </a>
          <button
            className="text-[color:var(--gold)] md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/98 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Monogram className="h-9 w-9 object-contain" />
              <span className="font-serif tracking-[0.35em]">NAFLONIYA</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-[color:var(--gold)]"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl tracking-[0.2em] text-ivory hover:text-[color:var(--gold)]"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-gold mt-6"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="gold-glow animate-glow-pulse absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="animate-rise relative mb-10">
            <div className="gold-glow absolute inset-0 -m-16 animate-glow-pulse" />
            <Monogram className="animate-float-slow relative h-40 w-40 object-contain md:h-52 md:w-52" />
          </div>

          <h1
            className="animate-rise font-serif text-[2.5rem] leading-[1.05] tracking-[0.35em] text-ivory md:text-[5rem]"
            style={{ animationDelay: "0.15s" }}
          >
            NAFLONIYA
          </h1>

          <p
            className="animate-rise mt-6 text-[0.72rem] font-medium uppercase tracking-[0.5em] text-[color:var(--gold)] md:text-sm"
            style={{ animationDelay: "0.3s" }}
          >
            Website Design and Promotion
          </p>

          <p
            className="animate-rise mt-8 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg"
            style={{ animationDelay: "0.45s" }}
          >
            We craft immersive websites, iconic brands, and cinematic promotion
            for brands that want to stand out.
          </p>

          <div
            className="animate-rise mt-12 flex flex-col items-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.6s" }}
          >
            <a href="#portfolio" className="btn-gold">
              View Our Work <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a href="#contact" className="btn-gold-solid">
              Start a Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <a
          href="#services"
          className="animate-float-slow absolute bottom-8 left-1/2 -translate-x-1/2 text-[color:var(--gold)]/70 hover:text-[color:var(--gold)]"
          aria-label="Scroll"
        >
          <ChevronDown className="h-6 w-6" />
        </a>
      </section>

      <Divider />

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-ivory md:text-5xl">
            A creative studio for brands with taste.
          </h2>
          <p className="mt-6 text-ivory/70">
            Nafloniya is a boutique studio crafting cinematic digital experiences
            — from the first pixel of your website to the final frame of your
            campaign.
          </p>
        </div>

        <div className="mt-20 grid gap-px bg-[color:var(--gold)]/15 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="reveal group relative flex flex-col gap-6 bg-background p-10 transition-colors duration-500 hover:bg-[color:var(--charcoal)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)] transition-all duration-500 group-hover:border-[color:var(--gold)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]">
                  <Icon className="h-6 w-6" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl text-ivory">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ivory/65">{s.desc}</p>
                <span className="mt-auto h-px w-8 bg-[color:var(--gold)]/60" />
              </div>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col items-center text-center">
          <Eyebrow>Our Work</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl text-ivory md:text-5xl">
            Selected Projects
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-5 py-2 text-[0.7rem] uppercase tracking-[0.32em] transition-all duration-300 ${
                  filter === f
                    ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black"
                    : "border-[color:var(--gold)]/30 text-ivory/70 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <a
              key={p.name + i}
              href="#contact"
              className="reveal group relative block overflow-hidden border border-[color:var(--gold)]/15 bg-charcoal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute inset-0 bg-[color:var(--gold)]/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-[color:var(--gold)]/25" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--gold)]">
                    {p.tag}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-ivory">
                    {p.name}
                  </h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[color:var(--gold)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <Divider />

      {/* TEAM */}
      <section id="team" className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="reveal text-center">
          <Eyebrow>Meet the Team</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl text-ivory md:text-5xl">
            Meet One of Our Members
          </h2>
        </div>

        <div className="reveal mt-20 grid items-center gap-16 md:grid-cols-[minmax(0,1fr)_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="gold-glow absolute -inset-10 animate-glow-pulse" />
            <div className="relative overflow-hidden rounded-full border border-[color:var(--gold)]/50 shadow-[0_0_60px_rgba(212,175,55,0.25)]">
              <img
                src={ananiya}
                alt="Ananiya Ermias, Web and Brand Designer"
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Founder
            </p>
            <h3 className="mt-4 font-serif text-4xl text-ivory md:text-5xl">
              Ananiya Ermias
            </h3>
            <p className="mt-3 font-serif italic text-ivory/60">
              Web &amp; Brand Designer, Nafloniya
            </p>
            <div className="mt-6 h-px w-24 bg-[color:var(--gold)]/60" />
            <p className="mt-6 max-w-lg leading-relaxed text-ivory/75">
              Ananiya designs with a jeweler's eye — every corner, curve, and
              character shaped for weight and warmth. His work sits at the
              intersection of luxury craft and modern digital storytelling,
              guiding brands from monogram to full campaign.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ivory/60">
              He leads Nafloniya's design practice with a belief that a website
              should feel less like a page and more like a place.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://ananiya-portfolio.lovable.app/"
                target="_blank"
                rel="noreferrer"
                className="btn-gold-solid"
              >
                View Full Portfolio <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <div className="flex items-center gap-3">
                {[
                  { icon: Mail, href: "mailto:ananiyaermias7@gmail.com", label: "Email" },
                  { icon: Phone, href: "tel:+251949709118", label: "Phone" },
                  { icon: Globe, href: "https://ananiya-portfolio.lovable.app/", label: "Portfolio" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)] transition-all hover:border-[color:var(--gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.25} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal text-center">
          <Eyebrow>Kind Words</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl text-ivory md:text-5xl">
            Trusted for the details.
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.author}
              className="reveal relative flex flex-col gap-6 border border-[color:var(--gold)]/15 bg-charcoal p-10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-[color:var(--gold)]" strokeWidth={1} />
              <blockquote className="font-serif text-lg italic leading-relaxed text-ivory/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto">
                <div className="text-[0.7rem] uppercase tracking-[0.32em] text-[color:var(--gold)]">
                  {t.author}
                </div>
                <div className="mt-1 text-sm text-ivory/55">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Divider />

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden px-6 py-8 md:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="gold-glow absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-70" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="reveal text-center">
            <Eyebrow>Get in Touch</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-ivory md:text-6xl">
              Let's Build Something Iconic.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ivory/70">
              Tell us about your brand. We'll respond within one business day.
            </p>
          </div>

          <div className="reveal mt-16 grid gap-16 md:grid-cols-[1.3fr_1fr]">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Name" name="name" placeholder="Your full name" />
                <FormField label="Email" name="email" type="email" placeholder="you@studio.com" />
              </div>
              <FormField
                label="Message"
                name="message"
                placeholder="Tell us about the project…"
                textarea
              />
              <div>
                <button type="submit" className="btn-gold">
                  {sent ? "Message sent ✓" : "Send Message"}
                  {!sent && <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>
            </form>

            <aside className="flex flex-col gap-6 border-l border-[color:var(--gold)]/20 md:pl-12">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[color:var(--gold)]">
                Direct
              </p>
              <ContactLine
                icon={Phone}
                label="Phone"
                value="+251 949 709 118"
                href="tel:+251949709118"
              />
              <ContactLine
                icon={Mail}
                label="Email"
                value="ananiyaermias7@gmail.com"
                href="mailto:ananiyaermias7@gmail.com"
              />
              <ContactLine
                icon={Globe}
                label="Website"
                value="www.nafloniyadesign.com"
                href="https://www.nafloniyadesign.com"
              />
            </aside>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-[color:var(--gold)]/20 bg-black/70 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Monogram className="h-10 w-10 object-contain" />
              <span className="font-serif text-lg tracking-[0.35em]">NAFLONIYA</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Website Design and Promotion
            </p>
            <p className="mt-4 max-w-sm text-sm text-ivory/55">
              A creative studio crafting immersive websites, iconic brands, and
              cinematic promotion.
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--gold)]">
              Navigate
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-[color:var(--gold)]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--gold)]">
              Contact
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              <li>+251 949 709 118</li>
              <li>ananiyaermias7@gmail.com</li>
              <li>www.nafloniyadesign.com</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[color:var(--gold)]/15 pt-6 text-xs text-ivory/40 md:flex-row">
          <p>© 2026 Nafloniya. All rights reserved.</p>
          <p className="uppercase tracking-[0.32em]">Crafted with care · Addis Ababa</p>
        </div>
      </footer>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[color:var(--gold)]">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={5}
          placeholder={placeholder}
          className="border border-[color:var(--gold)]/25 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-[color:var(--gold)] focus:outline-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className="border border-[color:var(--gold)]/25 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-[color:var(--gold)] focus:outline-none"
        />
      )}
    </label>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-start gap-4">
      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)] transition-all group-hover:border-[color:var(--gold)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]">
        <Icon className="h-4 w-4" strokeWidth={1.25} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6rem] uppercase tracking-[0.4em] text-[color:var(--gold)]/80">
          {label}
        </span>
        <span className="mt-1 block truncate font-serif text-lg text-ivory transition-colors group-hover:text-[color:var(--gold)]">
          {value}
        </span>
      </span>
    </a>
  );
}
