// ToggleSwitch — Inspire Design System
//
// Props:
//   checked:   boolean          — controlled on/off state
//   onChange:  fn(checked)      — called when the user toggles (omit to make read-only)
//   disabled:  boolean
//   label:     string           — optional label shown to the left of the track
//   forcedState: string         — 'off-enabled' | 'on-enabled' | 'on-disabled' | 'off-disabled'
//                                  bypasses checked/disabled props (used by the showcase grid)

import { useRef, useState } from 'react'

// ─── Design tokens ────────────────────────────────────────────────────────────

const TRACK_BG = {
  'off-enabled':  '#878686',
  'on-enabled':   '#fcd515',
  'off-disabled': '#cfcece',
  'on-disabled':  '#cfcece',
}

const THUMB_BG = {
  'off-enabled':  '#ffffff', // white — sits on gray track
  'on-enabled':   '#272625', // near-black — sits on yellow track
  'off-disabled': '#ebe9e9',
  'on-disabled':  '#ebe9e9',
}

const TRACK_BORDER = {
  'off-enabled':  '#575655',
  'on-enabled':   '#575655',
  'off-disabled': '#b7b6b6',
  'on-disabled':  '#b7b6b6',
}

const LABEL_STYLE = {
  'off-enabled':  { color: '#3f3e3d', fontWeight: 400 },
  'on-enabled':   { color: '#000000', fontWeight: 600 },
  'off-disabled': { color: '#cfcece', fontWeight: 400 },
  'on-disabled':  { color: '#cfcece', fontWeight: 600 },
}

// Thumb x offset: 2px from left (off), 26px from left (on) within a 48×24 track
// Thumb is 20×20px with 2px top/bottom inset
const THUMB_X = { off: 2, on: 26 }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveState(checked, disabled) {
  if (disabled && checked)  return 'on-disabled'
  if (disabled && !checked) return 'off-disabled'
  if (checked)              return 'on-enabled'
  return 'off-enabled'
}

// ─── Static showcase toggle (no interaction) ──────────────────────────────────

function StaticToggle({ state, label }) {
  const on          = state.startsWith('on')
  const trackBg     = TRACK_BG[state]
  const trackBorder = TRACK_BORDER[state]
  const thumbBg     = THUMB_BG[state]
  const thumbX      = on ? THUMB_X.on : THUMB_X.off
  const labelSty    = LABEL_STYLE[state]

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {label && (
        <span style={{
          fontFamily: '"GermanedgeSansCn", "Arial Narrow", Arial, sans-serif',
          fontSize: '12px',
          lineHeight: '16px',
          whiteSpace: 'nowrap',
          ...labelSty,
        }}>
          {label}
        </span>
      )}
      <Track trackBg={trackBg} trackBorder={trackBorder} thumbBg={thumbBg} thumbX={thumbX} />
    </div>
  )
}

// ─── Track + Thumb (shared visual) ────────────────────────────────────────────

function Track({ trackBg, trackBorder, thumbBg, thumbX, transition }) {
  return (
    <div style={{
      position: 'relative',
      width: '48px',
      height: '24px',
      borderRadius: '12px',
      background: trackBg,
      boxShadow: `0 0 0 2px ${trackBorder}`,
      flexShrink: 0,
      transition: transition ? 'background 150ms ease, box-shadow 150ms ease' : undefined,
    }}>
      <div style={{
        position: 'absolute',
        top: '2px',
        left: `${thumbX}px`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: thumbBg,
        transition: transition ? 'left 150ms ease, background 150ms ease' : undefined,
      }} />
    </div>
  )
}

// ─── Interactive toggle ────────────────────────────────────────────────────────

function InteractiveToggle({ checked, onChange, disabled, label }) {
  const [isFocused, setIsFocused] = useState(false)
  const mouseDownRef = useRef(false)

  const state       = resolveState(checked, disabled)
  const on          = checked
  const trackBg     = TRACK_BG[state]
  const trackBorder = TRACK_BORDER[state]
  const thumbBg     = THUMB_BG[state]
  const thumbX      = on ? THUMB_X.on : THUMB_X.off
  const labelSty    = LABEL_STYLE[state]

  const handleClick = () => {
    if (!disabled && onChange) onChange(!checked)
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const handlers = {
    onClick:    handleClick,
    onKeyDown:  handleKeyDown,
    onMouseDown: () => { mouseDownRef.current = true },
    onMouseUp:   () => { mouseDownRef.current = false },
    onFocus:     () => { if (!mouseDownRef.current) setIsFocused(true) },
    onBlur:      () => { setIsFocused(false); mouseDownRef.current = false },
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {label && (
        // Reserve bold width so label never shifts layout when weight changes
        <span style={{ display: 'inline-grid' }}>
          <span style={{
            gridArea: '1/1',
            fontFamily: '"GermanedgeSansCn", "Arial Narrow", Arial, sans-serif',
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: 600,
            visibility: 'hidden',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }} aria-hidden="true">{label}</span>
          <span style={{
            gridArea: '1/1',
            fontFamily: '"GermanedgeSansCn", "Arial Narrow", Arial, sans-serif',
            fontSize: '12px',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            transition: 'color 120ms ease, font-weight 0ms',
            ...labelSty,
          }}>{label}</span>
        </span>
      )}

      {/* Focusable track wrapper */}
      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        {...handlers}
        style={{
          position: 'relative',
          display: 'inline-block',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <Track trackBg={trackBg} trackBorder={trackBorder} thumbBg={thumbBg} thumbX={thumbX} transition />

        {/* Focus ring — keyboard only.
            inset: -6px = 2px box-shadow stroke + 2px gap, matching the button focus pattern */}
        {isFocused && (
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: '-6px',
            border: '2px dashed #1677ff',
            borderRadius: '9999px',
            pointerEvents: 'none',
          }} />
        )}
      </div>
    </div>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

export default function ToggleSwitch({ checked, onChange, disabled = false, label, forcedState }) {
  if (forcedState) {
    return <StaticToggle state={forcedState} label={label} />
  }
  return (
    <InteractiveToggle
      checked={!!checked}
      onChange={onChange}
      disabled={disabled}
      label={label}
    />
  )
}

// Convenience wrapper with its own local state — drop-in for the interactive section
export function UncontrolledToggle({ defaultChecked = false, disabled = false, label }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <ToggleSwitch
      checked={checked}
      onChange={setChecked}
      disabled={disabled}
      label={label}
    />
  )
}
