/**
 * src/pages/Home.tsx
 * Landing page: Navigation - Pages
 * SPA [Single Page Application]
 */

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Top5Grid from "../components/Top5Grid";
import Footer  from "../components/Footer";
import { moviesAPI } from "../api/moviesApi";
import type { Page } from "../App"; 


gsap.registerPlugin(ScrollTrigger); 

interface Props {
  onNavigate: (p: Page) => Void; 
}

 
const fmt = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${n.toLocaleString()}`;

const MARQUEE_ITEMS = [
  "Adventure","Comedy","Musical","Drama","Action",
  "Western","Horror","Romance","Documentary","Animation",
];

export const Home = ({onNavigate}: Props) => {
  const eyeRef = useRef<HTMLParagraphElement>(null); 
  const titleRef = useRef<HTMLHeadingElement>(null); 
  const rowRef = useRef<HTMLDivElement>(null); 
  const actsRef = useRef<HTMLDivElement>(null); 
  const countRef = useRef<HTMLSpanElement>(null); 

  const [statsData, setStateData] = useState<{ 
    total: number;
    genre: number; 
    topGross: string;
    topTitle: string; 
  }>

  // = Scroll Animated Movies = 
  useEffect(() => {
    const elsMov = [eyeRef.current, titleRef.current, rowRef.current, actsRef.current]; 
    gsap.set(elsMov, { opacity: 0, y: 30 }); 

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(eyeRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.35")
      .to(rowRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
      .to(actsRef.current,  { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

    // = Counter = 
    if(countRef) {
      const obj = { v:0 }; 
      tl.to(obj, {
        v: 579, duration: 1.8, ease: "power2.out",
        onUpdate() {
          if (countRef.current) countRef.current.textContent = String(Math.round(obj.v)); 
        }, 
      }, "-=1.2"); 
    }

    return () => { tl.kill(); };

  },[]); 

   // = Load stats for About section | Data Movies =

}; 