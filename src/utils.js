import fs from 'fs';
import path from 'path';

export function detectExistingSkills(targetDir = process.cwd()) {
  const claudeSkills = [];
  const cursorRules = [];

  // Check for Claude skills
  const claudeSkillsDir = path.join(targetDir, '.claude', 'skills');
  if (fs.existsSync(claudeSkillsDir)) {
    const dirs = fs.readdirSync(claudeSkillsDir);
    dirs.forEach(dir => {
      const skillFile = path.join(claudeSkillsDir, dir, 'SKILL.md');
      if (fs.existsSync(skillFile)) {
        claudeSkills.push(dir);
      }
    });
  }

  // Check for Cursor rules
  const cursorRulesDir = path.join(targetDir, '.cursor', 'rules');
  if (fs.existsSync(cursorRulesDir)) {
    const files = fs.readdirSync(cursorRulesDir);
    files.forEach(file => {
      if (file.endsWith('.mdc')) {
        cursorRules.push(file.replace('.mdc', ''));
      }
    });
  }

  return { claudeSkills, cursorRules };
}

export function deleteSkillFiles(platform, skill, targetDir = process.cwd()) {
  const deletedFiles = [];

  if (platform === 'claude') {
    const skillDir = path.join(targetDir, '.claude', 'skills', skill);
    if (fs.existsSync(skillDir)) {
      fs.rmSync(skillDir, { recursive: true, force: true });
      deletedFiles.push(skillDir);
    }
  } else if (platform === 'cursor') {
    const ruleFile = path.join(targetDir, '.cursor', 'rules', `${skill}.mdc`);
    if (fs.existsSync(ruleFile)) {
      fs.unlinkSync(ruleFile);
      deletedFiles.push(ruleFile);
    }
  }

  return deletedFiles;
}

export function deleteAllSkills(targetDir = process.cwd()) {
  const deletedFiles = [];

  // Delete Claude skills
  const claudeSkillsDir = path.join(targetDir, '.claude', 'skills');
  if (fs.existsSync(claudeSkillsDir)) {
    fs.rmSync(claudeSkillsDir, { recursive: true, force: true });
    deletedFiles.push(claudeSkillsDir);
  }

  // Delete Cursor rules
  const cursorRulesDir = path.join(targetDir, '.cursor', 'rules');
  if (fs.existsSync(cursorRulesDir)) {
    fs.rmSync(cursorRulesDir, { recursive: true, force: true });
    deletedFiles.push(cursorRulesDir);
  }

  return deletedFiles;
}

export function formatDate(isoString) {
  if (!isoString) return 'Never';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
