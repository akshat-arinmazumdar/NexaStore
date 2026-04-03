const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else {
        filelist.push(dirFile);
      }
    } catch(e) {}
  });
  return filelist;
};

const allFiles = walkSync(path.join(process.cwd(), 'src')).filter(f => f.endsWith('page.tsx') || f.endsWith('route.ts'));

const missingFiles = [];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  let needsDynamic = !content.includes('export const dynamic = "force-dynamic"');
  let needsRevalidate = !content.includes('export const revalidate = 0');
  let isDynamicRoute = (file.includes('[id]') || file.includes('[slug]')) && file.endsWith('page.tsx');
  let needsStaticParams = isDynamicRoute && !content.includes('generateStaticParams');

  if (needsDynamic || needsRevalidate || needsStaticParams) {
    missingFiles.push(file);

    // Remove existing
    content = content.replace(/export const dynamic\s*=\s*['"][^'"]+['"];?/g, '');
    content = content.replace(/export const revalidate\s*=\s*\d+;?/g, '');
    
    if (needsStaticParams) {
        content = content.replace(/export async function generateStaticParams.*?\{[\s\S]*?\}/g, '');
    }

    const useClientRegex = /^(['"]use client['"];?\s*)/i;
    const match = content.match(useClientRegex);
    let useClientPart = '';
    if (match) {
        useClientPart = match[0];
        content = content.replace(useClientRegex, '');
    }

    let injection = `export const dynamic = "force-dynamic"\nexport const revalidate = 0\n`;
    if (isDynamicRoute) {
        injection += `export async function generateStaticParams() { return [] }\n`;
    }

    content = useClientPart + injection + "\n" + content.trimStart();
    fs.writeFileSync(file, content);
  }
});

console.log("FIXED_FILES:");
missingFiles.forEach(f => console.log(f.replace(process.cwd(), '').replace(/\\/g, '/')));
