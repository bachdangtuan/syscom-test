export function saveArrayBuffer({arrayBuffer, fileName, mimeType}) {
  const blob = new Blob([arrayBuffer], {type: mimeType});
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', blobUrl);
  a.setAttribute('style', 'display: none;');
  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}
