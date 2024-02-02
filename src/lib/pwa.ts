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

declare global {
  interface Window {
    launchQueue: {
      setConsumer: (launchParams: any) => void;
    };
  }
}

export function checkQueue(handler: (file: unknown) => void) {
  if ("launchQueue" in window) {
    window.launchQueue.setConsumer(async (launchParams: any) => {
      const files = launchParams.files;
      for (const file of files) {
        const blob = await file.getFile();
        const text = await blob.text();
        handler(JSON.parse(text));
      }
    });
  }
}
