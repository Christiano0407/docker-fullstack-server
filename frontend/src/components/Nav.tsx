/**
 * src/components/Nav.tsx
 */
import type { Page } from "../App";
import React from "react";


interface Props {
  current: Page; 
  onNavigate: { p.Page } => void; 
}

const LINKS:{label: string;  page: Page}[] = {
  { label: "Home",  page: "home" },
  { label: "Catalog",  page: "catalog" },
  { label: "Archive",  page: "archive" },
}; 

const styles = {
  nav: {
    position: "fixed" as const,
    top: 0, left: 0, right: 0,
    zIndex: 500,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.6rem 4rem",
  } as React.CSSProperties,
  navBefore: {
    position: "absolute" as const, inset: 0,
    background: "linear-gradient(to bottom, rgba(3,11,24,0.97) 0%, transparent 100%)",
    pointerEvents: "none" as const,
  } as React.CSSProperties,
  logo: {
    fontFamily: "var(--font-display)",
    fontSize: "1.6rem",
    letterSpacing: "0.2em",
    color: "var(--cream)",
    position: "relative" as const,
    zIndex: 1,
    cursor: "pointer",
    background: "none",
    border: "none",
  } as React.CSSProperties,
  ul: {
    display: "flex",
    gap: "2.5rem",
    listStyle: "none",
    position: "relative" as const,
    zIndex: 1,
  } as React.CSSProperties,
};

export const Nav = ( { current, onNavigate } ) => { 
  return (
    <nav style={styles.nav} >
      <div style={styles.navBefore} />
      <button style={styles.logo} 
        onClick={ () => onNavigate("home")}
      >
        DreamsMovies
      </button>
      <ul style={styles.ul}></ul>
    </nav>
  )
}


const navLink = () => {}