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
  Maximize2
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
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white py-4 px-6 md:px-12 flex justify-between items-center border-b border-zinc-100">
        <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
          <Logo size={52} variant="red" />
          <span className="font-display font-extrabold text-2xl tracking-tighter text-zinc-950">NEW MARKET</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-zinc-600">
          <a href="#" onClick={scrollToTop} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Home</a>
          <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Servicios</a>
          <a href="#tasacion" onClick={(e) => scrollToSection(e, 'tasacion')} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Tasación</a>
          <a href="#ubicacion" onClick={(e) => scrollToSection(e, 'ubicacion')} className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(255,40,0,0.3)]">Ubicación</a>
          <button 
            onClick={(e) => scrollToSection(e, 'tasacion')}
            className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-full transition-all active:scale-95 font-bold hover:shadow-[0_0_20px_rgba(255,40,0,0.4)] shine-effect"
          >
            Vender Ahora
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-950" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 text-3xl font-display font-bold uppercase text-zinc-950">
          <a href="#" onClick={scrollToTop}>Home</a>
          <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')}>Servicios</a>
          <a href="#tasacion" onClick={(e) => scrollToSection(e, 'tasacion')}>Tasación</a>
          <a href="#ubicacion" onClick={(e) => scrollToSection(e, 'ubicacion')}>Ubicación</a>
          <button 
            onClick={(e) => scrollToSection(e, 'tasacion')}
            className="bg-primary text-white px-8 py-3 rounded-full text-xl hover:shadow-[0_0_20px_rgba(255,40,0,0.4)] transition-shadow"
          >
            Vender Ahora
          </button>
        </div>
      )}

      {/* Hero & Stats Area */}
      <div className="relative overflow-hidden">
        {/* Shared Banner Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://drive.google.com/thumbnail?id=1xs40OEP8VodQk2k8i3pqVJ4_hq8cpfSv&sz=w2000" 
            alt="New Market Gandía Banner" 
            className="w-full h-full object-cover parallax-img brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hero Content */}
        <section ref={heroRef} className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-32 pb-20 z-10">
          <div className="text-center max-w-4xl">
            <div className="overflow-hidden mb-4">
              <h1 className="text-5xl md:text-8xl lg:text-9xl leading-[0.9] reveal-text text-white [text-shadow:_0_8px_24px_rgb(0_0_0_/_80%)]">
                EL VALOR REAL <br />
                <span className="text-primary italic">DE LO QUE YA NO USAS.</span>
              </h1>
            </div>
            <div className="overflow-hidden mb-10">
              <p className="text-lg md:text-xl text-white font-semibold max-w-2xl mx-auto reveal-text">
                Compra, vende y empeña con la máxima tasación en Gandía. 
                Artículos de segunda mano con garantia de experto.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-text">
              <button className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,40,0,0.5)] shine-effect">
                Vender mis Artículos <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Services Grid (Bento Box) */}
      <section id="servicios" ref={servicesRef} className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl mb-4 text-zinc-950">NUESTROS SERVICIOS</h2>
          <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm">Excelencia en Re-Commerce de Lujo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[400px]">
          {/* Card 1: Compraventa */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-3xl service-card">
            <img 
              src="https://drive.google.com/thumbnail?id=1j2MgoMvM8JZsE01Mf9hiKW2qHPAM6b3a&sz=w1200" 
              alt="Compraventa de Artículos" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-10 flex flex-col justify-end">
              <ShoppingBag className="text-primary mb-4" size={40} />
              <h3 className="text-4xl mb-2 text-white">Compraventa</h3>
              <p className="text-white/80 max-w-md">Renueva tu estilo con productos certificados. Compramos tus artículos al mejor precio del mercado.</p>
            </div>
          </div>

          {/* Card 2: Empeños */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl service-card">
            <img 
              src="https://drive.google.com/thumbnail?id=1MF2HHtRumfjb45bzC30wWme-EhILtk9F&sz=w1200" 
              alt="Empeños New Market" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-10 flex flex-col justify-end">
              <ShieldCheck className="text-primary mb-4" size={40} />
              <h3 className="text-4xl mb-2 text-white">Empeños</h3>
              <p className="text-white/80">Dinero inmediato con la custodia más segura de Valencia. Transparencia total.</p>
            </div>
          </div>
        </div>

        {/* New Row for Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[400px] mt-6">
          <div className="md:col-span-12 group relative overflow-hidden rounded-3xl service-card">
            <img 
              src="https://drive.google.com/thumbnail?id=1_rU-O8JrFcLqSjBLXV5SQyt5MkShZ6zb&sz=w2000" 
              alt="Garantía New Market" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/30 to-transparent p-10 flex flex-col justify-center">
              <Award className="text-primary mb-4" size={48} />
              <h3 className="text-4xl mb-2 text-white">Garantía de 1 Año</h3>
              <p className="text-white/80 max-w-xl">Seguridad y confianza en cada compra. Todos nuestros artículos de lujo y tecnología cuentan con un año de garantía oficial New Market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-32 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl mb-2 text-zinc-950">LO QUE DICEN</h2>
              <p className="text-zinc-400 uppercase tracking-widest">Experiencias en Carrer Benissuai, 10</p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-zinc-400 hover:shadow-[0_0_15px_rgba(255,40,0,0.3)]">
                <ChevronLeft />
              </button>
              <button className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-zinc-400 hover:shadow-[0_0_15px_rgba(255,40,0,0.3)]">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="glass p-8 rounded-2xl hover:shadow-xl transition-all duration-500">
                <div className="flex text-primary mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-6 text-zinc-600">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-bold text-zinc-950 leading-none">{t.name}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-tighter mt-1">Cliente Verificado</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Appraisal CTA */}
      <section id="tasacion" className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
          <h2 className="text-4xl md:text-7xl mb-6 text-zinc-950">¿QUIERES SABER <br /> EL VALOR DE TU ARTÍCULO?</h2>
          <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto">
            Envíanos fotos por WhatsApp y recibe una tasación preliminar en menos de 5 minutos. Sin compromiso.
          </p>
          <a 
            href="https://wa.me/34962860050" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] shine-effect"
          >
            <MessageCircle fill="currentColor" /> TASACIÓN POR WHATSAPP
          </a>
        </div>
      </section>

      {/* Map & Footer */}
      <section id="ubicacion" className="py-32 border-t border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl mb-16 text-zinc-950 text-center md:text-left">NUESTRAS TIENDAS <br className="hidden md:block" /> EN GANDÍA</h2>
          
          <div className="space-y-16">
            {/* Store 1 Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              {/* Store 1 Address */}
              <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
                      <h3 className="text-2xl font-bold text-zinc-950 uppercase tracking-tight">New Market Benissuai</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="text-primary shrink-0" size={24} />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">Dirección</h4>
                          <p className="text-zinc-700 font-medium">Carrer Benissuai, 10, 46702 Gandía, Valencia</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="text-primary shrink-0" size={24} />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">Teléfono</h4>
                          <p className="text-zinc-700 font-medium">962 86 00 50</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="text-primary shrink-0" size={24} />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">Horario</h4>
                          <p className="text-zinc-700 font-medium">Lun - Vie: 10:00 - 14:00 | 17:00 - 20:30</p>
                          <p className="text-zinc-700 font-medium">Sábados: 10:00 - 14:00</p>
                        </div>
                      </div>
                    </div>
                    <a 
                      href="https://maps.app.goo.gl/benissuai-placeholder" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-primary font-bold hover:underline"
                    >
                      Ver en Google Maps <ExternalLink size={16} />
                    </a>
                  </div>
                  <div 
                    className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 cursor-pointer group relative"
                    onClick={() => setSelectedImage("https://drive.google.com/thumbnail?id=1sKMD9Kju36bJbQlBffyoTWoyxBIj1U0A&sz=w1200")}
                  >
                    <img 
                      src="https://drive.google.com/thumbnail?id=1sKMD9Kju36bJbQlBffyoTWoyxBIj1U0A&sz=w1200" 
                      alt="New Market Benissuai" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map 1 */}
              <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="text-2xl font-bold text-zinc-950 uppercase tracking-tight">Mapa: Benissuai</h3>
                </div>
                <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-zinc-200 shadow-inner">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.442894567439!2d-0.184333!3d38.966667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61e89333333333%3A0x3333333333333333!2sCarrer%20Benissuai%2C%2010%2C%2046702%20Gandia%2C%20Val%C3%A8ncia!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Store 2 Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              {/* Store 2 Address */}
              <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
                      <h3 className="text-2xl font-bold text-zinc-950 uppercase tracking-tight">New Market República Argentina</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="text-primary shrink-0" size={24} />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">Dirección</h4>
                          <p className="text-zinc-700 font-medium">Av. de la República Argentina, 8, 46702 Gandia, Valencia</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="text-primary shrink-0" size={24} />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">Teléfono</h4>
                          <p className="text-zinc-700 font-medium">961 06 25 84</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="text-primary shrink-0" size={24} />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">Horario</h4>
                          <p className="text-zinc-700 font-medium">Lun - Vie: 10:00 - 14:00 | 17:00 - 20:30</p>
                          <p className="text-zinc-700 font-medium">Sábados: 10:00 - 14:00</p>
                        </div>
                      </div>
                    </div>
                    <a 
                      href="https://maps.app.goo.gl/republica-argentina-placeholder" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-primary font-bold hover:underline"
                    >
                      Ver en Google Maps <ExternalLink size={16} />
                    </a>
                  </div>
                  <div 
                    className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 cursor-pointer group relative"
                    onClick={() => setSelectedImage("https://drive.google.com/thumbnail?id=1z8o_0AD0sukgiTokRfH8CxUF9BcaIhwN&sz=w1200")}
                  >
                    <img 
                      src="https://drive.google.com/thumbnail?id=1z8o_0AD0sukgiTokRfH8CxUF9BcaIhwN&sz=w1200" 
                      alt="New Market República Argentina" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map 2 */}
              <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
                  <h3 className="text-2xl font-bold text-zinc-950 uppercase tracking-tight">Mapa: Rep. Argentina</h3>
                </div>
                <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-zinc-200 shadow-inner">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.55!2d-0.1825!3d38.9655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61e89222222222%3A0x2222222222222222!2sAv.%20de%20la%20Rep%C3%BAblica%20Argentina%2C%208%2C%2046702%20Gandia%2C%20Val%C3%A8ncia!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <div className="flex gap-4">
                <a href="https://www.instagram.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-primary hover:text-white transition-all">
                  <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-primary hover:text-white transition-all">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Logo size={44} variant="white" />
            <span className="font-display font-extrabold text-xl tracking-tighter text-white">NEW MARKET</span>
          </div>
          
          <div className="text-white/60 text-xs uppercase tracking-widest">
            © 2026 New Market Gandía. Todos los derechos reservados.
          </div>

          <div className="flex gap-6 text-white/80 text-sm items-center">
            <a href="mailto:newmarket@hotmail.es" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail size={18} />
              newmarket@hotmail.es
            </a>
            <div className="w-px h-4 bg-white/20 mx-2 hidden md:block"></div>
            <a href="https://www.instagram.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/newmarketgandia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <Facebook size={20} />
            </a>
            <div className="w-px h-4 bg-white/20 mx-2 hidden md:block"></div>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
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
