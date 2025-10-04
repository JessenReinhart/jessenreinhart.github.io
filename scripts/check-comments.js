import fs from 'fs';
import path from 'path';

const checkForComments = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('//') && !trimmed.includes('http://') && !trimmed.includes('https://')) {
      issues.push({
        file: filePath,
        line: index + 1,
        content: line
      });
    }
    
    if ((trimmed.includes('/*') || trimmed.includes('*/')) && !trimmed.includes('xmlns=') && !trimmed.includes('viewBox=')) {
      issues.push({
        file: filePath,
        line: index + 1,
        content: line
      });
    }
  });

  return issues;
};

const scanDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  let allIssues = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !['node_modules', '.git', 'dist', 'build', '.husky'].includes(file)) {
      allIssues = allIssues.concat(scanDirectory(filePath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const issues = checkForComments(filePath);
      allIssues = allIssues.concat(issues);
    }
  });

  return allIssues;
};

const issues = scanDirectory('.');

if (issues.length > 0) {
  console.log('❌ Comments found in the following files:');
  issues.forEach(issue => {
    console.log(`${issue.file}:${issue.line} - ${issue.content.trim()}`);
  });
  process.exit(1);
} else {
  console.log('✅ No comments found in TypeScript files');
}