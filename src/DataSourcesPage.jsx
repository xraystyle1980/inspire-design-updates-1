// DataSourcesPage.jsx
// Data Source Library — Inspire Design System (ADK/Astronaut, light theme)

import { useState } from 'react'
import Button from './Button.jsx'
import { UncontrolledToggle } from './ToggleSwitch.jsx'

// ── Typography tokens ────────────────────────────────────────────────────────
const F_HEADLINE = '"GermanedgeSans", "Arial", sans-serif'
const F_BODY     = '"GermanedgeSansCn", "Arial Narrow", "Arial", sans-serif'
const F_MONO     = '"Martian Mono", "Courier New", monospace'

// ── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  { id: 'knowledge-retrieval', title: 'Knowledge Retrieval Agent', tags: [{ label: 'GET', color: '#2acff3' }, { label: 'MCP', color: 'rgba(0,0,0,0.88)' }], url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
  { id: 'fetch-users',         title: 'Fetch Users',               tags: [{ label: 'GET', color: '#2acff3' }],                                                url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
  { id: 'store-logs',          title: 'Store Logs',                tags: [{ label: 'POST', color: '#8acd3f' }],                                               url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
  { id: 'filter-inspection',   title: 'Filter Inspection Plans',   tags: [{ label: 'POST', color: '#8acd3f' }],                                               url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
  { id: 'fetch-inspection',    title: 'Fetch Inspection Plans',    tags: [{ label: 'GET', color: '#2acff3' }],                                                url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
  { id: 'grouped-inspection',  title: 'Grouped Inspection Plans',  tags: [{ label: 'POST', color: '#8acd3f' }],                                               url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
  { id: 'fetch-parts',         title: 'Fetch Inspection Plan Parts', tags: [{ label: 'GET', color: '#2acff3' }],                                              url: 'https://e1-dev.k8s.myapp.de/file-repository/api/v1/buckets/files/id' },
]

// ── Icons (inline SVG) ───────────────────────────────────────────────────────

const HamburgerIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
    <rect y="0"    width="18" height="1.5" rx="0.75" fill="#3f3e3d"/>
    <rect y="6.25" width="18" height="1.5" rx="0.75" fill="#3f3e3d"/>
    <rect y="12.5" width="18" height="1.5" rx="0.75" fill="#3f3e3d"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="6" height="12" viewBox="0 0 6 12" fill="none" aria-hidden="true">
    <path d="M5 1L1 6L5 11" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HomeIcon = () => (
  <svg width="13" height="18" viewBox="0 0 13 18" fill="none" aria-hidden="true">
    <path d="M6.5 1.5L1 7V16.5H5V11.5H8V16.5H12V7L6.5 1.5Z" stroke="#3f3e3d" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
  </svg>
)

const CalendarNavIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <rect x="1" y="2.5" width="16" height="12.5" rx="1" stroke="#3f3e3d" strokeWidth="1.5"/>
    <line x1="1" y1="6.5" x2="17" y2="6.5" stroke="#3f3e3d" strokeWidth="1.5"/>
    <line x1="5"  y1="0.5" x2="5"  y2="3.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="0.5" x2="13" y2="3.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="5.75" stroke="#3f3e3d" strokeWidth="1.5"/>
    <line x1="12" y1="12" x2="16.5" y2="16.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="2.5" stroke="#3f3e3d" strokeWidth="1.5"/>
    <path d="M9 1v2.5M9 14.5V17M1 9h2.5M14.5 9H17M3.2 3.2l1.8 1.8M13 13l1.8 1.8M3.2 14.8l1.8-1.8M13 5l1.8-1.8"
      stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const BellIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
    <path d="M9 1.5C5.69 1.5 3 4.19 3 7.5V11.5L1 14H17L15 11.5V7.5C15 4.19 12.31 1.5 9 1.5Z"
      stroke="#3f3e3d" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 17a2 2 0 0 0 4 0" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const MoreIcon = () => (
  <svg width="16" height="4" viewBox="0 0 16 4" fill="none" aria-hidden="true">
    <circle cx="2" cy="2" r="1.5" fill="#3f3e3d"/>
    <circle cx="8" cy="2" r="1.5" fill="#3f3e3d"/>
    <circle cx="14" cy="2" r="1.5" fill="#3f3e3d"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GroupingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="1" y="5" width="11" height="11" rx="1.5" stroke="#3f3e3d" strokeWidth="1.5"/>
    <rect x="6" y="1" width="11" height="11" rx="1.5" stroke="#3f3e3d" strokeWidth="1.5"/>
  </svg>
)

const FilterIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
    <path d="M1 1h12M3 5h8M5.5 9h3" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const SmallAddIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1v12M1 7h12" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="7.5" stroke="#9e9d9d" strokeWidth="1.5"/>
    <path d="M9 8v5" stroke="#9e9d9d" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="5.5" r="0.75" fill="#9e9d9d"/>
  </svg>
)

const FocusIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8.5 1v2.5M8.5 11.5v2.5M1 8.5h2.5M11.5 8.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1 3V1h2M14 1h2v2M16 14v2h-2M3 16H1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Shared style helpers ─────────────────────────────────────────────────────

const iconBtnStyle = {
  background: 'none', border: 'none', padding: 4,
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', lineHeight: 0,
}

const fieldShell = {
  background: '#f2f2f2',
  border: '1px solid #e7e6e6',
  height: 56,
  display: 'flex',
  alignItems: 'stretch',
  flex: 1,
  minWidth: 0,
}

const labelSt = {
  fontFamily: F_BODY, fontSize: 12, lineHeight: '16px',
  color: '#878686', fontWeight: 400,
}

const valueSt = {
  fontFamily: F_BODY, fontSize: 14, lineHeight: '18px',
  color: '#3f3e3d', fontWeight: 600,
}

const placeholderSt = {
  fontFamily: F_BODY, fontSize: 14, lineHeight: '18px',
  color: '#3f3e3d', fontWeight: 400,
}

// ── Form field components ────────────────────────────────────────────────────

function FilledInput({ label, value }) {
  return (
    <div style={fieldShell}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, padding: '8px 8px 8px 16px' }}>
        <span style={labelSt}>{label}</span>
        <span style={valueSt}>{value}</span>
      </div>
      <div style={{ width: 37, flexShrink: 0 }} />
    </div>
  )
}

function EmptyDropdown({ label }) {
  return (
    <div style={{ ...fieldShell, alignItems: 'center' }}>
      <div style={{ flex: 1, padding: '0 0 0 16px' }}>
        <span style={placeholderSt}>{label}</span>
      </div>
      <div style={{ width: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ChevronDownIcon />
      </div>
    </div>
  )
}

function FilledDropdown({ label, value }) {
  return (
    <div style={{ ...fieldShell, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, padding: '8px 0 12px 16px' }}>
        <span style={labelSt}>{label}</span>
        <span style={valueSt}>{value}</span>
      </div>
      <div style={{ width: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ChevronDownIcon />
      </div>
    </div>
  )
}

// ── Source Card ──────────────────────────────────────────────────────────────

function SourceCard({ card, isActive, onSelect }) {
  return (
    <div
      onClick={() => onSelect(card.id)}
      style={{
        position: 'relative',
        background: 'white',
        borderRadius: 4,
        boxShadow: 'var(--elevation-base)',
        padding: 16,
        display: 'flex',
        gap: 12,
        cursor: 'pointer',
        ...(isActive ? { border: '2px solid #575655' } : {}),
      }}
    >
      {/* Active yellow bar */}
      {isActive && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: '#fcd515',
          borderRadius: '2px 0 0 2px',
        }} />
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontFamily: '"Arial", sans-serif',
          fontSize: 14,
          fontWeight: 700,
          lineHeight: '18px',
          color: '#3f3e3d',
          marginBottom: 6,
          whiteSpace: 'nowrap',
          display: 'block',
        }}>
          {card.title}
        </span>
        <span style={{
          fontFamily: F_BODY,
          fontSize: 12,
          color: '#3f3e3d',
          display: 'block',
          marginBottom: 4,
        }}>
          RAW
        </span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {card.tags.map((tag) => (
            <span
              key={tag.label}
              style={{
                background: tag.color,
                color: 'white',
                fontFamily: F_BODY,
                fontSize: 12,
                lineHeight: '12px',
                padding: '6px 8px',
                borderRadius: 2,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tag.label}
            </span>
          ))}
          <span style={{
            fontFamily: F_BODY,
            fontSize: 12,
            color: '#3f3e3d',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
          }}>
            {card.url}
          </span>
        </div>
      </div>

      {/* Right icons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, paddingLeft: 24 }}>
        <button style={iconBtnStyle} aria-label="More options">
          <MoreIcon />
        </button>
        <button style={iconBtnStyle} aria-label="Info">
          <InfoIcon />
        </button>
      </div>
    </div>
  )
}

// ── Navigation bar ───────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav style={{
      background: '#f2f2f2',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <button style={iconBtnStyle} aria-label="Menu">
          <HamburgerIcon />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={iconBtnStyle} aria-label="Back">
            <ArrowLeftIcon />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <button style={iconBtnStyle} aria-label="Home">
              <HomeIcon />
            </button>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>Namespace Management</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#9e9d9d' }}>|</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>Apps</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#9e9d9d' }}>|</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>Default</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#9e9d9d' }}>|</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, fontWeight: 700, color: '#3f3e3d' }}>
              Data Source Library
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarNavIcon />
          <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>06/06/2022</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={iconBtnStyle} aria-label="Notifications"><BellIcon /></button>
        <button style={iconBtnStyle} aria-label="Settings"><SettingsIcon /></button>
        <span style={{ fontFamily: F_HEADLINE, fontSize: 24, fontWeight: 700, color: '#878686', marginLeft: 8 }}>
          DataSourceLibrary
        </span>
        <span style={{ fontFamily: F_HEADLINE, fontSize: 22, fontWeight: 700, color: 'rgba(0,0,0,0.8)', marginLeft: 8 }}>
          Edge.One
        </span>
      </div>
    </nav>
  )
}

// ── Left Nav Boardlet ────────────────────────────────────────────────────────

function LeftNav({ selectedCard, onSelectCard }) {
  const [activeTab, setActiveTab] = useState('in-app')

  return (
    <aside style={{
      width: 384,
      flexShrink: 0,
      background: 'white',
      boxShadow: 'var(--elevation-height)',
      borderRadius: '4px 4px 0 0',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'stretch',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        height: 72,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <GroupingIcon />
          <span style={{ fontFamily: F_HEADLINE, fontSize: 18, fontWeight: 700, color: '#3f3e3d' }}>
            Data Sources
          </span>
        </div>

        {/* Right action bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={iconBtnStyle} aria-label="Filter">
            <FilterIcon />
          </button>

          {/* Circular Add button — 24×24 border-box */}
          <button
            aria-label="Add data source"
            style={{
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer', display: 'inline-flex',
              outline: 'none', flexShrink: 0,
            }}
          >
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#fcd515',
              border: '2px solid #575655',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SmallAddIcon />
            </div>
          </button>
        </div>
      </div>

      {/* Content Switcher */}
      <div style={{ padding: '0 24px', flexShrink: 0, display: 'flex' }}>
        <button
          onClick={() => setActiveTab('in-app')}
          style={{
            flex: 1,
            height: 40,
            border: 'none',
            borderRadius: '2px 2px 0 0',
            cursor: 'pointer',
            background: activeTab === 'in-app' ? '#d4d3ce' : '#f2f2f2',
            borderBottom: activeTab === 'in-app' ? '2px solid #000000' : 'none',
            fontFamily: F_BODY,
            fontSize: 14,
            fontWeight: activeTab === 'in-app' ? 600 : 400,
            color: activeTab === 'in-app' ? '#272625' : '#6f6e6d',
          }}
        >
          In App Data Sources
        </button>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            flex: 1,
            height: 40,
            border: 'none',
            borderRadius: '2px 2px 0 0',
            cursor: 'pointer',
            background: activeTab === 'all' ? '#d4d3ce' : '#f2f2f2',
            borderBottom: activeTab === 'all' ? '2px solid #000000' : 'none',
            fontFamily: F_BODY,
            fontSize: 14,
            fontWeight: activeTab === 'all' ? 600 : 400,
            color: activeTab === 'all' ? '#272625' : '#6f6e6d',
          }}
        >
          All Data Sources
        </button>
      </div>

      {/* Search Input */}
      <div style={{ padding: '10px 24px', flexShrink: 0 }}>
        <div style={{
          background: '#f2f2f2',
          border: '1px solid #e7e6e6',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 16,
        }}>
          <SearchIcon />
          <span style={{
            fontFamily: F_BODY,
            fontSize: 14,
            fontWeight: 600,
            color: '#3f3e3d',
          }}>
            Search by name...
          </span>
        </div>
      </div>

      {/* Card List */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '4px 6px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {CARDS.map((card) => (
          <SourceCard
            key={card.id}
            card={card}
            isActive={selectedCard === card.id}
            onSelect={onSelectCard}
          />
        ))}
      </div>
    </aside>
  )
}

// ── Main Boardlet ────────────────────────────────────────────────────────────

function MainBoardlet() {
  return (
    <main style={{
      flex: 1,
      minWidth: 0,
      background: 'white',
      boxShadow: 'var(--elevation-base)',
      borderRadius: '4px 4px 0 0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 40px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>

        {/* Section 1: Title */}
        <p style={{
          fontFamily: F_HEADLINE,
          fontSize: 16,
          fontWeight: 700,
          color: '#3f3e3d',
          margin: 0,
        }}>
          Knowledge Retrieval Agent
        </p>

        {/* Section 2: Enable MCP Server toggle */}
        <UncontrolledToggle defaultChecked label="Enable MCP Server" />

        {/* Section 3: Form rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Row 1 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <FilledInput label="Name" value="Input Text" />
            <FilledInput label="Name" value="Knowledge Retrieval Agent" />
          </div>

          {/* Row 2 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <FilledInput label="Name" value="Input Text" />
            <FilledInput label="Label" value="Input Text" />
          </div>

          {/* Row 3 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <FilledDropdown label="Method" value="GET" />
            <FilledInput label="Label" value="Input Text" />
          </div>

          {/* Row 4 */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <UncontrolledToggle label="Custom group" />
            <div style={{ flex: 1 }}>
              <EmptyDropdown label="Group" />
            </div>
          </div>
        </div>

        {/* Section 4: Policy Set row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 235 }}>
            <EmptyDropdown label="Policy Set" />
          </div>

          {/* Try it Out button */}
          <button style={{
            background: '#575655',
            color: 'white',
            border: '2px solid #575655',
            padding: '8px 16px',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            cursor: 'pointer',
            height: 40,
          }}>
            <span style={{
              fontFamily: F_BODY,
              fontSize: 14,
              fontWeight: 400,
              color: 'white',
            }}>
              Try it Out
            </span>
            <FocusIcon />
          </button>
        </div>

        {/* Section 5: Code panels */}
        <div style={{ display: 'flex', gap: 16 }}>

          {/* Left panel — Example Request Body */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{
              fontFamily: '"Arial", sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#3f3e3d',
            }}>
              Example Request Body
            </span>
            <div style={{
              background: '#272625',
              padding: '16px 24px',
              minHeight: 300,
              fontFamily: F_MONO,
              fontSize: 14,
              color: 'white',
            }}>
              <span style={{ color: '#989898' }}>1</span>
            </div>
          </div>

          {/* Right panel — Example Response */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{
              fontFamily: '"Arial", sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#3f3e3d',
            }}>
              Example Response
            </span>
            <div style={{
              background: '#272625',
              padding: '16px 24px',
              minHeight: 300,
              display: 'flex',
              gap: 8,
            }}>
              {/* Line numbers */}
              <div style={{
                fontFamily: F_MONO,
                fontSize: 12,
                color: '#989898',
                textAlign: 'right',
                width: 21,
                lineHeight: '20px',
                flexShrink: 0,
                userSelect: 'none',
              }}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <div key={n}>{n}</div>
                ))}
              </div>

              {/* Syntax content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: F_MONO,
                fontSize: 12,
                lineHeight: '20px',
              }}>
                <div><span style={{ color: '#fcd515' }}>[</span></div>
                <div><span style={{ color: '#fc15e9' }}>{'  {'}</span></div>
                <div>
                  <span style={{ color: '#94ecff' }}>{'    "priority": '}</span>
                  <span style={{ color: '#9aff94' }}>0</span>
                  <span style={{ color: 'white' }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#94ecff' }}>{'    "dashboardId": '}</span>
                  <span style={{ color: '#ff9a94' }}>"string"</span>
                  <span style={{ color: 'white' }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#94ecff' }}>{'    "applicationContextKey": '}</span>
                  <span style={{ color: '#ff9a94' }}>"string"</span>
                  <span style={{ color: 'white' }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#94ecff' }}>{'    "userRole": '}</span>
                  <span style={{ color: '#ff9a94' }}>"string"</span>
                  <span style={{ color: 'white' }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#94ecff' }}>{'    "accessMode": '}</span>
                  <span style={{ color: '#ff9a94' }}>"string"</span>
                  <span style={{ color: 'white' }}>,</span>
                </div>
                <div>
                  <span style={{ color: '#94ecff' }}>{'    "default": '}</span>
                  <span style={{ color: '#ff9a94' }}>true</span>
                  <span style={{ color: 'white' }}>,</span>
                </div>
                <div><span style={{ color: '#fc15e9' }}>{'  }'}</span></div>
                <div><span style={{ color: '#fcd515' }}>]</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ── Page root ────────────────────────────────────────────────────────────────

export default function DataSourcesPage() {
  const [selectedCard, setSelectedCard] = useState('knowledge-retrieval')

  return (
    <div style={{
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      background: '#f2f2f2',
      fontFamily: F_BODY,
      overflow: 'hidden',
    }}>
      <NavBar />
      <div style={{
        flex: 1,
        display: 'flex',
        gap: 8,
        padding: '8px 8px 0',
        minHeight: 0,
        overflow: 'hidden',
      }}>
        <LeftNav selectedCard={selectedCard} onSelectCard={setSelectedCard} />
        <MainBoardlet />
      </div>
    </div>
  )
}
