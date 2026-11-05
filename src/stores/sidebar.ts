import { atom } from "nanostores";

export const $sidebarOpen = atom(true);

type Listener = () => void;
const toggleListeners = new Set<Listener>();

export function requestSidebarToggle() {
  for (const listener of toggleListeners) listener();
}

export function onSidebarToggleRequest(listener: Listener) {
  toggleListeners.add(listener);
  return () => {
    toggleListeners.delete(listener);
  };
}
