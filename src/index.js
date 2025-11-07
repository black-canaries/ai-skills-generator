import chalk from 'chalk';
import { promptUser } from './prompts.js';
import { generateClaudeSkills } from './generators/claude.js';
import { generateCursorRules } from './generators/cursor.js';

export async function main() {
  try {
    // Get user input
    const { platform, skills } = await promptUser();

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

  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('Prompt couldn\'t be rendered in the current environment'));
    } else {
      throw error;
    }
  }
}
