// Persistence layer — all localStorage access is isolated here.
// Swapping to IndexedDB or a remote API only requires changes to this file.
import { state } from './state.js';

export function loadNotes() {
  try {
    const raw = localStorage.getItem('notes-app-v1');
    state.notes = raw ? JSON.parse(raw) : [];
  } catch {
    // Corrupted storage — start fresh rather than crash
    state.notes = [];
  }
}

export function saveNotesToStorage() {
  localStorage.setItem('notes-app-v1', JSON.stringify(state.notes));
}