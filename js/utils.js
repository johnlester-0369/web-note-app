// Pure utility functions — zero side effects, zero project imports.
// Isolated here so they can be unit-tested without a DOM or any app state.

// Grow textarea to fit content so the user never sees a scrollbar inside the field
export function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// Collision-resistant ID: timestamp base-36 + random suffix; no crypto dep needed here
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Relative label for the sidebar list — keeps UI scannable without full timestamps
export function formatDate(ts) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  const d = new Date(ts);
  if (days === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (days === 1) return 'Yesterday';
  if (days < 7)  return d.toLocaleDateString([], { weekday: 'short' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

// Full date shown in editor toolbar for context
export function formatDateFull(ts) {
  return new Date(ts).toLocaleDateString([], {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// Guard against XSS when injecting user content as innerHTML in the list
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Split on whitespace — empty string correctly returns 0 words
export function countWords(str) {
  const s = str.trim();
  return s === '' ? 0 : s.split(/\s+/).length;
}

// Must mirror the CSS 639px breakpoint exactly so JS and CSS agree on "mobile"
export function isMobile() { return window.innerWidth < 640; }