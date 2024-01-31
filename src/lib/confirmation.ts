export function confirmation(fn: () => void, message: string) {
  return () => {
    if (window.confirm(message)) fn();
  };
}
