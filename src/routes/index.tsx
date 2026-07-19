import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  ArrowRight,
  ArrowUpRight,
  Layout,
  Palette,
  Rocket,
  ChevronDown,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react";
import monogramAsset from "@/assets/nafloniya-logo.png.asset.json";
import ananiyaAsset from "@/assets/ananiya-portrait.jpg.asset.json";
import burgerVideo from "@/assets/burger-ad-v2.mp4.asset.json";
import realestateVideo from "@/assets/realestate-ad-v2.mp4.asset.json";
import furnitureVideo from "@/assets/furniture-ad-v2.mp4.asset.json";
import hotelVideo from "@/assets/hotel-ad.mp4.asset.json";
import burgerBg from "@/assets/burger-bg.png.asset.json";
import furnitureBg from "@/assets/furniture-bg.png.asset.json";
import hotelBg from "@/assets/hotel-bg.png.asset.json";
import realestateBg from "@/assets/realestate-bg.png.asset.json";

const monogram = monogramAsset.url;
const ananiya = ananiyaAsset.url;

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#team" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Layout,
    title: "Web Design",
    desc: "Full-stack web development — we design and build the entire system: pixel-perfect front-end interfaces, secure back-end logic, databases, authentication, and admin dashboards, deployed as a single, fast, production-ready website.",
  },
  {
    icon: Palette,
    title: "Business Card Design",
    desc: "Custom, print-ready business cards — refined typography, tactile finishes, and a monogram-led layout that makes your first handshake feel unforgettable.",
  },
  {
    icon: Rocket,
    title: "Content & Motion",
    desc: "Cinematic 3D promotional reels — the same films you see running in our Burger, Furniture, Hotel and Real Estate showcases: fully modeled, lit and animated in 3D, cut for TikTok and Instagram to pull viewers straight from the feed into the brand.",
  },
];

const PROJECTS = [
  {
    key: "burger",
    name: "Nafloniya Burger",
    label: "Burger",
    tag: "Food & Beverage",
    desc: "A sizzling, appetite-first web experience — cinematic 3D visuals, bold typography, and a menu that converts scrolls into orders.",
    href: "https://nafloniyaburger.lovable.app",
    video: burgerVideo.url,
    bg: burgerBg.url,
  },
  {
    key: "furniture",
    name: "Nafloniya Furniture",
    label: "Furniture",
    tag: "Interior & Retail",
    desc: "A tactile, editorial storefront — every piece framed in warm light, engineered to make craft feel collectible.",
    href: "https://nafloniya-furniture.lovable.app",
    video: furnitureVideo.url,
    bg: furnitureBg.url,
  },
  {
    key: "hotel",
    name: "Nafloniya Hotel",
    label: "Hotel",
    tag: "Hospitality",
    desc: "A cinematic hospitality site with quiet luxury pacing — bookings, suites, and story woven into one calm journey.",
    href: "https://nafloniya-hotel.lovable.app",
    video: hotelVideo.url,
    bg: hotelBg.url,
  },
  {
    key: "realestate",
    name: "Nafloniya Real Estate",
    label: "Real Estate",
    tag: "Real Estate",
    desc: "Architectural, high-trust design showcasing premium listings with immersive 3D tours and refined property storytelling.",
    href: "https://nafloniya-realestate.lovable.app",
    video: realestateVideo.url,
    bg: realestateBg.url,
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

type Project = (typeof PROJECTS)[number];

function ProductShowcase() {
  const [active, setActive] = useState<Project["key"]>(PROJECTS[0].key);
  const project = PROJECTS.find((p) => p.key === active) ?? PROJECTS[0];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  // Preload all videos silently for instant switch
  useEffect(() => {
    PROJECTS.forEach((p) => {
      if (!p.video) return;
      const v = document.createElement("video");
      v.preload = "auto";
      v.src = p.video;
    });
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = muted;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [active]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  return (
    <div className="reveal">
      {/* Category buttons */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {PROJECTS.map((p) => {
          const isActive = p.key === active;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setActive(p.key)}
              className={`group relative overflow-hidden rounded-full border px-6 py-3 text-[0.7rem] uppercase tracking-[0.32em] transition-all duration-500 ${
                isActive
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black shadow-[0_10px_40px_-10px_rgba(212,175,55,0.8)]"
                  : "border-[color:var(--gold)]/30 text-ivory/70 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              }`}
            >
              <span className="relative z-10">{p.label}</span>
              {isActive && (
                <span className="absolute inset-0 -z-0 animate-pulse bg-[color:var(--gold)]/30 blur-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div
        key={project.key}
        className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/25 bg-black shadow-[0_40px_120px_-30px_rgba(212,175,55,0.35)]"
      >
        {/* Background = landing page hero */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${project.bg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative grid gap-8 p-6 md:grid-cols-[1.05fr_1fr] md:p-10 lg:gap-14 lg:p-14">
          {/* Video */}
          <div className="relative overflow-hidden rounded-xl border border-[color:var(--gold)]/40 bg-black shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]">
            <video
              ref={videoRef}
              key={project.video}
              src={project.video}
              loop
              playsInline
              autoPlay
              preload="auto"
              className="aspect-[9/16] h-full w-full object-cover md:aspect-[4/5]"
            />
            <button
              type="button"
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                if (v.paused) { void v.play(); setPlaying(true); }
                else { v.pause(); setPlaying(false); }
              }}
              aria-label={playing ? "Pause" : "Play"}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--gold)] bg-black/60 text-[color:var(--gold)] backdrop-blur">
                <Play className="h-6 w-6" fill="currentColor" />
              </span>
            </button>
            <span className="absolute left-4 top-4 rounded-full border border-[color:var(--gold)]/60 bg-black/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-[color:var(--gold)] backdrop-blur">
              Reel · HD
            </span>
            {/* Video controls */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--gold)]/70 bg-black/70 text-[color:var(--gold)] backdrop-blur transition-all hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const v = videoRef.current;
                  if (!v) return;
                  const anyV = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
                  if (document.fullscreenElement) void document.exitFullscreen();
                  else if (anyV.requestFullscreen) void anyV.requestFullscreen();
                  else if (anyV.webkitEnterFullscreen) anyV.webkitEnterFullscreen();
                }}
                aria-label="Watch full video"
                title="Watch full video"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--gold)]/70 bg-black/70 text-[color:var(--gold)] backdrop-blur transition-all hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              {project.tag}
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-ivory md:text-5xl">
              {project.name}
            </h3>
            <div className="mt-5 h-px w-16 bg-[color:var(--gold)]/70" />
            <p className="mt-6 max-w-lg leading-relaxed text-ivory/80">{project.desc}</p>
            <p className="mt-4 truncate text-[0.65rem] uppercase tracking-[0.32em] text-[color:var(--gold)]/70">
              {project.href.replace(/^https?:\/\//, "")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-solid"
              >
                Visit Live Site <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a href="#contact" className="btn-gold">
                Want One Like It <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingGetInTouch() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const hero = document.getElementById("home");
      const contact = document.getElementById("contact");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const contactTop = contact
        ? contact.getBoundingClientRect().top
        : window.innerHeight * 2;
      // Show once past the hero, hide once contact is on screen
      setVisible(heroBottom < 80 && contactTop > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href="#contact"
      aria-label="Get in touch"
      className={`group fixed bottom-6 right-6 z-40 select-none transition-all duration-700 md:bottom-10 md:right-10 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      {/* Outer breathing halo */}
      <span className="absolute inset-0 -z-20 rounded-full bg-[color:var(--gold)] opacity-30 blur-2xl animate-glow-pulse" />
      {/* Rotating conic ring */}
      <span
        className="absolute -inset-[3px] -z-10 rounded-full opacity-70 blur-[1px]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(212,175,55,0.9), transparent, rgba(233,216,166,0.8), transparent)",
          animation: "spin 6s linear infinite",
        }}
      />
      <span className="relative flex items-center gap-3 rounded-full border border-[color:var(--gold)] bg-black/85 px-6 py-3.5 font-serif text-xs uppercase tracking-[0.4em] text-[color:var(--gold)] shadow-[0_15px_50px_-10px_rgba(212,175,55,0.7)] backdrop-blur-xl transition-all duration-500 group-hover:bg-[color:var(--gold)] group-hover:text-black group-hover:shadow-[0_20px_60px_-10px_rgba(212,175,55,1)] md:px-8 md:py-4">
        <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)] transition-colors duration-500 group-hover:text-black" strokeWidth={1.5} />
        <span className="relative">
          Let's Talk
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
        </span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--gold)] opacity-70 group-hover:bg-black" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--gold)] group-hover:bg-black" />
        </span>
      </span>
    </a>
  );
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const brand = String(data.get("brand") ?? "").trim();
    const goal = String(data.get("goal") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `New Nafloniya inquiry — ${name || "Website enquiry"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Brand / Company: ${brand}`,
      `What they want from Nafloniya: ${goal}`,
      "",
      "Message:",
      message,
      "",
      "— Sent from nafloniyadesign.com",
    ].join("\n");

    const href = `mailto:ananiyaermias7@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;

    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <FloatingGetInTouch />
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

        <div className="mt-20 grid gap-px bg-[color:var(--gold)]/15 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="reveal group relative flex flex-col gap-6 overflow-hidden bg-background p-10 transition-all duration-500 hover:-translate-y-1 hover:bg-[color:var(--charcoal)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-[color:var(--gold)]/8 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[color:var(--gold)]/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[color:var(--gold)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.55)]">
                  <span className="absolute inset-0 rounded-full border border-[color:var(--gold)]/0 transition-all duration-700 group-hover:inset-[-8px] group-hover:border-[color:var(--gold)]/30" />
                  <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />
                </div>
                <h3 className="relative font-serif text-2xl text-ivory transition-colors duration-500 group-hover:text-[color:var(--gold)]">
                  {s.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-ivory/70">{s.desc}</p>
                <span className="relative mt-auto h-px w-8 bg-[color:var(--gold)]/60 transition-all duration-500 group-hover:w-24" />
              </div>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* PRODUCTS */}
      <section id="portfolio" className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col items-center text-center">
          <Eyebrow>Our Products</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl text-ivory md:text-5xl">
            Cinematic Reels · Live Sites
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ivory/65">
            The same reels running across TikTok and Instagram — pick a category
            below to watch it in HD, then step from the film straight into the
            live website behind it.
          </p>
        </div>

        <div className="mt-16">
          <ProductShowcase />
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
          <a
            href="https://ananiya-portfolio.lovable.app/"
            target="_blank"
            rel="noreferrer"
            aria-label="View Ananiya's portfolio"
            className="group relative mx-auto block w-full max-w-sm"
          >
            <div className="gold-glow absolute -inset-10 animate-glow-pulse transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute -inset-2 rounded-full border border-[color:var(--gold)]/30 opacity-0 transition-all duration-700 group-hover:-inset-4 group-hover:opacity-100" />
            <div className="absolute -inset-6 rounded-full border border-[color:var(--gold)]/15 opacity-0 transition-all duration-1000 group-hover:-inset-10 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-full border border-[color:var(--gold)]/50 shadow-[0_0_60px_rgba(212,175,55,0.25)] transition-all duration-700 group-hover:border-[color:var(--gold)] group-hover:shadow-[0_0_100px_rgba(212,175,55,0.55)]">
              <img
                src={ananiya}
                alt="Ananiya Ermias, Web and Brand Designer"
                className="aspect-square h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="mb-10 flex items-center gap-2 rounded-full border border-[color:var(--gold)] bg-black/70 px-5 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-[color:var(--gold)] backdrop-blur">
                  View Portfolio <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </a>

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
                  { icon: TelegramIcon, href: "https://t.me/+251949709118", label: "Telegram" },
                  { icon: Instagram, href: "https://instagram.com/ananiya_ermias", label: "Instagram" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/ananiya-ermias", label: "LinkedIn" },
                  { icon: Phone, href: "tel:+251949709118", label: "Phone" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group/icon relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)] transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black hover:shadow-[0_10px_30px_-5px_rgba(212,175,55,0.6)]"
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

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden px-6 py-8 md:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="gold-glow absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-70" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="reveal relative text-center">
            <div className="relative mx-auto inline-flex flex-col items-center">
              <span className="mb-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.5em] text-[color:var(--gold)]/80">
                <span className="h-px w-8 bg-[color:var(--gold)]/60" />
                Now booking select projects
                <span className="h-px w-8 bg-[color:var(--gold)]/60" />
              </span>
              <h3 className="font-serif text-5xl leading-none tracking-[0.18em] text-[color:var(--gold)] md:text-7xl lg:text-8xl">
                GET IN TOUCH
              </h3>
              <span className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
            </div>
            <div className="relative mx-auto mt-8 inline-block">
              <span className="absolute -inset-6 -z-10 rounded-full bg-[color:var(--gold)]/15 blur-3xl animate-glow-pulse" />
              <h2 className="font-serif text-3xl leading-[1.15] tracking-[0.02em] text-white md:text-5xl">
                Let's Build Something Iconic.
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ivory/75">
              Tell us what you want out of Nafloniya — a full website, a brand,
              a launch reel, or all three. Fill the form below and it lands
              directly in Ananiya's inbox. We reply within one business day.
            </p>
          </div>

          <div className="reveal mt-16 grid gap-16 md:grid-cols-[1.3fr_1fr]">
            <form
              onSubmit={onSubmit}
              className="relative flex flex-col gap-6 rounded-2xl border border-[color:var(--gold)]/25 bg-black/60 p-8 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.35)] backdrop-blur-md md:p-10"
            >
              <span className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-[color:var(--gold)]/40 via-transparent to-[color:var(--gold)]/20 opacity-60 blur-md" />
              <div className="flex items-center justify-between">
                <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[color:var(--gold)]">
                  Tell us what you want from Nafloniya
                </p>
                <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-ivory/50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--gold)] opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                  </span>
                  Live
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Name" name="name" placeholder="Your full name" />
                <FormField label="Email" name="email" type="email" placeholder="you@studio.com" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Brand / Company" name="brand" placeholder="Brand name" />
                <FormField
                  label="What do you want from Nafloniya?"
                  name="goal"
                  placeholder="Website · Brand · Promo Reel · Business Card"
                />
              </div>
              <FormField
                label="Project details"
                name="message"
                placeholder="Tell us about your brand, goals, timeline and budget…"
                textarea
              />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-ivory/45">
                  Delivered to ananiyaermias7@gmail.com
                </p>
                <button type="submit" className="btn-gold-solid">
                  {sent ? "Opening your mail ✓" : "Send to Nafloniya"}
                  {!sent && <ArrowUpRight className="h-3.5 w-3.5" />}
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
