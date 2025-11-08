import fs from 'fs';
import path from 'path';
import { getClaudeTemplate } from '../templates/claude/index.js';
import { addToManifest } from '../manifest.js';

export async function generateClaudeSkills(skills, targetDir = process.cwd()) {
  const skillsDir = path.join(targetDir, '.claude', 'skills');

  // Create .claude/skills directory if it doesn't exist
  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  const createdFiles = [];

  for (const skill of skills) {
    const skillDir = path.join(skillsDir, skill);

    // Create skill directory
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }

    // Get template for this skill
    const template = getClaudeTemplate(skill);

    // Write SKILL.md file
    const skillFilePath = path.join(skillDir, 'SKILL.md');
    fs.writeFileSync(skillFilePath, template);
    createdFiles.push(skillFilePath);
  }

  // Update manifest
  addToManifest('claude', skills, targetDir);

  return createdFiles;
}
