import { javascriptTemplate } from './javascript.js';
import { typescriptTemplate } from './typescript.js';
import { reactTemplate } from './react.js';
import { nextjsTemplate } from './nextjs.js';
import { tailwindTemplate } from './tailwind.js';
import { turborepoTemplate } from './turborepo.js';
import { viteTemplate } from './vite.js';
import { reactNativeTemplate } from './react-native.js';
import { expoTemplate } from './expo.js';

const templates = {
  javascript: javascriptTemplate,
  typescript: typescriptTemplate,
  react: reactTemplate,
  nextjs: nextjsTemplate,
  tailwind: tailwindTemplate,
  turborepo: turborepoTemplate,
  vite: viteTemplate,
  'react-native': reactNativeTemplate,
  expo: expoTemplate
};

export function getCursorTemplate(skill) {
  const template = templates[skill];
  if (!template) {
    throw new Error(`Template not found for skill: ${skill}`);
  }
  return template;
}
