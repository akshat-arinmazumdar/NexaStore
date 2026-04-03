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

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('use client')) {
    let original = content;
    content = content.replace(/export const dynamic\s*=\s*['"][^'"]+['"];?/g, '');
    content = content.replace(/export const revalidate\s*=\s*\d+;?/g, '');
    content = content.replace(/export async function generateStaticParams.*?\{[\s\S]*?\}/g, '');
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log('Fixed client component:', file.replace(process.cwd(), '').replace(/\\/g, '/'));
    }
  }
});
