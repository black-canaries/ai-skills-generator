import inquirer from 'inquirer';

const AVAILABLE_SKILLS = [
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

export async function promptUser() {
  console.log('\n🚀 Welcome to AI Skills Generator!\n');

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
    process.exit(0);
  }

  return answers;
}
