// SidebarNav.jsx
// ADK Navigation Panel — Inspire Design System (light theme)
// Item layout mirrors the NCM LeftNav: full-width rows, padding 10px 24px,
// 3px yellow left accent + #fafafa bg on active.
// Collapses to 64px icon-only mode via a 24×24 ghost icon button.

import { useState } from 'react'

// ── Fonts ─────────────────────────────────────────────────────────────────────
const F_HEADLINE = '"GermanedgeSans", "Arial", sans-serif'
const F_BODY     = '"GermanedgeSansCn", "Arial Narrow", "Arial", sans-serif'

// ── Icons (currentColor so hover/active state flows through) ──────────────────

const CollapseIcon = () => (
  <svg width="16" height="12" viewBox="0 0 18 14" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="6" y1="1.75" x2="6" y2="12.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 4.5L8 7L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ExpandIcon = () => (
  <svg width="16" height="12" viewBox="0 0 18 14" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="6" y1="1.75" x2="6" y2="12.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8.5 4.5L11 7L8.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ButtonsNavIcon = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="5" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const ToggleNavIcon = () => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="18" height="10" rx="5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="14" cy="6" r="3" fill="currentColor"/>
  </svg>
)

const NcmNavIcon = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
    <path d="M1 1h8l4 4v12H1V1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="3.5" y1="8"  x2="10.5" y2="8"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="3.5" y1="11" x2="10.5" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="3.5" y1="14" x2="7.5"  y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const DataSourcesNavIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <ellipse cx="9" cy="3.5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 3.5V8c0 1.38 3.13 2.5 7 2.5S16 9.38 16 8V3.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 8v4.5C2 13.88 5.13 15 9 15s7-1.12 7-2.5V8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const AppsLibraryNavIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="6" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="9" y1="12" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// ── 24×24 ghost icon button — used for collapse/expand control ───────────────
// Follows ghost token set: white default, #fafafa hover, #e7e6e6 active.

function GhostIconButton({ onClick, ariaLabel, children }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const bg     = pressed ? '#e7e6e6' : hovered ? '#fafafa' : '#ffffff'
  const border = pressed ? 'transparent' : '#e7e6e6'

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      aria-label={ariaLabel}
      style={{
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: '50%',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
        color: '#3f3e3d',
        transition: 'background 80ms ease, border-color 80ms ease',
      }}
    >
      {children}
    </button>
  )
}

// ── Nav sections ──────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    label: 'Components',
    items: [
      { key: 'buttons', label: 'Buttons',      Icon: ButtonsNavIcon, action: { type: 'scroll', target: 'section-buttons' } },
      { key: 'toggle',  label: 'Toggle Switch', Icon: ToggleNavIcon,  action: { type: 'scroll', target: 'section-toggle'  } },
    ],
  },
  {
    label: 'App Views',
    items: [
      { key: 'ncm',          label: 'NCM Details',    Icon: NcmNavIcon,         action: { type: 'page', target: 'ncm'           } },
      { key: 'data-sources', label: 'Data Sources',  Icon: DataSourcesNavIcon, action: { type: 'page', target: 'data-sources'  } },
      { key: 'apps-library', label: 'Apps Library',  Icon: AppsLibraryNavIcon, action: { type: 'page', target: 'apps-library'  } },
    ],
  },
]

// ── NavItem ───────────────────────────────────────────────────────────────────

function NavItem({ item, isActive, onNavigate, collapsed, currentPage }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = item

  const bg     = isActive ? '#d4d3ce' : hovered ? '#f2f2f2' : 'transparent'
  const color  = isActive || hovered ? '#000000' : '#575655'
  const weight = isActive ? 600 : 400
  const accent = isActive ? '3px solid #000000' : '3px solid transparent'

  function handleClick() {
    if (item.action.type === 'page') {
      onNavigate(item.action.target)
    } else {
      // Scroll action — navigate to showcase first if on a different page
      if (currentPage !== 'showcase') {
        onNavigate('showcase')
        setTimeout(() => {
          const el = document.getElementById(item.action.target)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
      } else {
        const el = document.getElementById(item.action.target)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // ── Collapsed: centered icon only ────────────────────────────────────────
  if (collapsed) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={item.label}
        aria-label={item.label}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '10px 0',
          background: bg,
          border: 'none',
          borderLeft: accent,
          cursor: 'pointer',
          color,
          transition: 'background 80ms ease, color 80ms ease',
        }}
      >
        <Icon />
      </button>
    )
  }

  // ── Expanded: full-width row matching NCM LeftNav item pattern ────────────
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '10px 24px',
        background: bg,
        border: 'none',
        borderLeft: accent,
        cursor: 'pointer',
        color,
        textAlign: 'left',
        transition: 'background 80ms ease, color 80ms ease',
      }}
    >
      <Icon />
      <span style={{
        fontFamily: F_BODY,
        fontSize: 14,
        lineHeight: '18px',
        fontWeight: weight,
        whiteSpace: 'nowrap',
        color,
      }}>
        {item.label}
      </span>
    </button>
  )
}

// ── SidebarNav ────────────────────────────────────────────────────────────────

export default function SidebarNav({ currentPage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false)

  const activeKey = currentPage === 'ncm'      ? 'ncm'
                  : currentPage === 'showcase'  ? null
                  : currentPage

  return (
    <aside style={{
      width: collapsed ? 64 : 297,
      flexShrink: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
      boxShadow: '0px 8px 16px 0px rgba(15, 14, 13, 0.24)',
      zIndex: 20,
      position: 'relative',
      overflow: 'hidden',
      transition: 'width 200ms ease',
    }}>

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: collapsed ? '24px 0' : '24px 24px 24px 24px',
        flexShrink: 0,
        transition: 'padding 200ms ease',
      }}>
        {!collapsed && (
          <div>
            <div style={{
              fontFamily: F_HEADLINE,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '18px',
              letterSpacing: '-0.01em',
              color: '#3f3e3d',
            }}>
              Inspire
            </div>
            <div style={{
              fontFamily: F_BODY,
              fontSize: 11,
              lineHeight: '14px',
              color: '#b7b6b6',
              marginTop: 2,
            }}>
              Design System
            </div>
          </div>
        )}

        <GhostIconButton
          onClick={() => setCollapsed(c => !c)}
          ariaLabel={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <ExpandIcon /> : <CollapseIcon />}
        </GhostIconButton>
      </div>

      {/* ── Navigation content ─────────────────────────────────────────────── */}
      {/* No horizontal padding on the scroll container — items fill full width */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        paddingBottom: 72,
      }}>
        <nav style={{
          paddingTop: 24,
          paddingBottom: 48,
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}>
          {SECTIONS.map((section) => (
            <div key={section.label}>

              {/* Overline — hidden when collapsed */}
              {!collapsed && (
                <div style={{
                  fontFamily: F_HEADLINE,
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: '16px',
                  color: '#b7b6b6',
                  paddingLeft: 28,
                  marginBottom: 8,
                  whiteSpace: 'nowrap',
                }}>
                  {section.label}
                </div>
              )}

              {/* Items — no gap between rows, like NCM LeftNav */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {section.items.map(item => (
                  <NavItem
                    key={item.key}
                    item={item}
                    isActive={activeKey === item.key}
                    onNavigate={onNavigate}
                    collapsed={collapsed}
                    currentPage={currentPage}
                  />
                ))}
              </div>

            </div>
          ))}
        </nav>
      </div>

    </aside>
  )
}
