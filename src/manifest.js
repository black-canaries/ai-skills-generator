import fs from 'fs';
import path from 'path';

const MANIFEST_FILE = '.aiskills.json';

export function getManifestPath(targetDir = process.cwd()) {
  return path.join(targetDir, MANIFEST_FILE);
}

export function readManifest(targetDir = process.cwd()) {
  const manifestPath = getManifestPath(targetDir);

  if (!fs.existsSync(manifestPath)) {
    return {
      version: '1.0.0',
      generated: [],
      lastUpdated: null
    };
  }

  try {
    const content = fs.readFileSync(manifestPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading manifest:', error);
    return {
      version: '1.0.0',
      generated: [],
      lastUpdated: null
    };
  }
}

export function writeManifest(manifest, targetDir = process.cwd()) {
  const manifestPath = getManifestPath(targetDir);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

export function addToManifest(platform, skills, targetDir = process.cwd()) {
  const manifest = readManifest(targetDir);
  const timestamp = new Date().toISOString();

  skills.forEach(skill => {
    const existingIndex = manifest.generated.findIndex(
      item => item.platform === platform && item.skill === skill
    );

    if (existingIndex >= 0) {
      // Update existing entry
      manifest.generated[existingIndex].updatedAt = timestamp;
    } else {
      // Add new entry
      manifest.generated.push({
        platform,
        skill,
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }
  });

  manifest.lastUpdated = timestamp;
  writeManifest(manifest, targetDir);
}

export function removeFromManifest(platform, skill, targetDir = process.cwd()) {
  const manifest = readManifest(targetDir);
  manifest.generated = manifest.generated.filter(
    item => !(item.platform === platform && item.skill === skill)
  );
  manifest.lastUpdated = new Date().toISOString();
  writeManifest(manifest, targetDir);
}

export function getGeneratedSkills(platform = null, targetDir = process.cwd()) {
  const manifest = readManifest(targetDir);

  if (!platform) {
    return manifest.generated;
  }

  return manifest.generated.filter(item => item.platform === platform);
}

export function clearManifest(targetDir = process.cwd()) {
  const manifestPath = getManifestPath(targetDir);
  if (fs.existsSync(manifestPath)) {
    fs.unlinkSync(manifestPath);
  }
}

export function hasGeneratedSkills(targetDir = process.cwd()) {
  const manifest = readManifest(targetDir);
  return manifest.generated.length > 0;
}
