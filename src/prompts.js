import inquirer from 'inquirer';
import { hasGeneratedSkills, getGeneratedSkills } from './manifest.js';
import { detectExistingSkills } from './utils.js';

export const AVAILABLE_SKILLS = [
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'React', value: 'react' },
  { name: 'Next.js', value: 'nextjs' },
  { name: 'Tailwind CSS 4', value: 'tailwind' },
  { name: 'TurboRepo', value: 'turborepo' },
  { name: 'Vite', value: 'vite' },
  { name: 'React Native', value: 'react-native' },
  { name: 'Expo', value: 'expo' }
];

export async function promptMainAction() {
  console.log('\n🚀 Welcome to AI Skills Generator!\n');

  const hasSkills = hasGeneratedSkills();
  const choices = [
    { name: '➕ Generate new skills/rules', value: 'generate' }
  ];

  if (hasSkills) {
    choices.push(
      { name: '🔄 Update existing skills/rules', value: 'update' },
      { name: '🔁 Reset specific skill/rule', value: 'reset' },
      { name: '🗑️  Reset all skills/rules', value: 'reset-all' },
      { name: '📋 List generated skills/rules', value: 'list' }
    );
  }

  choices.push({ name: '❌ Exit', value: 'exit' });

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices
    }
  ]);

  return action;
}

export async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Which platform would you like to generate for?',
      choices: [
        { name: 'Claude Agent Skills', value: 'claude' },
        { name: 'Cursor Project Rules', value: 'cursor' },
        { name: 'Both', value: 'both' }
      ]
    },
    {
      type: 'checkbox',
      name: 'skills',
      message: 'Select the skills/rules you want to include:',
      choices: AVAILABLE_SKILLS,
      validate: (input) => {
        if (input.length === 0) {
          return 'You must select at least one skill/rule';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to generate these files?',
      default: true
    }
  ]);

  if (!answers.confirm) {
    console.log('\n❌ Generation cancelled.\n');
    return null;
  }

  return answers;
}

export async function promptUpdate() {
  const existing = detectExistingSkills();
  const allSkills = [];

  // Collect all existing skills with platform info
  existing.claudeSkills.forEach(skill => {
    allSkills.push({ platform: 'claude', skill });
  });
  existing.cursorRules.forEach(skill => {
    allSkills.push({ platform: 'cursor', skill });
  });

  if (allSkills.length === 0) {
    console.log('\n⚠️  No existing skills/rules found to update.\n');
    return null;
  }

  const choices = allSkills.map(({ platform, skill }) => ({
    name: `${platform === 'claude' ? '🤖' : '🎯'} ${skill} (${platform})`,
    value: { platform, skill },
    checked: true
  }));

  const { skillsToUpdate, confirm } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'skillsToUpdate',
      message: 'Select skills/rules to update:',
      choices,
      validate: (input) => {
        if (input.length === 0) {
          return 'You must select at least one skill/rule to update';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'This will overwrite existing files. Continue?',
      default: false
    }
  ]);

  if (!confirm) {
    console.log('\n❌ Update cancelled.\n');
    return null;
  }

  return skillsToUpdate;
}

export async function promptReset() {
  const existing = detectExistingSkills();
  const allSkills = [];

  existing.claudeSkills.forEach(skill => {
    allSkills.push({ platform: 'claude', skill });
  });
  existing.cursorRules.forEach(skill => {
    allSkills.push({ platform: 'cursor', skill });
  });

  if (allSkills.length === 0) {
    console.log('\n⚠️  No existing skills/rules found to reset.\n');
    return null;
  }

  const choices = allSkills.map(({ platform, skill }) => ({
    name: `${platform === 'claude' ? '🤖' : '🎯'} ${skill} (${platform})`,
    value: { platform, skill }
  }));

  const { skillToReset, confirm } = await inquirer.prompt([
    {
      type: 'list',
      name: 'skillToReset',
      message: 'Select skill/rule to reset:',
      choices
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'This will delete and regenerate the selected skill/rule. Continue?',
      default: false
    }
  ]);

  if (!confirm) {
    console.log('\n❌ Reset cancelled.\n');
    return null;
  }

  return skillToReset;
}

export async function promptResetAll() {
  const existing = detectExistingSkills();
  const totalSkills = existing.claudeSkills.length + existing.cursorRules.length;

  if (totalSkills === 0) {
    console.log('\n⚠️  No existing skills/rules found to reset.\n');
    return false;
  }

  console.log(`\n⚠️  This will delete all ${totalSkills} skill(s)/rule(s):\n`);
  if (existing.claudeSkills.length > 0) {
    console.log(`   Claude Skills: ${existing.claudeSkills.join(', ')}`);
  }
  if (existing.cursorRules.length > 0) {
    console.log(`   Cursor Rules: ${existing.cursorRules.join(', ')}`);
  }
  console.log();

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you absolutely sure you want to delete ALL skills/rules?',
      default: false
    }
  ]);

  return confirm;
}
