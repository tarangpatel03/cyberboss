const fs = require('fs');
const path = require('path');

const aliases = {
  '@components': 'src/components',
  '@screens': 'src/screens',
  '@utils': 'src/utils',
  '@config': 'src/config',
  '@services': 'src/services',
  '@hooks': 'src/hooks',
  '@redux': 'src/redux',
  '@models': 'src/models',
  '@navigation': 'src/navigation',
  '@locale': 'src/locale',
  '@assets': 'src/assets',
};

function getAlias(filePath, importPath) {
  const fileDir = path.dirname(filePath);
  const resolvedPath = path.resolve(fileDir, importPath);
  const relativePath = path.relative(path.join(process.cwd(), 'src'), resolvedPath);
  
  for (const [alias, dir] of Object.entries(aliases)) {
    if (resolvedPath.includes(path.join(process.cwd(), dir))) {
      const remaining = path.relative(path.join(process.cwd(), dir), resolvedPath);
      return `${alias}/${remaining}`;
    }
  }
  return null;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  const importRegex = /import\s+([^;]+)\s+from\s+['"]([.\/]+[^'"]+)['"]/g;
  
  content = content.replace(importRegex, (match, imports, importPath) => {
    if (importPath.startsWith('.')) {
      const alias = getAlias(filePath, importPath);
      if (alias) {
        modified = true;
        return `import ${imports} from '${alias}'`;
      }
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.')) {
      count += walkDir(fullPath);
    } else if ((file.endsWith('.tsx') || file.endsWith('.ts')) && !file.includes('.test.')) {
      if (processFile(fullPath)) {
        console.log(`✓ Updated: ${fullPath}`);
        count++;
      }
    }
  });
  
  return count;
}

const updated = walkDir(path.join(process.cwd(), 'src'));
console.log(`\nTotal files updated: ${updated}`);
