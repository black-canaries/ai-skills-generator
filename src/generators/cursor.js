import fs from 'fs';
import path from 'path';
import { getCursorTemplate } from '../templates/cursor/index.js';

export async function generateCursorRules(skills, targetDir = process.cwd()) {
  const rulesDir = path.join(targetDir, '.cursor', 'rules');

  // Create .cursor/rules directory if it doesn't exist
  if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir, { recursive: true });
  }

  const createdFiles = [];

  for (const skill of skills) {
    // Get template for this skill
    const template = getCursorTemplate(skill);

    // Write .mdc file
    const ruleFilePath = path.join(rulesDir, `${skill}.mdc`);
    fs.writeFileSync(ruleFilePath, template);
    createdFiles.push(ruleFilePath);
  }

  return createdFiles;
}
