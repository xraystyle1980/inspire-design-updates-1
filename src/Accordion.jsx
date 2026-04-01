// Accordion — Inspire Design System
// Faithful to the GE Astronaut Design System accordion pattern:
//   - White bg, #f2f2f2 on hover
//   - 52px header with 24px horizontal padding
//   - Title: weight 400 collapsed → 600 expanded
//   - Chevron rotates 180° on open
//   - Bottom border #e7e6e6 always present
//   - Smooth height animation via CSS grid trick

import { useState } from 'react'

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen]     = useState(defaultOpen)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div style={{
      background: isHovered && !isOpen ? '#f2f2f2' : '#ffffff',
      width: '100%',
      transition: 'background 120ms ease',
    }}>

      {/* ── Header ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '52px',
          padding: '0 24px',
          background: isHovered ? '#f2f2f2' : '#ffffff',
          border: 'none',
          borderBottom: `1px solid #e7e6e6`,
          cursor: 'pointer',
          outline: 'none',
          transition: 'background 120ms ease',
        }}
      >
        <span style={{
          fontFamily: '"GermanedgeSansCn", "Arial Narrow", Arial, sans-serif',
          fontSize: '14px',
          lineHeight: '18px',
          fontWeight: isOpen ? 600 : 400,
          color: '#3f3e3d',
          transition: 'font-weight 0ms',
          // Reserve bold width so the header never shifts
          display: 'inline-grid',
        }}>
          <span style={{ gridArea: '1/1', fontWeight: 600, visibility: 'hidden', userSelect: 'none' }} aria-hidden="true">{title}</span>
          <span style={{ gridArea: '1/1', fontWeight: isOpen ? 600 : 400 }}>{title}</span>
        </span>

        {/* Chevron — rotates 180° when open */}
        <div style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 250ms ease',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        }}>
          <ChevronIcon />
        </div>
      </button>

      {/* ── Content — grid row trick for smooth height animation ── */}
      <div style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 250ms ease',
      }}>
        <div style={{ minHeight: 0, overflow: 'hidden' }}>
          <div style={{ padding: '24px 0' }}>
            {children}
          </div>
        </div>
      </div>

      {/* Bottom border when open (the header border suffices when closed) */}
      {isOpen && <div style={{ height: '1px', background: '#e7e6e6' }} />}
    </div>
  )
}
