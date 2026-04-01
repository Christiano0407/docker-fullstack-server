/**
 * src/components/Nav.tsx
 */
import type { Page } from "../App";
import React from "react";


interface Props {
  current:    Page;
  onNavigate: (p: Page) => void;
}
 

const LINKS: { label: string; page: Page }[] = [
  { label: "Home",    page: "home"    },
  { label: "Catalog", page: "catalog" },
  { label: "Archive", page: "archive" },
];

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

export default function Nav({ current, onNavigate }: Props) {
  return (
    <nav style={styles.nav}>
      <div style={styles.navBefore} />
      <button style={styles.logo} onClick={() => onNavigate("home")}>
        V<span style={{ color: "var(--gold)" }}>◆</span>ULT
      </button>
      <ul style={styles.ul}>
        {LINKS.map(({ label, page }) => (
          <li key={page}>
            <NavLink
              label={label}
              active={current === page}
              onClick={() => onNavigate(page)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
 

const NavLink = ({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: active ? "var( --clr-base-white)" : "var(--clr-base)",
        background: "none",
        border: "none",
        cursor: "pointer",
        position: "relative",
        paddingBottom: "3px",
        transition: "color 0.25s",
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: 0, left: 0,
          width: active ? "100%" : "0%",
          height: "1px",
          background: "var(--clr-base)",
          transition: "width 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
          display: "block",
        }}
      />
    </button>
  );
}