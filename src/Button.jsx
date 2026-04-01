// Button — Inspire Design System
// Renders a forced visual state (no real interactivity) for showcase purposes.
// variant:     'primary' | 'secondary' | 'ghost'
// state:       'default' | 'hover' | 'focus' | 'active' | 'disabled'
// iconOnly:    boolean — renders a fully-rounded circle icon button
// interactive: boolean — real button with live hover/focus/active states

import { useState, useRef } from 'react'

const PlusIcon = ({ color }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// Reserves the bold (600) width at all times so switching font-weight never
// causes layout shift. Uses inline-grid to stack two spans in the same cell:
// one invisible bold copy (sets the container size) and one visible copy
// (renders at the actual current weight).
const labelStyle = {
  fontFamily: '"GermanedgeSansCn", "Arial Narrow", Arial, sans-serif',
  fontSize: '14px',
  lineHeight: '18px',
  whiteSpace: 'nowrap',
}

function BoldReservedLabel({ label, weight, color, transition }) {
  return (
    <span style={{ display: 'inline-grid' }}>
      {/* Invisible bold copy — holds the maximum width */}
      <span style={{ ...labelStyle, gridArea: '1/1', fontWeight: 600, visibility: 'hidden', userSelect: 'none' }} aria-hidden="true">
        {label}
      </span>
      {/* Visible copy — renders at the actual current weight */}
      <span style={{ ...labelStyle, gridArea: '1/1', fontWeight: weight, color, transition }}>
        {label}
      </span>
    </span>
  )
}

// Design tokens per variant × state
const tokens = {
  primary: {
    default:  { bg: '#fcd515', border: '#575655', text: '#3f3e3d', icon: '#3f3e3d', weight: 400 },
    hover:    { bg: '#fae164', border: '#6f6e6d', text: '#000000', icon: '#000000', weight: 400 },
    focus:    { bg: '#fae164', border: '#6f6e6d', text: '#000000', icon: '#000000', weight: 400 },
    active:   { bg: '#fff2b2', border: '#000000', text: '#000000', icon: '#000000', weight: 600 },
    disabled: { bg: '#f2f2f2', border: '#cfcece', text: '#b7b6b6', icon: '#b7b6b6', weight: 400 },
  },
  secondary: {
    default:  { bg: '#575655', border: '#575655', text: '#ffffff', icon: '#ffffff', weight: 400 },
    hover:    { bg: '#6f6e6d', border: '#6f6e6d', text: '#ffffff', icon: '#ffffff', weight: 400 },
    focus:    { bg: '#6f6e6d', border: '#6f6e6d', text: '#ffffff', icon: '#ffffff', weight: 400 },
    active:   { bg: '#cfcece', border: '#000000', text: '#000000', icon: '#000000', weight: 600 },
    disabled: { bg: '#f2f2f2', border: '#cfcece', text: '#b7b6b6', icon: '#b7b6b6', weight: 400 },
  },
  ghost: {
    default:  { bg: '#ffffff', border: '#e7e6e6', text: '#3f3e3d', icon: '#3f3e3d', weight: 400 },
    hover:    { bg: '#fafafa', border: '#e7e6e6', text: '#000000', icon: '#000000', weight: 400 },
    focus:    { bg: '#fafafa', border: 'transparent', text: '#000000', icon: '#000000', weight: 400 },
    active:   { bg: '#e7e6e6', border: 'transparent', text: '#000000', icon: '#000000', weight: 600 },
    disabled: { bg: 'transparent', border: '#e7e6e6', text: '#b7b6b6', icon: '#b7b6b6', weight: 400 },
  },
}

// Forced-state display button (the showcase grid)
export default function Button({ variant = 'primary', state = 'default', iconOnly = false, label, interactive = false, disabled = false, fullWidth = false, noIcon = false }) {
  if (interactive) return <InteractiveButton variant={variant} iconOnly={iconOnly} label={label} disabled={disabled} fullWidth={fullWidth} noIcon={noIcon} />

  const t = tokens[variant][state]
  const isFocus = state === 'focus'
  const buttonLabel = label || `${variant.charAt(0).toUpperCase() + variant.slice(1)} button`

  return (
    // Outer wrapper — provides relative positioning for the focus ring
    <div style={{ position: 'relative', display: 'inline-flex' }}>

      {/* Border + background shell — 4px padding creates the layered inset look */}
      <div
        style={{
          display: 'inline-flex',
          border: `2px solid ${t.border}`,
          background: t.bg,
          padding: '4px',
          borderRadius: iconOnly ? '36px' : '0px',
        }}
      >
        {/* Inner content area — rounded for icon-only, square for text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: iconOnly ? '12px' : '12px 16px',
            background: t.bg,
            borderRadius: iconOnly ? '32px' : '0px',
          }}
        >
          {!noIcon && <PlusIcon color={t.icon} />}
          {!iconOnly && (
            <BoldReservedLabel label={buttonLabel} weight={t.weight} color={t.text} />
          )}
        </div>
      </div>

      {/* Focus ring — dashed blue outline, sits just outside the button bounds */}
      {isFocus && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-4px',
            border: '2px dashed #1677ff',
            borderRadius: iconOnly ? '9999px' : '2px',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

// Real interactive button — tracks hover / keyboard-focus / active via event handlers
function InteractiveButton({ variant = 'primary', iconOnly = false, label, disabled = false, fullWidth = false, noIcon = false }) {
  const [isHovered, setIsHovered]   = useState(false)
  const [isFocused, setIsFocused]   = useState(false)
  const [isPressed, setIsPressed]   = useState(false)
  const mouseDownRef = useRef(false)

  // Disabled buttons lock to the disabled token — no interaction
  let state = 'default'
  if (disabled) {
    state = 'disabled'
  } else {
    if (isPressed)      state = 'active'
    else if (isFocused) state = 'focus'
    else if (isHovered) state = 'hover'
  }

  const t = tokens[variant][state]
  const buttonLabel = label || `${variant.charAt(0).toUpperCase() + variant.slice(1)} button`

  const handlers = disabled ? {} : {
    onMouseEnter:  () => setIsHovered(true),
    onMouseLeave:  () => { setIsHovered(false); setIsPressed(false) },
    onMouseDown:   () => { mouseDownRef.current = true; setIsPressed(true) },
    onMouseUp:     () => { mouseDownRef.current = false; setIsPressed(false) },
    onFocus:       () => { if (!mouseDownRef.current) setIsFocused(true) },
    onBlur:        () => { setIsFocused(false); mouseDownRef.current = false },
    onKeyDown: (e) => { if (e.key === ' ' || e.key === 'Enter') setIsPressed(true) },
    onKeyUp:   (e) => { if (e.key === ' ' || e.key === 'Enter') setIsPressed(false) },
  }

  return (
    <button
      {...handlers}
      disabled={disabled}
      aria-disabled={disabled}
      style={{
        position: 'relative',
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        appearance: 'none',
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Border + background shell */}
      <div
        style={{
          display: fullWidth ? 'flex' : 'inline-flex',
          flex: fullWidth ? 1 : undefined,
          border: `2px solid ${t.border}`,
          background: t.bg,
          padding: '4px',
          borderRadius: iconOnly ? '36px' : '0px',
          transition: 'background 80ms ease, border-color 80ms ease',
        }}
      >
        {/* Inner content area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: fullWidth ? 1 : undefined,
            gap: '8px',
            padding: iconOnly ? '12px' : '12px 16px',
            background: t.bg,
            borderRadius: iconOnly ? '32px' : '0px',
            transition: 'background 80ms ease',
          }}
        >
          {!noIcon && <PlusIcon color={t.icon} />}
          {!iconOnly && (
            <BoldReservedLabel label={buttonLabel} weight={t.weight} color={t.text} transition="color 80ms ease" />
          )}
        </div>
      </div>

      {/* Focus ring — only shown on keyboard focus */}
      {isFocused && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-4px',
            border: '2px dashed #1677ff',
            borderRadius: iconOnly ? '9999px' : '2px',
            pointerEvents: 'none',
          }}
        />
      )}
    </button>
  )
}
