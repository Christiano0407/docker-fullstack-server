/**
 * src/pages/Home.tsx
 * Landing page: Navigation - Pages
 * SPA [Single Page Application]
 */

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Top5Grid from "../components/Top5Grid";
import  Footer  from "../components/Footer";
import { moviesAPI } from "../api/moviesApi";
import type { Page } from "../App"; 
import "../css/App.css"; 


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
    genres: number; 
    topGross: string;
    topTitle: string; 
  } | null>(null); 

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
   useEffect(() => {
    fetch("api/v1/movies/stats")
    .then(r => r.json())
    .then(s => s.setStateData({
      total: s.total_movies ?? 579,
      genre: s.genres.length ?? 20,
      topGross: fmt(s.total_gross?.adjusted_gross?? 0),
      topTitle: s.total_gross?.top_title?? "",
    }))
    .catch(() => {})
   }, []); 

   // = Mock Data stats = 
   const aboutStats = statsData?[
    [statsData.total,    "Total Films",  "1937 – 2016"],
    [statsData.genres,   "Genres",       "Classified"],
    [statsData.topGross, "Top Gross",    statsData.topTitle],
    [79,                 "Years",        "of Production"],
  ] : [];


  // = return Component = 
  return (
    <div className="wrapper__home">
      {/* === Hero Section === */}
      <section className="home__hero">
      {/* === Mesh === */}
      <div className="home__hero--mesh" />
      {/* === Grid === */}
      <div className="home__hero--grid" />
      {/* === Btn Fade === */}
      <div className="hero--btnFade" />

      {/* === Ghost Year === */}
      <div className="home--ghostYear">1937</div>

      {/* === Content === */}
      <div className="home__content">
        <p className="home__content--paragraph">
          <span className="paragraph--text">Disney Cinema Archive · 1937 — 2016</span>
        </p>
        <h1 className="home__content--title">
          Eight
          <br />Decades
          <span className="title--text"> of cinematic History & Magic Dishes</span>
        </h1>
      </div>
      {/* === Row Ref | Motion === */}
       <div className="home__rowRef">
        {
          [
            [<><span ref={countRef}>579</span></>, "Films"], 
            ["20", "Genres"], 
            ["$22b+", "Combined Gross"], 
            ["79", "Years"]
          ].map(([num, label], i) => ( 
           <div key={i} 
              style={{ 
                flex: 1,
                paddingRight: i < 3 ? "2rem":"0",
                paddingLeft: i < 0 ? "2rem":"0",
                borderLeft: i < 0 ? ".1rem solid var(--border)":"none",
              }}>
              <div className="ref--num">{num}</div>
              <div className="ref--label" >{label}</div>
           </div>
          ))
        }
       </div>
       {/* === Row Ref | Btn === */}
        <div className="home__rowRefBtn">
          <button className="btn btn--gold" onClick={() => onNavigate(`catalog`)}>
            <span className="btn--collection">Collections</span>
          </button>
          <button className="btn btn--outline" onClick={() => onNavigate(`archive`)}>
            View Archive
          </button>
        </div>

      </section>

      {/* === ---- MARQUE ITEMS | Slides ---- === */}
      <div className="home__items">
        <div className="home__items--slider">
          {  
            [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((g,i) => (
              <span key={i}
                style={{
                  fontFamily:"var(--font-display)", fontSize:"0.9rem", letterSpacing: "0.3rem", textTransform:"uppercase", color: "var(--text-dim)", padding:"0.3rem", borderRight: ".1rem solid var(--border)", whiteSpace: "nowrap",  
                }}
                >{g}<span style={{color:"var(--clr-base-white: #60B5FF)", marginLeft: "3rem"}}>◆</span>
              </span>
            ))
          }
        </div>
      </div>

      {/* === Top 5 Movies === */}
      <section className="home__moviesTop">
          <div className="home__moviesTop--container" >
            <div className="moviesTop--text">
              <p  className="eyebrow">Featured</p>
              <h2 className="section-title">Top Grossing</h2>
            </div>
            <button className="btn moviesTop--btn" onClick={() => onNavigate("catalog")}>Full Catalog</button>
          </div>
          <Top5Grid onNavigate={onNavigate} />
      </section>
      
      {/* === About === */}
      <div className="home__about">
        <div className="home__about--text">
          <p  className="eyebrow">The Collection</p>
          <h2 className="about-title"> About <br/> The Archive</h2>
          <p className="about-paragraph">
            A comprehensive dataset spanning eight decades of Disney's cinematic output.
            From Snow White in 1937 to Rogue One in 2016 — every title documented with
            financial performance, genre classification, and MPAA ratings.
          </p>
        </div>

        <div className="home__about__stats">
          {
            aboutStats.map(([num, label, note], i) => (
              <div key={i} 
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--surface)")}
              > 
                <div style={{ fontFamily:"var(--font-display)", fontSize:"3rem", color:"var(--gold-bright)", lineHeight:1, marginBottom:"0.4rem" }}>{num}</div>
                <div  style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-muted)" }}>{label}</div>
                <div style={{ fontSize:"0.82rem", color:"var(--text-dim)", marginTop:"0.3rem" }}>{note}</div>
              </div>
            ))
          }
        </div>

      </div>
      {/* === Footer === */}
      <Footer />
    </div>
  )

}; 

export default Home; 