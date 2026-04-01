// AppsLibraryPage.jsx
// Apps Library — Inspire Design System (ADK/Astronaut, light theme)

import { useState } from 'react'
import Button from './Button.jsx'
import { UncontrolledToggle } from './ToggleSwitch.jsx'

// ── Typography tokens ────────────────────────────────────────────────────────
const F_HEADLINE = '"GermanedgeSans", "Arial", sans-serif'
const F_BODY     = '"GermanedgeSansCn", "Arial Narrow", "Arial", sans-serif'

// ── App card data ────────────────────────────────────────────────────────────
const APPS = [
  { id: 'maciek-app',    name: "Maciek's App",    description: 'Namespace Management', status: 'Ready to work', version: '1.0.3' },
  { id: 'inventory-app', name: 'Inventory App',    description: 'Inventory Management', status: 'Ready to work', version: null   },
  { id: 'reporting-app', name: 'Reporting App',    description: 'Reporting & Analytics', status: 'Ready to work', version: null  },
  { id: 'scheduler-app', name: 'Scheduler App',    description: 'Task Scheduler',        status: 'Ready to work', version: null  },
  { id: 'workflow-app',  name: 'Workflow Engine',  description: 'Workflow Automation',   status: 'Ready to work', version: null  },
  { id: 'audit-app',     name: 'Audit Log Viewer', description: 'Compliance & Auditing', status: 'Ready to work', version: null  },
]

const VERSION_ROWS = [
  { version: '1.0.3', createdAt: '22 May 2024', createdBy: 'Maciek W.', description: 'Initial release', status: 'Unreleased' },
  { version: '1.0.2', createdAt: '18 May 2024', createdBy: 'Maciek W.', description: 'Bug fixes',        status: 'Live*'      },
  { version: '1.0.1', createdAt: '10 May 2024', createdBy: 'Maciek W.', description: 'Beta release',     status: 'Submitted'  },
]

const STATUS_COLORS = {
  'Unreleased': { bg: '#f2f2f2',  text: '#6f6e6d'  },
  'Live*':      { bg: '#d4edda',  text: '#1a6630'  },
  'Submitted':  { bg: '#fff3cd',  text: '#856404'  },
}

// ── Icons ────────────────────────────────────────────────────────────────────

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

const FilterIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
    <path d="M1 1h12M3 5h8M5.5 9h3" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const SmallAddIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

const MonitorIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="16" height="11" rx="1.5" stroke="#3f3e3d" strokeWidth="1.5"/>
    <line x1="6" y1="15" x2="12" y2="15" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="9" y1="12" x2="9" y2="15" stroke="#3f3e3d" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="6.25" stroke="#3aab4c" strokeWidth="1.5"/>
    <path d="M4 7l2 2 4-4" stroke="#3aab4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GroupingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="1" y="5" width="11" height="11" rx="1.5" stroke="#3f3e3d" strokeWidth="1.5"/>
    <rect x="6" y="1" width="11" height="11" rx="1.5" stroke="#3f3e3d" strokeWidth="1.5"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
    <path d="M2 1.5l10 6.5-10 6.5V1.5Z" stroke="#3f3e3d" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

// ── Shared style helpers ─────────────────────────────────────────────────────

const iconBtnStyle = {
  background: 'none', border: 'none', padding: 4,
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', lineHeight: 0,
}

// ── App Card ─────────────────────────────────────────────────────────────────

function AppCard({ app, isActive, onSelect }) {
  return (
    <div
      onClick={() => onSelect(app.id)}
      style={{
        position: 'relative',
        background: 'white',
        borderRadius: 4,
        boxShadow: 'var(--elevation-base)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
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

      {/* Monitor icon */}
      <div style={{
        width: 36,
        height: 36,
        background: '#f2f2f2',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginLeft: isActive ? 6 : 0,
      }}>
        <MonitorIcon />
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{
            fontFamily: F_HEADLINE,
            fontSize: 14,
            fontWeight: 700,
            color: '#3f3e3d',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {app.name}
          </span>
          {app.version && (
            <span style={{
              fontFamily: F_BODY,
              fontSize: 11,
              color: '#9e9d9d',
              whiteSpace: 'nowrap',
            }}>
              v{app.version}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CheckCircleIcon />
          <span style={{ fontFamily: F_BODY, fontSize: 12, color: '#3aab4c' }}>
            {app.status}
          </span>
        </div>
      </div>

      {/* More icon */}
      <button style={iconBtnStyle} aria-label="More options">
        <MoreIcon />
      </button>
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
            <span style={{ fontFamily: F_BODY, fontSize: 14, fontWeight: 700, color: '#3f3e3d' }}>
              Apps Library
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
          AppsLibrary
        </span>
        <span style={{ fontFamily: F_HEADLINE, fontSize: 22, fontWeight: 700, color: 'rgba(0,0,0,0.8)', marginLeft: 8 }}>
          Edge.One
        </span>
      </div>
    </nav>
  )
}

// ── Left Nav Boardlet ────────────────────────────────────────────────────────

function LeftNav({ selectedApp, onSelectApp }) {
  const [activeTab, setActiveTab] = useState('all-apps')
  const TABS = [
    { key: 'all-apps',   label: 'All Apps'   },
    { key: 'app-store',  label: 'App Store'  },
    { key: 'my-apps',    label: 'My Apps'    },
  ]

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
            Apps
          </span>
          <button style={{ ...iconBtnStyle, padding: 2 }} aria-label="Info">
            <InfoIcon />
          </button>
        </div>

        {/* Right action bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={iconBtnStyle} aria-label="Filter">
            <FilterIcon />
          </button>

          {/* Small circular Add button */}
          <button
            aria-label="Add app"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'inline-flex',
              outline: 'none',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#fcd515',
              border: '2px solid #575655',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SmallAddIcon />
            </div>
          </button>
        </div>
      </div>

      {/* Content Switcher — 3 tabs */}
      <div style={{ padding: '0 24px', flexShrink: 0, display: 'flex' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                height: 40,
                border: 'none',
                borderRadius: '2px 2px 0 0',
                cursor: 'pointer',
                background: isActive ? '#d4d3ce' : '#f2f2f2',
                borderBottom: isActive ? '2px solid #000000' : 'none',
                fontFamily: F_BODY,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#272625' : '#6f6e6d',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          )
        })}
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

      {/* App Card List */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '4px 6px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {APPS.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            isActive={selectedApp === app.id}
            onSelect={onSelectApp}
          />
        ))}
      </div>
    </aside>
  )
}

// ── Main Boardlet ────────────────────────────────────────────────────────────

function MainBoardlet({ selectedApp }) {
  const app = APPS.find(a => a.id === selectedApp) || APPS[0]
  const [activeTab, setActiveTab] = useState('installed-versions')

  const DETAIL_TABS = [
    { key: 'installed-versions',  label: 'Installed Versions'  },
    { key: 'versions-to-install', label: 'Versions To Install' },
    { key: 'changelog',           label: 'Changelog'           },
    { key: 'actions-log',         label: 'Actions log'         },
    { key: 'permissions',         label: 'Permissions'         },
  ]

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
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* ── App header ── */}
        <div style={{
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 20,
          borderBottom: 'none',
        }}>
          {/* Avatar */}
          <div style={{
            width: 56,
            height: 56,
            background: '#3f3e3d',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: F_HEADLINE,
              fontSize: 18,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
              MA
            </span>
          </div>

          {/* App info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
              <span style={{
                fontFamily: F_HEADLINE,
                fontSize: 20,
                fontWeight: 700,
                color: '#3f3e3d',
              }}>
                {app.name}
              </span>
              {app.version && (
                <span style={{
                  fontFamily: F_BODY,
                  fontSize: 13,
                  color: '#9e9d9d',
                }}>
                  v{app.version}
                </span>
              )}
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
              <span style={{ fontFamily: F_BODY, fontSize: 12, color: '#6f6e6d' }}>
                Updated: <strong style={{ color: '#3f3e3d' }}>22 May 2024</strong>
              </span>
              <span style={{ fontFamily: F_BODY, fontSize: 12, color: '#6f6e6d' }}>
                Created: <strong style={{ color: '#3f3e3d' }}>01 Jan 2024</strong>
              </span>
            </div>

            {/* Tag chips */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['Namespace Management', app.description].map((tag) => (
                <span key={tag} style={{
                  fontFamily: F_BODY,
                  fontSize: 12,
                  color: '#3f3e3d',
                  background: '#f2f2f2',
                  borderRadius: 2,
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <Button variant="ghost" interactive noIcon label="Edit Metadata" />
            <Button variant="primary" interactive noIcon label="Open App Composer" />
          </div>
        </div>

        {/* ── Description section ── */}
        <div style={{
          padding: '16px 32px',
          background: '#fafafa',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <GroupingIcon />
            <span style={{ fontFamily: F_HEADLINE, fontSize: 14, fontWeight: 700, color: '#3f3e3d' }}>
              wat ya want
            </span>
            <button style={iconBtnStyle} aria-label="Play">
              <PlayIcon />
            </button>
          </div>
          <p style={{
            fontFamily: F_BODY,
            fontSize: 14,
            color: '#6f6e6d',
            margin: 0,
          }}>
            lolz
          </p>
        </div>

        {/* ── Tabs ── */}
        <div style={{
          display: 'flex',
          padding: '0 32px',
          background: 'white',
          flexShrink: 0,
          marginTop: 8,
        }}>
          {DETAIL_TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #000000' : '2px solid transparent',
                  background: isActive ? '#d4d3ce' : '#f2f2f2',
                  cursor: 'pointer',
                  fontFamily: F_BODY,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#272625' : '#6f6e6d',
                  whiteSpace: 'nowrap',
                  borderRadius: '2px 2px 0 0',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── Versions table ── */}
        {activeTab === 'installed-versions' && (
          <div style={{ padding: '24px 32px', flex: 1 }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: F_BODY,
              fontSize: 14,
            }}>
              <thead>
                <tr>
                  {['Version', 'Created At', 'Created By', 'Description', 'Status', 'Actions'].map((col) => (
                    <th key={col} style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontFamily: F_BODY,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#9e9d9d',
                      borderBottom: '1px solid #e7e6e6',
                      whiteSpace: 'nowrap',
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VERSION_ROWS.map((row, i) => {
                  const badge = STATUS_COLORS[row.status] || { bg: '#f2f2f2', text: '#6f6e6d' }
                  return (
                    <tr key={row.version} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={tdSt}>
                        <span style={{ fontWeight: 600, color: '#3f3e3d' }}>{row.version}</span>
                      </td>
                      <td style={tdSt}>{row.createdAt}</td>
                      <td style={tdSt}>{row.createdBy}</td>
                      <td style={tdSt}>{row.description}</td>
                      <td style={tdSt}>
                        <span style={{
                          background: badge.bg,
                          color: badge.text,
                          borderRadius: 2,
                          padding: '3px 8px',
                          fontSize: 12,
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={tdSt}>
                        <button style={iconBtnStyle} aria-label="More actions">
                          <MoreIcon />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state for other tabs */}
        {activeTab !== 'installed-versions' && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
          }}>
            <span style={{ fontFamily: F_BODY, fontSize: 14, color: '#b7b6b6' }}>
              No content available
            </span>
          </div>
        )}

      </div>
    </main>
  )
}

// ── Page root ────────────────────────────────────────────────────────────────

const tdSt = {
  padding: '14px 12px',
  color: '#6f6e6d',
  fontFamily: '"GermanedgeSansCn", "Arial Narrow", "Arial", sans-serif',
  fontSize: 14,
  borderBottom: '1px solid #f0f0f0',
  verticalAlign: 'middle',
}

export default function AppsLibraryPage() {
  const [selectedApp, setSelectedApp] = useState('maciek-app')

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
        <LeftNav selectedApp={selectedApp} onSelectApp={setSelectedApp} />
        <MainBoardlet selectedApp={selectedApp} />
      </div>
    </div>
  )
}
