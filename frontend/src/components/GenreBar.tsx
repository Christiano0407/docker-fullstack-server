/**
 * src/components/GenreBar.tsx
 * Animated horizontal bar for genre stats | GSAP
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// = Tipando Ts = 
interface Props {
  genre: string; 
  count: number; 
  maxCount: number; 
}


export const GenBar = ({genre, count, maxCount}: Props) => {
  const fillRef = useRef<HTMLDivElement>(null); 
  const mct = ((count / maxCount * 100).toFixed(1)); 

  useEffect(() => {
    if(!fillRef.current) return; 
    gsap.to(fillRef.current, {
      scrollTrigger: { trigger: fillRef.current, start: "top 90%" }, 
      width: mct + "%", 
      duration: 1.3, 
      ease: "power3.out",
    }); 
  }, [mct]); 

  return (
    <div className="wrapper-animation" 
      style={{ display: "grid", gridTemplateColumns: "130px 1fr 70px", gap: "1.5rem", alignItems: "center" }}
    >
      
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "0.62rem",
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--text-muted)", textAlign: "right",
      }}>{genre}</span>
 
      <div className="animation--all"
       style={{ height: "2px", background: "var(--border)", 
        position: "relative", overflow: "hidden",
       }}
      >
        <div 
          ref={fillRef} 
          style={{
            position: "absolute", top: 0, left: 0,
            height: "100%", width: "0%",
            background: "linear-gradient(90deg, var(--blue-dim), var(--blue))",
          }} />
      </div>

      <span style={{
        fontFamily: "var(--font-display)", fontSize: "1.1rem",
        color: "var(--gold)",
      }}>{count}</span>

    </div>
  ); 
}