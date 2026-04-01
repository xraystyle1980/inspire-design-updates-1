// NcmDetailsPage.jsx
// NCM Details — Inspire Design System (ADK/Astronaut, light theme)
// Full-width application layout: nav bar + left floating nav boardlet + main boardlet

import { useState } from 'react'
import Button from './Button.jsx'

// ── Figma asset images (valid ~7 days from 2026-04-01) ──────────────────────
const MAP_IMAGE   = 'https://www.figma.com/api/mcp/asset/8a16b8e7-3272-4844-9c99-ab9929b4175d'
const THUMB_IMAGE = 'https://www.figma.com/api/mcp/asset/dc6e5d2e-a409-419d-95d9-ea8d7c92a7ae'

// ── Typography tokens ────────────────────────────────────────────────────────
const F_HEADLINE = '"GermanedgeSans", "Arial", sans-serif'
const F_BODY     = '"GermanedgeSansCn", "Arial Narrow", "Arial", sans-serif'

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

const ChevronUpIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path d="M11 6.5L6 1.5L1 6.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CalendarFieldIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <rect x="1" y="2.5" width="16" height="12.5" rx="1" stroke="#3f3e3d" strokeWidth="1.5"/>
    <line x1="1" y1="6.5" x2="17" y2="6.5" stroke="#3f3e3d" strokeWidth="1.5"/>
    <line x1="5"  y1="0.5" x2="5"  y2="3.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="0.5" x2="13" y2="3.5" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CheckboxBlankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="14" height="14" rx="1.5" stroke="#9e9d9d" strokeWidth="1.5"/>
  </svg>
)


// ── Shared style helpers ─────────────────────────────────────────────────────

const iconBtnStyle = {
  background: 'none', border: 'none', padding: 4,
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', lineHeight: 0,
}

// Field shell — bg + border shared by inputs, dropdowns, datepickers
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

// Filled input: floated label + value
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

// Empty dropdown: single placeholder label, chevron right
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

// Filled dropdown: floated label + selected value + chevron
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

// Date picker field: floated label + date value + calendar icon
function DateField({ label, value }) {
  return (
    <div style={{ ...fieldShell, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, padding: '8px 0 12px 16px' }}>
        <span style={labelSt}>{label}</span>
        <span style={valueSt}>{value}</span>
      </div>
      <div style={{ width: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CalendarFieldIcon />
      </div>
    </div>
  )
}

// Empty input: label as placeholder, no value
function EmptyInput({ label }) {
  return (
    <div style={{ ...fieldShell, alignItems: 'center' }}>
      <div style={{ flex: 1, padding: '0 8px 0 16px' }}>
        <span style={placeholderSt}>{label}</span>
      </div>
      <div style={{ width: 37, flexShrink: 0 }} />
    </div>
  )
}

// Checkbox + label
function CheckboxField({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 56, flex: 1, minWidth: 0 }}>
      <CheckboxBlankIcon />
      <span style={{ fontFamily: F_BODY, fontSize: 14, lineHeight: '18px', color: '#3f3e3d' }}>{label}</span>
    </div>
  )
}

// Two-column form row wrapper
function FormRow({ children }) {
  return (
    <div style={{ display: 'flex', gap: 16, width: '100%', flexShrink: 0 }}>
      {children}
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
      {/* Left group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <button style={iconBtnStyle} aria-label="Menu">
          <HamburgerIcon />
        </button>

        {/* Back + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={iconBtnStyle} aria-label="Back">
            <ArrowLeftIcon />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <button style={iconBtnStyle} aria-label="Home">
              <HomeIcon />
            </button>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>NCM</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#9e9d9d' }}>|</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>NC:002846</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#9e9d9d' }}>|</span>
            <span style={{ fontFamily: F_BODY, fontSize: 14, fontWeight: 700, color: '#3f3e3d' }}>
              General Information
            </span>
          </div>
        </div>

        {/* Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarNavIcon />
          <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#3f3e3d' }}>06/06/2022</span>
        </div>
      </div>

      {/* Right group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={iconBtnStyle} aria-label="Notifications"><BellIcon /></button>
        <button style={iconBtnStyle} aria-label="Settings"><SettingsIcon /></button>
        <button style={iconBtnStyle} aria-label="Search"><SearchIcon /></button>
        <span style={{ fontFamily: F_HEADLINE, fontSize: 24, fontWeight: 600, color: '#878686', marginLeft: 8 }}>
          NC-Item Details
        </span>
        <span style={{ fontFamily: F_HEADLINE, fontSize: 22, fontWeight: 700, color: 'rgba(0,0,0,0.8)', marginLeft: 8 }}>
          Edge.One
        </span>
      </div>
    </nav>
  )
}

// ── Left floating navigation boardlet ───────────────────────────────────────

const NAV_ITEMS = [
  { label: 'General Information', active: true },
  { label: 'Items' },
  { label: 'Teams' },
  { label: 'Findings' },
  { label: 'Actions' },
  { label: 'Costs' },
  { label: 'Comments' },
]

function NavItem({ item }) {
  const [hovered, setHovered] = useState(false)
  const bg     = item.active ? '#d4d3ce' : hovered ? '#f2f2f2' : 'transparent'
  const color  = item.active || hovered ? '#000000' : '#575655'
  const weight = item.active ? 600 : 400
  const accent = item.active ? '3px solid #000000' : '3px solid transparent'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 24px',
        fontFamily: F_BODY,
        fontSize: 14,
        lineHeight: '18px',
        color,
        fontWeight: weight,
        cursor: 'pointer',
        borderLeft: accent,
        background: bg,
        transition: 'background 80ms ease, color 80ms ease',
      }}
    >
      {item.label}
    </div>
  )
}

function LeftNav() {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside style={{
      width: 305,
      flexShrink: 0,
      background: 'white',
      boxShadow: 'var(--elevation-height)',
      borderRadius: '4px 4px 0 0',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'stretch',
      overflow: 'hidden',
    }}>
      {/* Sub-brand logo placeholder */}
      <div style={{ padding: '16px 80px 24px', background: 'white', flexShrink: 0 }}>
        <div style={{ height: 38, background: '#f2f2f2', borderRadius: 2 }} />
      </div>

      {/* NC ID header — clicking chevron collapses / expands the list */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 24px 8px',
          width: '100%',
          background: 'none', border: 'none', cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: F_HEADLINE, fontSize: 14, fontWeight: 700, color: '#3f3e3d' }}>
          NC: 002846
        </span>
        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {/* Nav items — collapsible; flex:1 + overflow:auto so list scrolls independently */}
      {expanded && (
        <nav style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      )}
    </aside>
  )
}

// ── Main boardlet ────────────────────────────────────────────────────────────

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
      {/* Boardlet header */}
      <div style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px 0 24px',
        flexShrink: 0,
        borderBottom: '1px solid #f2f2f2',
      }}>
        <span style={{ fontFamily: F_HEADLINE, fontSize: 18, fontWeight: 600, lineHeight: '24px', color: '#3f3e3d' }}>
          General Information
        </span>
        <button style={iconBtnStyle} aria-label="More options">
          <MoreIcon />
        </button>
      </div>

      {/* Form body */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', padding: '24px 0 0' }}>

          {/* Left form column */}
          <div style={{ flex: 1, minWidth: 0, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormRow>
              <FilledInput label="NC Number" value="002846" />
              <EmptyDropdown label="Status" />
            </FormRow>
            <FormRow>
              <FilledInput label="Entered by" value="002846" />
              <FilledInput label="Subject" value="002846" />
            </FormRow>
            <FormRow>
              <EmptyDropdown label="Event Type" />
              <EmptyDropdown label="NC Kind" />
            </FormRow>
            <FormRow>
              <EmptyDropdown label="Company Division" />
              <FilledDropdown label="Controlled by" value="Regular" />
            </FormRow>
            <FormRow>
              <DateField label="Start Date" value="11/06/2025" />
              <DateField label="End Date"   value="11/06/2025" />
            </FormRow>
            <FormRow>
              <CheckboxField label="Deadline Changed" />
              <DateField label="Deadline Date" value="11/06/2025" />
            </FormRow>
            <FormRow>
              <FilledInput label="Operated_en" value="002846" />
              <FilledInput label="fn2" value="002846" />
            </FormRow>
            <FormRow>
              <FilledInput label="fn3" value="002846" />
              <FilledInput label="fn4" value="002846" />
            </FormRow>
            <FormRow>
              <FilledInput label="fn5" value="002846" />
              <FilledInput label="fn6" value="002846" />
            </FormRow>
          </div>

          {/* Column divider — component-level, not a layout separator */}
          <div style={{ width: 1, background: '#e7e6e6', flexShrink: 0, alignSelf: 'stretch' }} />

          {/* Right form column */}
          <div style={{ flex: 1, minWidth: 0, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormRow>
              <EmptyDropdown label="Contact Person" />
              <EmptyInput label="Phone" />
            </FormRow>
            <FormRow>
              <EmptyInput label="Fax" />
              <EmptyInput label="Email" />
            </FormRow>

            {/* Upload Image — Ghost (tertiary) action */}
            <div>
              <Button variant="ghost" interactive label="Upload Image" />
            </div>

            {/* Image thumbnails */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{
                flex: 1, height: 214, background: '#dadbdd',
                overflow: 'hidden', position: 'relative',
              }}>
                <img
                  src={THUMB_IMAGE}
                  alt="Attachment 1"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                flex: 1, height: 214, background: '#dadbdd',
                overflow: 'hidden', position: 'relative',
              }}>
                <img
                  src={THUMB_IMAGE}
                  alt="Attachment 2"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer action bar — buttons span full width, divider floats between */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        paddingTop: 40,
      }}>
        <div style={{ flex: 1, display: 'flex' }}>
          <Button variant="secondary" interactive label="Reset" fullWidth noIcon />
        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          <Button variant="primary" interactive label="Save Changes" fullWidth noIcon />
        </div>
      </div>
    </main>
  )
}

// ── Page root ────────────────────────────────────────────────────────────────

export default function NcmDetailsPage() {
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
        <LeftNav />
        <MainBoardlet />
      </div>
    </div>
  )
}
