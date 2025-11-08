import chalk from 'chalk';
import {
  promptMainAction,
  promptUser,
  promptUpdate,
  promptReset,
  promptResetAll,
  AVAILABLE_SKILLS
} from './prompts.js';
import { generateClaudeSkills } from './generators/claude.js';
import { generateCursorRules } from './generators/cursor.js';
import {
  getGeneratedSkills,
  removeFromManifest,
  clearManifest
} from './manifest.js';
import {
  deleteSkillFiles,
  deleteAllSkills,
  formatDate
} from './utils.js';

async function handleGenerate() {
  const userInput = await promptUser();
  if (!userInput) return; // User cancelled

  const { platform, skills } = userInput;

  console.log(chalk.cyan('\n📦 Generating files...\n'));

  const allCreatedFiles = [];

  // Generate based on platform selection
  if (platform === 'claude' || platform === 'both') {
    console.log(chalk.blue('Generating Claude Agent Skills...'));
    const claudeFiles = await generateClaudeSkills(skills);
    allCreatedFiles.push(...claudeFiles);
    console.log(chalk.green(`✓ Created ${claudeFiles.length} Claude skill(s)\n`));
  }

  if (platform === 'cursor' || platform === 'both') {
    console.log(chalk.blue('Generating Cursor Project Rules...'));
    const cursorFiles = await generateCursorRules(skills);
    allCreatedFiles.push(...cursorFiles);
    console.log(chalk.green(`✓ Created ${cursorFiles.length} Cursor rule(s)\n`));
  }

  // Summary
  console.log(chalk.green.bold('✨ Generation complete!\n'));
  console.log(chalk.cyan('Created files:'));
  allCreatedFiles.forEach((file) => {
    console.log(chalk.gray(`  - ${file}`));
  });
  console.log();
}

async function handleUpdate() {
  const skillsToUpdate = await promptUpdate();
  if (!skillsToUpdate) return; // User cancelled

  console.log(chalk.cyan('\n🔄 Updating skills/rules...\n'));

  const allUpdatedFiles = [];

  // Group by platform
  const claudeSkills = skillsToUpdate
    .filter(s => s.platform === 'claude')
    .map(s => s.skill);

  const cursorSkills = skillsToUpdate
    .filter(s => s.platform === 'cursor')
    .map(s => s.skill);

  // Update Claude skills
  if (claudeSkills.length > 0) {
    console.log(chalk.blue('Updating Claude Agent Skills...'));
    const claudeFiles = await generateClaudeSkills(claudeSkills);
    allUpdatedFiles.push(...claudeFiles);
    console.log(chalk.green(`✓ Updated ${claudeFiles.length} Claude skill(s)\n`));
  }

  // Update Cursor rules
  if (cursorSkills.length > 0) {
    console.log(chalk.blue('Updating Cursor Project Rules...'));
    const cursorFiles = await generateCursorRules(cursorSkills);
    allUpdatedFiles.push(...cursorFiles);
    console.log(chalk.green(`✓ Updated ${cursorFiles.length} Cursor rule(s)\n`));
  }

  // Summary
  console.log(chalk.green.bold('✨ Update complete!\n'));
  console.log(chalk.cyan('Updated files:'));
  allUpdatedFiles.forEach((file) => {
    console.log(chalk.gray(`  - ${file}`));
  });
  console.log();
}

async function handleReset() {
  const skillToReset = await promptReset();
  if (!skillToReset) return; // User cancelled

  const { platform, skill } = skillToReset;

  console.log(chalk.cyan(`\n🔁 Resetting ${skill} (${platform})...\n`));

  // Delete existing files
  const deletedFiles = deleteSkillFiles(platform, skill);

  // Regenerate
  let createdFiles = [];
  if (platform === 'claude') {
    createdFiles = await generateClaudeSkills([skill]);
  } else if (platform === 'cursor') {
    createdFiles = await generateCursorRules([skill]);
  }

  console.log(chalk.green.bold('\n✨ Reset complete!\n'));
  console.log(chalk.cyan('Regenerated:'));
  createdFiles.forEach((file) => {
    console.log(chalk.gray(`  - ${file}`));
  });
  console.log();
}

async function handleResetAll() {
  const confirmed = await promptResetAll();
  if (!confirmed) return; // User cancelled

  console.log(chalk.cyan('\n🗑️  Deleting all skills/rules...\n'));

  // Delete all files
  const deletedFiles = deleteAllSkills();

  // Clear manifest
  clearManifest();

  console.log(chalk.green.bold('✨ All skills/rules have been deleted!\n'));
  console.log(chalk.cyan('Deleted:'));
  deletedFiles.forEach((file) => {
    console.log(chalk.gray(`  - ${file}`));
  });
  console.log();
}

async function handleList() {
  const generated = getGeneratedSkills();

  if (generated.length === 0) {
    console.log(chalk.yellow('\n⚠️  No skills/rules have been generated yet.\n'));
    return;
  }

  console.log(chalk.cyan.bold('\n📋 Generated Skills/Rules:\n'));

  // Group by platform
  const claudeSkills = generated.filter(g => g.platform === 'claude');
  const cursorRules = generated.filter(g => g.platform === 'cursor');

  if (claudeSkills.length > 0) {
    console.log(chalk.blue.bold('🤖 Claude Agent Skills:'));
    claudeSkills.forEach(({ skill, createdAt, updatedAt }) => {
      const skillName = AVAILABLE_SKILLS.find(s => s.value === skill)?.name || skill;
      console.log(chalk.white(`   • ${skillName}`));
      console.log(chalk.gray(`     Created: ${formatDate(createdAt)}`));
      if (createdAt !== updatedAt) {
        console.log(chalk.gray(`     Updated: ${formatDate(updatedAt)}`));
      }
    });
    console.log();
  }

  if (cursorRules.length > 0) {
    console.log(chalk.blue.bold('🎯 Cursor Project Rules:'));
    cursorRules.forEach(({ skill, createdAt, updatedAt }) => {
      const skillName = AVAILABLE_SKILLS.find(s => s.value === skill)?.name || skill;
      console.log(chalk.white(`   • ${skillName}`));
      console.log(chalk.gray(`     Created: ${formatDate(createdAt)}`));
      if (createdAt !== updatedAt) {
        console.log(chalk.gray(`     Updated: ${formatDate(updatedAt)}`));
      }
    });
    console.log();
  }

  console.log(chalk.cyan(`Total: ${generated.length} skill(s)/rule(s)\n`));
}

export async function main() {
  try {
    const action = await promptMainAction();

    switch (action) {
      case 'generate':
        await handleGenerate();
        break;

      case 'update':
        await handleUpdate();
        break;

      case 'reset':
        await handleReset();
        break;

      case 'reset-all':
        await handleResetAll();
        break;

      case 'list':
        await handleList();
        break;

      case 'exit':
        console.log(chalk.cyan('\n👋 Goodbye!\n'));
        process.exit(0);
        break;

      default:
        console.log(chalk.red('\n❌ Unknown action\n'));
        process.exit(1);
    }

  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('Prompt couldn\'t be rendered in the current environment'));
    } else {
      throw error;
    }
  }
}
