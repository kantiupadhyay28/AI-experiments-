// Shared design tokens
export const B = {
  bg:      '#08111C',
  surf:    '#0F2235',
  card:    '#162E48',
  border:  'rgba(100,160,220,0.1)',
  accent:  '#18C89C',
  gold:    '#EAA83C',
  purple:  '#9B80D4',
  red:     '#E85C56',
  text:    '#D8EAF8',
  muted:   '#4A6680',
  success: '#22D08A',
  dim:     '#1E3450',
}

export const ph = { padding: '0 22px' }

export const phlabel = {
  fontSize: 10.5, fontWeight: 700,
  letterSpacing: '0.08em', textTransform: 'uppercase',
  color: '#4A6680',
}

export function phBtn(bg, col = '#fff') {
  return {
    display: 'block', width: '100%', padding: '14px',
    borderRadius: 16, background: bg, color: col,
    fontSize: 15, fontWeight: 700, textAlign: 'center',
    border: 'none', cursor: 'pointer',
    fontFamily: 'system-ui, sans-serif',
    transition: 'opacity 0.15s',
  }
}
