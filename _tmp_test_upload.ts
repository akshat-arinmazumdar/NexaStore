import fs from 'fs';
async function test() {
  const formData = new FormData();
  // Create a minimal 1x1 png in base64 to Blob
  const b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
  const b = Buffer.from(b64, 'base64');
  const blob = new Blob([b], { type: 'image/png' });
  formData.append('file', blob, 'test.png');

  // Need to bypass auth though…
}
