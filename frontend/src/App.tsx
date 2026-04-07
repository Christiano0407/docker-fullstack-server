/**
 * src/App.tsx
 * SPA Router — 3 páginas con GSAP page transition
 */
import { useState, useRef } from "react"; 
import gsap from "gsap";
import Nav from "../src/components/Nav"; 
import Home from "../src/pages/Home"; 
import Catalog from "../src/pages/MovieCatalog"; 
import Archive from "../src/pages/MovieArchive";
import './css/App.css'; 


export type Page = "home" | "catalog" | "archive"; 

export default function App() {

  const [current, setCurrent] = useState<Page>("home"); 
  const overlayRef = useRef<HTMLDivElement>(null); 

  function navigate(next: Page) {
    if (next === current) return; 
    const overlay = overlayRef.current; 
    if(!overlay) return; 

    gsap.to(overlay, {
      opacity: 1, duration:0.25, 
      onComplete: () => {
        setCurrent(next); 
        window.scrollTo(0,0); 
        gsap.to(overlay, { opacity: 0, duration:0.35, delay: 0.05 }); 
      },
    }); 
  }

  return (
    <>
     <div id="idGrain" className="grain" aria-hidden="true" />
      <div 
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "fixed", inset:0, background:"var(--clr-base)",
          zIndex:8000, pointerEvents:"none", opacity:0,
        }}
      />
      <Nav current={current} onNavigate={navigate} />
      <main id="idMain" className="main">
        { current === "home" && <Home onNavigate={navigate} /> }
        { current === "catalog" && <Catalog /> }
        { current === "archive" && <Archive /> }
      </main>
    </>
  )
}