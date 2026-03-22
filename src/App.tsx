/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Recycle, 
  Star, 
  Clock, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  Facebook,
  Award,
  Maximize2,
  Sun,
  Moon
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './components/Logo';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Hero Animations
    const ctx = gsap.context(() => {
      // Text Reveal Animation
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
      });

      // Parallax for Hero Image
      gsap.to(".parallax-img", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Staggered Entrance for Services
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: "Carlos Ruiz",
      text: "La mejor tasación de Gandía sin duda. Vendí mi reloj de lujo y el trato fue impecable.",
      rating: 5
    },
    {
      name: "Elena Martínez",
      text: "Excelente servicio de empeño. Muy profesionales y discretos en Carrer Benissuai.",
      rating: 5
    },
    {
      name: "Marc Soler",
      text: "Encontré un MacBook Pro a un preço incrível. Todo certificado y con garantia.",
      rating: 4
    }
  ];

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={cn("min-h-screen bg-background transition-colors duration-500", theme)}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-nav-bg backdrop-blur-xl py-2 md:py-4 px-6 md:px-12 flex justify-between items-center border-b border-border-theme">
        <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
          <Logo size={36} mdSize={52} variant="red" />
          <span className="font-display font-extrabold text-lg md:text-2xl tracking-tighter text-text-primary uppercase">NEW MARKET</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-text-secondary">
          <a href="#" onClick={scrollToTop} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Home</a>
          <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Servicios</a>
          <a href="#tasacion" onClick={(e) => scrollToSection(e, 'tasacion')} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Tasación</a>
          <a href="#ubicacion" onClick={(e) => scrollToSection(e, 'ubicacion')} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Ubicación</a>
          
          {/* Theme Toggle Buttons */}
          <div className="flex items-center bg-surface p-1 rounded-full border border-border-theme">
            <button 
              onClick={() => setTheme('light')}
              className={cn(
                "p-2 rounded-full transition-all",
                theme === 'light' ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
              title="Modo Claro"
            >
              <Sun size={18} />
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={cn(
                "p-2 rounded-full transition-all",
                theme === 'dark' ? "bg-zinc-800 text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
              title="Modo Oscuro"
            >
              <Moon size={18} />
            </button>
          </div>

          <button 
            onClick={(e) => scrollToSection(e, 'tasacion')}
            className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-full transition-all active:scale-95 font-bold hover:shadow-[0_0_20px_rgba(255,40,0,0.4)] shine-effect"
          >
            Vender Ahora
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 text-xl font-display font-bold uppercase text-text-primary"
          >
            <a href="#" onClick={(e) => { scrollToTop(e); setIsMenuOpen(false); }}>Home</a>
            <a href="#servicios" onClick={(e) => { scrollToSection(e, 'servicios'); setIsMenuOpen(false); }}>Servicios</a>
            <a href="#tasacion" onClick={(e) => { scrollToSection(e, 'tasacion'); setIsMenuOpen(false); }}>Tasación</a>
            <a href="#ubicacion" onClick={(e) => { scrollToSection(e, 'ubicacion'); setIsMenuOpen(false); }}>Ubicación</a>
            
            {/* Mobile Theme Toggle */}
            <div className="flex items-center bg-surface p-2 rounded-full border border-border-theme gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  theme === 'light' ? "bg-white text-primary shadow-md" : "text-text-secondary"
                )}
              >
                <Sun size={20} /> <span className="text-sm">Claro</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  theme === 'dark' ? "bg-zinc-800 text-primary shadow-md" : "text-text-secondary"
                )}
              >
                <Moon size={20} /> <span className="text-sm">Oscuro</span>
              </button>
            </div>

            <button 
              onClick={(e) => { scrollToSection(e, 'tasacion'); setIsMenuOpen(false); }}
              className="bg-primary text-white px-8 py-3 rounded-full text-lg hover:shadow-[0_0_20px_rgba(255,40,0,0.4)] transition-shadow"
            >
              Vender Ahora
            </button>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-text-secondary">
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero & Stats Area */}
      <div className="relative overflow-hidden bg-background">
        {/* Shared Banner Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://drive.google.com/thumbnail?id=1xs40OEP8VodQk2k8i3pqVJ4_hq8cpfSv&sz=w2000" 
            alt="New Market Gandía Banner" 
            className="w-full h-full object-cover parallax-img border-none"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            decoding="async"
          />
          {/* Seamless Transition Overlays */}
          {/* 1. Bottom Fade - Deep and smooth (Only in dark mode for contrast) */}
          <div className={cn(
            "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-20 transition-opacity duration-500",
            theme === 'light' ? "hidden" : "block"
          )}></div>
          {/* 2. Top Vignette - Adds depth (Only in dark mode) */}
          <div className={cn(
            "absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent z-20 transition-opacity duration-500",
            theme === 'light' ? "hidden" : "block"
          )}></div>
        </div>

        {/* Hero Content */}
        <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 pt-32 pb-20 z-30">
          <div className="text-center max-w-5xl">
            <div className="overflow-hidden mb-6">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] reveal-text text-white font-display tracking-tighter drop-shadow-2xl">
                EL VALOR REAL <br />
                <span className="text-primary italic">DE LO QUE YA NO USAS.</span>
              </h1>
            </div>
            <div className="overflow-hidden mb-12">
              <p className="text-lg md:text-2xl text-text-secondary font-medium max-w-2xl mx-auto reveal-text leading-relaxed">
                Compra, vende y empeña con la máxima tasación en Gandía. 
                Artículos de segunda mano con garantia de experto.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center reveal-text">
              <button 
                onClick={(e) => scrollToSection(e, 'tasacion')}
                className="group relative bg-primary text-white px-12 py-6 rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,40,0,0.4)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Vender mis Artículos <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Services Grid (Bento Box) */}
      <section id="servicios" ref={servicesRef} className="py-32 max-w-7xl mx-auto px-6 bg-background relative z-10">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl mb-4 text-text-primary">NUESTROS SERVICIOS</h2>
          <p className="text-text-secondary uppercase tracking-[0.2em] text-sm">Excelencia em Re-Commerce de Lujo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[400px]">
          {/* Card 1: Compraventa */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-3xl service-card">
            <img 
              src="https://drive.google.com/thumbnail?id=1j2MgoMvM8JZsE01Mf9hiKW2qHPAM6b3a&sz=w1200" 
              alt="Compraventa de Artículos" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
              <ShoppingBag className="text-primary mb-4 w-8 md:w-10 h-8 md:h-10" />
              <h3 className="text-2xl md:text-4xl mb-2 text-white uppercase font-display font-black tracking-tighter">Compraventa</h3>
              <p className="text-white/80 text-sm md:text-base max-w-md">Renueva tu estilo con productos certificados. Compramos tus artículos al mejor precio del mercado.</p>
            </div>
          </div>

          {/* Card 2: Empeños */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl service-card">
            <img 
              src="https://drive.google.com/thumbnail?id=1MF2HHtRumfjb45bzC30wWme-EhILtk9F&sz=w1200" 
              alt="Empeños New Market" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
              <ShieldCheck className="text-primary mb-4 w-8 md:w-10 h-8 md:h-10" />
              <h3 className="text-2xl md:text-4xl mb-2 text-white uppercase font-display font-black tracking-tighter">Empeños</h3>
              <p className="text-white/80 text-sm md:text-base">Dinero inmediato con la custodia más segura de Valencia. Transparencia total.</p>
            </div>
          </div>
        </div>

        {/* New Row for Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[400px] mt-6">
          <div className="md:col-span-12 group relative overflow-hidden rounded-3xl service-card bg-surface min-h-[300px] md:min-h-0">
            <img 
              src="https://drive.google.com/thumbnail?id=1NfakFGnDVotJ5bACtApjPtyXgif40kiV&sz=w2000" 
              alt="Garantía New Market" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/30 to-transparent p-6 md:p-10 flex flex-col justify-center">
              <Award className="text-primary mb-4 w-10 md:w-12 h-10 md:h-12" />
              <h3 className="text-2xl md:text-4xl mb-2 text-white uppercase font-display font-black tracking-tighter">Garantía de 1 Año</h3>
              <p className="text-white/80 text-sm md:text-base max-w-xl">Seguridad y confianza en cada compra. Todos nuestros artículos de lujo y tecnología cuentan con un año de garantía oficial New Market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-32 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl mb-2 text-text-primary">LO QUE DICEN</h2>
              <p className="text-text-secondary uppercase tracking-widest">Experiencias en Carrer Benissuai, 10</p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-border-theme flex items-center justify-center hover:bg-primary hover:text-white transition-all text-text-secondary hover:shadow-[0_0_15px_rgba(255,40,0,0.3)]">
                <ChevronLeft />
              </button>
              <button className="w-12 h-12 rounded-full border border-border-theme flex items-center justify-center hover:bg-primary hover:text-white transition-all text-text-secondary hover:shadow-[0_0_15px_rgba(255,40,0,0.3)]">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-surface/50 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-2xl hover:shadow-xl transition-all duration-500">
                <div className="flex text-primary mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-6 text-text-secondary">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary leading-none">{t.name}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-tighter mt-1">Cliente Verificado</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Appraisal CTA */}
      <section id="tasacion" className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto bg-surface/50 backdrop-blur-xl border border-border-theme rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
          <h2 className="text-3xl md:text-7xl mb-6 text-text-primary">¿QUIERES SABER <br /> EL VALOR DE TU ARTÍCULO?</h2>
          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Envíanos fotos por WhatsApp e recibe una tasación preliminar en menos de 5 minutos. Sin compromiso.
          </p>
          <a 
            href="https://wa.me/34692669449" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 bg-[#25D366] text-white px-6 py-4 md:px-12 md:py-6 rounded-full font-black text-base md:text-xl hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] shine-effect"
          >
            <MessageCircle fill="currentColor" size={20} className="md:w-6 md:h-6" /> TASACIÓN POR WHATSAPP
          </a>
        </div>
      </section>

      {/* Map & Footer */}
      <section id="ubicacion" className="py-32 border-t border-border-theme">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl mb-16 text-text-primary text-center md:text-left">NUESTRAS TIENDAS <br className="hidden md:block" /> EN GANDÍA</h2>
          
          <div className="space-y-20">
            {/* Store 1 Block */}
            <div className="bg-surface rounded-[2.5rem] border border-border-theme overflow-hidden hover:shadow-2xl transition-all duration-700 group">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Info Side */}
                <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">1</div>
                      <h3 className="text-2xl md:text-3xl font-display font-black text-text-primary uppercase tracking-tighter">New Market Benissuai</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-theme flex items-center justify-center shrink-0 shadow-sm">
                          <MapPin className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Dirección</h4>
                          <p className="text-text-primary font-medium leading-tight">Carrer Benissuai, 10, 46702 Gandía, Valencia</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-theme flex items-center justify-center shrink-0 shadow-sm">
                          <Phone className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Teléfono</h4>
                          <p className="text-text-primary font-medium">962 86 00 50</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-theme flex items-center justify-center shrink-0 shadow-sm">
                          <Clock className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Horario</h4>
                          <p className="text-text-primary font-medium text-sm">Lun - Vie: 10:00 - 14:00 | 17:00 - 20:30</p>
                          <p className="text-text-primary font-medium text-sm">Sábados: 10:00 - 14:00</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center gap-4">
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=New+Market+Benissuai+Carrer+Benissuai+10+Gandia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-text-primary text-background px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/10"
                      >
                        Ver en Google Maps <ExternalLink size={14} />
                      </a>
                      
                      <div 
                        className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setSelectedImage("https://drive.google.com/thumbnail?id=1sKMD9Kju36bJbQlBffyoTWoyxBIj1U0A&sz=w1200")}
                      >
                        <img 
                          src="https://drive.google.com/thumbnail?id=1sKMD9Kju36bJbQlBffyoTWoyxBIj1U0A&sz=w1200" 
                          alt="Fachada Benissuai" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Side */}
                <div 
                  className="lg:col-span-7 h-[300px] lg:h-auto border-t lg:border-t-0 lg:border-l border-zinc-200 bg-zinc-100 relative cursor-pointer group/map"
                  onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=New+Market+Benissuai+Carrer+Benissuai+10+Gandia", "_blank")}
                >
                  <div className="absolute inset-0 z-10 bg-black/0 group-hover/map:bg-black/5 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl opacity-0 group-hover/map:opacity-100 transition-all transform translate-y-2 group-hover/map:translate-y-0 flex items-center gap-2 text-xs font-bold text-text-primary">
                      <MapPin size={14} className="text-primary" /> Abrir en Google Maps
                    </div>
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.442894567439!2d-0.184333!3d38.966667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61e89333333333%3A0x3333333333333333!2sCarrer%20Benissuai%2C%2010%2C%2046702%20Gandia%2C%20Val%C3%A8ncia!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[0.2] contrast-[1.1] pointer-events-none"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Store 2 Block */}
            <div className="bg-surface rounded-[2.5rem] border border-border-theme overflow-hidden hover:shadow-2xl transition-all duration-700 group">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Info Side */}
                <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">2</div>
                      <h3 className="text-2xl md:text-3xl font-display font-black text-text-primary uppercase tracking-tighter">República Argentina</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-theme flex items-center justify-center shrink-0 shadow-sm">
                          <MapPin className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Dirección</h4>
                          <p className="text-text-primary font-medium leading-tight">Av. de la República Argentina, 8, 46702 Gandia, Valencia</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-theme flex items-center justify-center shrink-0 shadow-sm">
                          <Phone className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Teléfono</h4>
                          <p className="text-text-primary font-medium">961 06 25 84</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border-theme flex items-center justify-center shrink-0 shadow-sm">
                          <Clock className="text-primary" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Horario</h4>
                          <p className="text-text-primary font-medium text-sm">Lun - Vie: 10:00 - 14:00 | 17:00 - 20:30</p>
                          <p className="text-text-primary font-medium text-sm">Sábados: 10:00 - 14:00</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center gap-4">
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=New+Market+Republica+Argentina+8+Gandia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-text-primary text-background px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/10"
                      >
                        Ver en Google Maps <ExternalLink size={14} />
                      </a>
                      
                      <div 
                        className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setSelectedImage("https://drive.google.com/thumbnail?id=1z8o_0AD0sukgiTokRfH8CxUF9BcaIhwN&sz=w1200")}
                      >
                        <img 
                          src="https://drive.google.com/thumbnail?id=1z8o_0AD0sukgiTokRfH8CxUF9BcaIhwN&sz=w1200" 
                          alt="Fachada Rep. Argentina" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Side */}
                <div 
                  className="lg:col-span-7 h-[300px] lg:h-auto border-t lg:border-t-0 lg:border-l border-zinc-200 bg-zinc-100 relative cursor-pointer group/map"
                  onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=New+Market+Republica+Argentina+8+Gandia", "_blank")}
                >
                  <div className="absolute inset-0 z-10 bg-black/0 group-hover/map:bg-black/5 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl opacity-0 group-hover/map:opacity-100 transition-all transform translate-y-2 group-hover/map:translate-y-0 flex items-center gap-2 text-xs font-bold text-text-primary">
                      <MapPin size={14} className="text-primary" /> Abrir en Google Maps
                    </div>
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.55!2d-0.1825!3d38.9655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61e89222222222%3A0x2222222222222222!2sAv.%20de%20la%20Rep%C3%BAblica%20Argentina%2C%208%2C%2046702%20Gandia%2C%20Val%C3%A8ncia!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[0.2] contrast-[1.1] pointer-events-none"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <div className="flex gap-4">
                <a href="https://www.instagram.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface border border-border-theme flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all">
                  <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface border border-border-theme flex items-center justify-center text-text-primary hover:bg-primary hover:text-white transition-all">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border-theme bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Logo size={44} variant={theme === 'dark' ? 'white' : 'red'} />
            <span className="font-display font-extrabold text-xl tracking-tighter text-text-primary uppercase">NEW MARKET</span>
          </div>
          
          <div className="text-text-secondary text-xs uppercase tracking-widest">
            © 2026 New Market Gandía. Todos los derechos reservados.
          </div>

          <div className="flex gap-6 text-text-secondary text-sm items-center">
            <a href="mailto:newmarket@hotmail.es" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail size={18} />
              newmarket@hotmail.es
            </a>
            <div className="w-px h-4 bg-border-theme mx-2 hidden md:block"></div>
            <a href="https://www.instagram.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <div className="w-px h-4 bg-border-theme mx-2 hidden md:block"></div>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="hover:text-primary transition-colors">Legal</a>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-primary transition-colors p-2"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged store" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

}
