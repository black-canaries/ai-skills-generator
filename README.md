# AI Skills Generator

A powerful CLI tool to generate [Claude Agent Skills](https://docs.claude.com/en/docs/claude-code/skills) and [Cursor Project Rules](https://docs.cursor.com/context/rules) from pre-made, research-backed templates.

## Features

### Core Functionality
- 🤖 Generate **Claude Agent Skills** for Claude Code
- 🎯 Generate **Cursor Project Rules** for Cursor IDE
- 🔄 **Update existing skills** to latest template versions
- 🔁 **Reset individual skills** (delete and regenerate)
- 🗑️ **Reset all skills** (clean slate)
- 📋 **List generated skills** with creation/update timestamps
- 💾 **Automatic tracking** with .aiskills.json manifest

### Templates
- 📦 **9 Technology Templates** based on 2025 best practices:
  - JavaScript (ES2024+)
  - TypeScript (Strict Mode)
  - React (Hooks & Composition)
  - Next.js 15 (App Router & Server Components)
  - Tailwind CSS 4 (CSS-first Configuration)
  - TurboRepo (Monorepo Management)
  - Vite 6 (Build Tool)
  - React Native (New Architecture)
  - Expo SDK 54+ (Development Builds & Expo Router)

### Developer Experience
- 🎨 Interactive CLI with multi-select support
- 🎯 Context-aware menu (shows update/reset only when applicable)
- ⚠️ Safe operations with confirmation prompts
- 📊 Detailed progress and success messages
- 🚀 Production-ready templates

## Installation

### Global Installation (Recommended)

```bash
npm install -g ai-skills-generator
```

### Local Installation

```bash
npm install ai-skills-generator
```

### From Source

```bash
git clone https://github.com/yourusername/ai-skills-generator.git
cd ai-skills-generator
npm install
npm link
```

## Usage

Navigate to your project directory and run:

```bash
npx ai-skills
```

Or if installed globally:

```bash
ai-skills
```

### Interactive Prompts

The CLI will guide you through three simple steps:

1. **Select Platform**: Choose between Claude, Cursor, or both
2. **Select Skills**: Choose which technology templates to generate
3. **Confirm**: Review and confirm your selections

### Main Menu

The CLI now features an interactive main menu with the following options:

- **➕ Generate new skills/rules** - Create new skills/rules from templates
- **🔄 Update existing skills/rules** - Update existing skills to latest templates
- **🔁 Reset specific skill/rule** - Delete and regenerate a specific skill/rule
- **🗑️ Reset all skills/rules** - Delete all generated skills/rules
- **📋 List generated skills/rules** - View all generated skills with timestamps
- **❌ Exit** - Exit the CLI

### Example Session: Generate

```
🚀 Welcome to AI Skills Generator!

? What would you like to do? (Use arrow keys)
❯ ➕ Generate new skills/rules
  ❌ Exit

? Which platform would you like to generate for? (Use arrow keys)
❯ Claude Agent Skills
  Cursor Project Rules
  Both

? Select the skills/rules you want to include: (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯ ◉ JavaScript
  ◉ TypeScript
  ◉ React
  ◉ Next.js
  ◯ Tailwind CSS 4
  ◯ TurboRepo
  ◯ Vite
  ◯ React Native
  ◯ Expo

? Are you sure you want to generate these files? (Y/n)

📦 Generating files...

Generating Claude Agent Skills...
✓ Created 3 Claude skill(s)

✨ Generation complete!

Created files:
  - /path/to/project/.claude/skills/javascript/SKILL.md
  - /path/to/project/.claude/skills/typescript/SKILL.md
  - /path/to/project/.claude/skills/react/SKILL.md
```

### Example Session: Update

```
? What would you like to do?
❯ 🔄 Update existing skills/rules

? Select skills/rules to update:
❯ ◉ 🤖 typescript (claude)
  ◉ 🎯 react (cursor)

? This will overwrite existing files. Continue? (y/N)

🔄 Updating skills/rules...

Updating Claude Agent Skills...
✓ Updated 1 Claude skill(s)

Updating Cursor Project Rules...
✓ Updated 1 Cursor rule(s)

✨ Update complete!
```

### Example Session: List

```
? What would you like to do?
❯ 📋 List generated skills/rules

📋 Generated Skills/Rules:

🤖 Claude Agent Skills:
   • TypeScript
     Created: Nov 8, 2025, 10:30 AM
     Updated: Nov 8, 2025, 11:15 AM
   • React
     Created: Nov 8, 2025, 10:30 AM

🎯 Cursor Project Rules:
   • Next.js
     Created: Nov 8, 2025, 10:30 AM

Total: 3 skill(s)/rule(s)
```

## Generated Structure

### Claude Agent Skills

```
.claude/
└── skills/
    ├── javascript/
    │   └── SKILL.md
    ├── typescript/
    │   └── SKILL.md
    ├── react/
    │   └── SKILL.md
    └── ...
```

Each skill directory contains a `SKILL.md` file with:
- YAML frontmatter (name, description)
- Comprehensive guidance for that technology
- Code examples and best practices
- Common patterns and anti-patterns

### Cursor Project Rules

```
.cursor/
└── rules/
    ├── javascript.mdc
    ├── typescript.mdc
    ├── react.mdc
    └── ...
```

Each rule file is an `.mdc` file with:
- Frontmatter (description, globs, alwaysApply)
- Project-specific coding standards
- Technology-specific best practices
- Common patterns to follow

### Manifest File

The CLI automatically creates a `.aiskills.json` manifest file to track generated skills:

```json
{
  "version": "1.0.0",
  "generated": [
    {
      "platform": "claude",
      "skill": "typescript",
      "createdAt": "2025-11-08T10:30:00.000Z",
      "updatedAt": "2025-11-08T11:15:00.000Z"
    },
    {
      "platform": "cursor",
      "skill": "react",
      "createdAt": "2025-11-08T10:30:00.000Z",
      "updatedAt": "2025-11-08T10:30:00.000Z"
    }
  ],
  "lastUpdated": "2025-11-08T11:15:00.000Z"
}
```

This manifest enables:
- Tracking what skills have been generated
- Showing update/reset options only when applicable
- Displaying creation and update timestamps
- Managing skill lifecycle

**Note:** Add `.aiskills.json` to your `.gitignore` if you don't want to commit it.

## Available Templates

### JavaScript
- ES2024+ modern syntax
- Async/await patterns
- Error handling best practices
- Performance optimization

### TypeScript
- Strict mode configuration
- Utility types and generics
- Type-safe patterns
- Modern TypeScript 2025 features

### React
- Hooks and composition patterns
- Custom hooks best practices
- Performance optimization (memo, useCallback, useMemo)
- Component design patterns

### Next.js 15
- App Router conventions
- Server vs Client Components
- Server Actions
- Data fetching strategies
- Metadata and SEO

### Tailwind CSS 4
- CSS-first configuration
- Utility patterns
- Responsive design
- Dark mode support
- Performance optimization

### TurboRepo
- Monorepo structure
- Task pipeline configuration
- Caching strategies
- CI/CD integration

### Vite 6
- Build optimization
- Code splitting
- Plugin ecosystem
- Development workflow

### React Native
- New Architecture (Fabric + TurboModules)
- Performance patterns
- Navigation setup
- Animations with Reanimated

### Expo
- Expo SDK 54+
- Expo Router navigation
- EAS Build & Update
- Native features integration

## Technology Stack

- **Node.js** 18+
- **Inquirer** - Interactive CLI prompts
- **Chalk** - Terminal styling

## Development

### Project Structure

```
ai-skills-generator/
├── bin/
│   └── cli.js              # CLI entry point
├── src/
│   ├── index.js            # Main logic
│   ├── prompts.js          # Interactive prompts
│   ├── generators/
│   │   ├── claude.js       # Claude skills generator
│   │   └── cursor.js       # Cursor rules generator
│   └── templates/
│       ├── claude/         # Claude skill templates
│       │   ├── index.js
│       │   ├── javascript.js
│       │   ├── typescript.js
│       │   └── ...
│       └── cursor/         # Cursor rule templates
│           ├── index.js
│           ├── javascript.js
│           ├── typescript.js
│           └── ...
├── package.json
└── README.md
```

### Running Locally

```bash
npm install
npm start
```

### Adding New Templates

1. Create template file in `src/templates/claude/` or `src/templates/cursor/`
2. Export template string with proper format
3. Add to templates object in respective `index.js`
4. Add to available skills list in `src/prompts.js`

## Research & Best Practices

All templates are based on extensive research of 2025 best practices:

- **JavaScript/TypeScript**: Modern ES2024+ features, strict mode standards
- **React**: Latest hooks patterns, performance optimization techniques
- **Next.js 15**: App Router, Server Components, Server Actions
- **Tailwind CSS 4**: CSS-first configuration, new v4 features
- **TurboRepo**: Monorepo optimization, caching strategies
- **Vite 6**: Native tooling (Rolldown), build optimization
- **React Native**: New Architecture (enabled by default in 2025)
- **Expo SDK 54+**: Development Builds, Expo Router, EAS services

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)
- [Cursor Documentation](https://docs.cursor.com)
- All the amazing open-source communities maintaining these technologies

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-skills-generator/issues) page
2. Create a new issue with detailed information
3. Provide your Node.js version and OS information

## Roadmap

- [ ] Add more technology templates (Vue, Angular, Svelte, etc.)
- [ ] Custom template support
- [ ] Template validation
- [ ] Interactive template editor
- [ ] Template marketplace

---

Made with ❤️ for better AI-assisted development
