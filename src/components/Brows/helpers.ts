async function handleFile(file: File) {
  return new Promise((resolve, reject) => {
    function handleReadFile(this: FileReader) {
      try {
        const data = JSON.parse(this.result as string);
        resolve(data);
      } catch (error) {
        reject(error);
      }
      this.removeEventListener("load", handleReadFile);
    }
    const reader = new FileReader();
    reader.addEventListener("load", handleReadFile);
    reader.readAsText(file);
  });
}

export async function readFiles(files: FileList): Promise<any[]> {
  const res = [];
  for (const file of files) {
    res.push(handleFile(file));
  }
  return Promise.all(res);
}
