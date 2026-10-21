// Helpers for markup that came from WordPress.
export const cx = (...a) => a.filter(Boolean).join(' ');

// Re-creates original inline `onclick="..."` handlers (this === element).
export const inl = (code) => (event) => {
  // eslint-disable-next-line no-new-func
  return new Function('event', code).call(event.currentTarget, event);
};
