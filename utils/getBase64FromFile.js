export function getBase64FromFile(file, handleBase64) {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("loadend", () => {
    handleBase64(reader.result);
  });
}

export function getBase64FromFiles(files, handleBase64) {
  if (!files) return;
  files.map((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      let base64 = e.target.result;
      handleBase64(base64);
    });
    reader.readAsDataURL(file);
  });
}
