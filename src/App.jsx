import { useState } from 'react'

const F_HEADLINE = '"GermanedgeSans", "Arial", sans-serif'
const F_BODY     = '"GermanedgeSansCn", "Arial Narrow", "Arial", sans-serif'
import Button from './Button.jsx'
import ToggleSwitch, { UncontrolledToggle } from './ToggleSwitch.jsx'
import Accordion from './Accordion.jsx'
import NcmDetailsPage from './NcmDetailsPage.jsx'
import DataSourcesPage from './DataSourcesPage.jsx'
import AppsLibraryPage from './AppsLibraryPage.jsx'
import SidebarNav from './SidebarNav.jsx'

const VARIANTS = [
  { key: 'primary',   label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'ghost',     label: 'Ghost' },
]

const STATES = [
  { key: 'default',  label: 'Default' },
  { key: 'hover',    label: 'Hover' },
  { key: 'focus',    label: 'Focus' },
  { key: 'active',   label: 'Active' },
  { key: 'disabled', label: 'Disabled' },
]

const TOGGLE_ROWS = [
  { key: 'off-enabled',  label: 'Off / Enabled' },
  { key: 'on-enabled',   label: 'On / Enabled' },
  { key: 'on-disabled',  label: 'On / Disabled' },
  { key: 'off-disabled', label: 'Off / Disabled' },
]

export default function App() {
  const [page, setPage] = useState('apps-library')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* Global navigation panel — persists across all pages */}
      <SidebarNav currentPage={page} onNavigate={setPage} />

      {/* Per-page content — each page owns its own scroll/overflow */}
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {page === 'ncm'           && <NcmDetailsPage />}
        {page === 'data-sources'  && <DataSourcesPage />}
        {page === 'apps-library'  && <AppsLibraryPage />}


        {page === 'showcase' && (
        <div style={{ flex: 1, overflow: 'auto' }}>
        <div className="page">
          <div className="container">

          {/* ── Page header ───────────────────────────────────────────────── */}
          <div style={{ marginBottom: '56px' }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700, color: '#3f3e3d', fontFamily: F_HEADLINE }}>
              Inspire Design System
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#6f6e6d', fontFamily: F_BODY }}>
              Components — all variants &amp; states
            </p>
          </div>

          {/* ── Buttons ───────────────────────────────────────────────────── */}
          <section id="section-buttons" style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#3f3e3d', fontFamily: F_HEADLINE }}>Buttons</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#6f6e6d', fontFamily: F_BODY }}>Primary, Secondary, and Ghost — text and icon-only variants</p>
            </div>

            {/* Interactive */}
            <div style={{ marginBottom: '12px' }}>
              <h3 style={subhead}>Interactive</h3>
              <p style={subtext}>Hover, click, or Tab to focus. Focus ring only appears on keyboard navigation.</p>
            </div>
            <div style={{ ...interactiveCard, marginBottom: '16px', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
              {/* Enabled variants */}
              <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {VARIANTS.map((v) => (
                  <div key={v.key} style={interactiveCell}>
                    <span style={variantLabel}>{v.label}</span>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Button variant={v.key} interactive />
                      <Button variant={v.key} interactive iconOnly />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ width: '100%', height: '1px', background: '#e7e6e6' }} />

              {/* Disabled variants */}
              <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {VARIANTS.map((v) => (
                  <div key={`${v.key}-disabled`} style={interactiveCell}>
                    <span style={variantLabel}>{v.label} / Disabled</span>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Button variant={v.key} interactive disabled />
                      <Button variant={v.key} interactive iconOnly disabled />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All States — accordion */}
            <Accordion title="All States — Primary, Secondary &amp; Ghost">
              <div style={{ overflowX: 'auto', padding: '0 24px' }}>
                <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={th({ width: 96, textAlign: 'left' })} />
                      {VARIANTS.map((v) => (
                        <th key={v.key} colSpan={2} style={th({ textAlign: 'center', paddingBottom: '12px' })}>
                          <span style={colLabel}>{v.label}</span>
                        </th>
                      ))}
                    </tr>
                    <tr>
                      <th style={th({ width: 96 })} />
                      {VARIANTS.map((v) => (
                        <>
                          <th key={`${v.key}-text`} style={th({ textAlign: 'center', paddingBottom: '16px', color: '#9e9d9d', fontWeight: 400, fontSize: '11px' })}>Text</th>
                          <th key={`${v.key}-icon`} style={th({ textAlign: 'center', paddingBottom: '16px', color: '#9e9d9d', fontWeight: 400, fontSize: '11px' })}>Icon</th>
                        </>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STATES.map((s, si) => (
                      <tr key={s.key}>
                        <td style={td({ paddingRight: '16px', verticalAlign: 'middle' })}>
                          <span style={{
                            display: 'inline-block', fontSize: '12px', fontWeight: 500,
                            color: s.key === 'disabled' ? '#b7b6b6' : '#3f3e3d',
                            background: s.key === 'focus' ? '#e8f0fe' : s.key === 'active' ? '#f0f0f0' : 'transparent',
                            borderRadius: '4px', padding: '2px 6px', whiteSpace: 'nowrap',
                          }}>
                            {s.label}
                          </span>
                        </td>
                        {VARIANTS.map((v) => (
                          <>
                            <td key={`${v.key}-${s.key}-text`} style={td({
                              textAlign: 'center',
                              background: cellBg(v.key, s.key),
                              borderRadius: si === 0 ? '8px 0 0 0' : si === STATES.length - 1 ? '0 0 0 8px' : '0',
                              padding: '20px 24px',
                            })}>
                              <Button variant={v.key} state={s.key} iconOnly={false} />
                            </td>
                            <td key={`${v.key}-${s.key}-icon`} style={td({
                              textAlign: 'center',
                              background: cellBg(v.key, s.key),
                              borderRadius: si === 0 ? '0 8px 0 0' : si === STATES.length - 1 ? '0 0 8px 0' : '0',
                              padding: '20px 24px',
                              borderRight: v.key !== 'ghost' ? '1px solid #e7e6e6' : 'none',
                            })}>
                              <Button variant={v.key} state={s.key} iconOnly={true} />
                            </td>
                          </>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion>
          </section>

          {/* ── Toggle Switch ──────────────────────────────────────────────── */}
          <section id="section-toggle" style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#3f3e3d', fontFamily: F_HEADLINE }}>Toggle Switch</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#6f6e6d', fontFamily: F_BODY }}>Enabled and disabled — with and without label</p>
            </div>

            {/* Interactive */}
            <div style={{ marginBottom: '12px' }}>
              <h3 style={subhead}>Interactive</h3>
              <p style={subtext}>Click or Tab + Space to toggle. Focus ring appears on keyboard navigation.</p>
            </div>
            <div style={{ ...interactiveCard, marginBottom: '16px' }}>
              <div style={interactiveCell}>
                <span style={variantLabel}>With Label</span>
                <UncontrolledToggle label="Field Label" />
              </div>
              <div style={interactiveCell}>
                <span style={variantLabel}>No Label</span>
                <UncontrolledToggle />
              </div>
              <div style={interactiveCell}>
                <span style={variantLabel}>Disabled Off</span>
                <UncontrolledToggle disabled label="Field Label" />
              </div>
              <div style={interactiveCell}>
                <span style={variantLabel}>Disabled On</span>
                <UncontrolledToggle defaultChecked disabled label="Field Label" />
              </div>
            </div>

            {/* All States — accordion */}
            <Accordion title="All States — Enabled &amp; Disabled">
              <div style={{ overflowX: 'auto', padding: '0 24px' }}>
                <table style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th style={th({ width: 140, textAlign: 'left' })} />
                      <th style={th({ textAlign: 'center', paddingBottom: '8px' })}>
                        <span style={colLabel}>With Label</span>
                      </th>
                      <th style={th({ textAlign: 'center', paddingBottom: '8px' })}>
                        <span style={colLabel}>No Label</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOGGLE_ROWS.map((row, i, arr) => (
                      <tr key={row.key}>
                        <td style={td({ paddingRight: '16px', verticalAlign: 'middle' })}>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: row.key.includes('disabled') ? '#b7b6b6' : '#3f3e3d', whiteSpace: 'nowrap' }}>
                            {row.label}
                          </span>
                        </td>
                        <td style={td({
                          textAlign: 'center', background: '#ffffff', padding: '20px 40px',
                          borderRadius: i === 0 ? '8px 0 0 0' : i === arr.length - 1 ? '0 0 0 8px' : '0',
                        })}>
                          <ToggleSwitch forcedState={row.key} label="Field Label" />
                        </td>
                        <td style={td({
                          textAlign: 'center', background: '#ffffff', padding: '20px 40px',
                          borderRadius: i === 0 ? '0 8px 0 0' : i === arr.length - 1 ? '0 0 8px 0' : '0',
                          borderLeft: '1px solid #f0f0f0',
                        })}>
                          <ToggleSwitch forcedState={row.key} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion>
          </section>

          </div>
        </div>
        </div>
        )}

      </div>
    </div>
  )
}

// ── Shared style helpers ──────────────────────────────────────────────────────

const subhead = { margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: '#3f3e3d', fontFamily: F_HEADLINE }
const subtext  = { margin: 0, fontSize: '13px', color: '#6f6e6d', fontFamily: F_BODY }
const variantLabel = { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e9d9d', marginBottom: '12px', fontFamily: F_BODY }
const colLabel = { fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f6e6d', fontFamily: F_BODY }

const interactiveCard = {
  display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center',
  background: '#ffffff', borderRadius: '4px', padding: '32px 40px', boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
}

const interactiveCell = {
  display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start',
}

function cellBg(variant, state) {
  if (state === 'disabled') return '#fafafa'
  return { primary: '#fffdf0', secondary: '#f8f8f8', ghost: '#ffffff' }[variant]
}

function th(extra = {}) {
  return { fontFamily: F_BODY, fontWeight: 600, fontSize: '13px', color: '#3f3e3d', padding: '8px 16px', border: 'none', background: 'transparent', ...extra }
}

function td(extra = {}) {
  return { padding: '16px', border: 'none', verticalAlign: 'middle', ...extra }
}
