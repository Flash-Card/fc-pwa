export function createFile(data: string, type: string, name: string) {
  const blob = new Blob([data], { type });
  return new File([blob], name, { type });
}

export function share(data: ShareData) {
  if (navigator.canShare(data)) {
    try {
      navigator.share(data);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(error.name, error.message);
      }
    }
  }
}
