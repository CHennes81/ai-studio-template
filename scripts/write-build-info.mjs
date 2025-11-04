import { writeFileSync, mkdirSync } from 'node:fs';
const nowIso = new Date().toISOString();
const commit = (process.env.GITHUB_SHA || '').slice(0, 7) || 'local-dev';
const runNumber = process.env.GITHUB_RUN_NUMBER || '0';
const tag = (process.env.GITHUB_REF_NAME || '').startsWith('v') ? process.env.GITHUB_REF_NAME : '';
const buildVersion = process.env.BUILD_VERSION || (tag || `build-${runNumber}-${commit}`);
const payload = { version: buildVersion, commit, buildTime: nowIso,
  source: { tag: tag || null, runNumber, sha: process.env.GITHUB_SHA || null } };
mkdirSync('apps/web/src', { recursive: true });
writeFileSync('apps/web/src/buildInfo.ts', `export const buildInfo = ${JSON.stringify(payload, null, 2)} as const;\n`);
mkdirSync('apps/web/public', { recursive: true });
writeFileSync('apps/web/public/version.json', JSON.stringify(payload, null, 2));
console.log('[build-info] wrote buildInfo.ts and public/version.json');
