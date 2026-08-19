import { fail, pass, read } from './lib.mjs';

const expectedProject = 'eden-tan';
const forbiddenProject = 'poker-power-card-3abea';
const checks = [
  ['.firebaserc', [expectedProject]],
  ['package.json', [`--project ${expectedProject}`]],
  ['functions/index.js', [`${expectedProject}-default-rtdb`]],
  ['services/penneyLeaderboard.ts', [`${expectedProject}-default-rtdb`]],
];
const compatibilityFile = 'services/penneyMini.ts';
const compatibilityEndpoint = `asia-southeast1-${forbiddenProject}.cloudfunctions.net`;

const problems = [];

for (const [file, required] of checks) {
  const source = read(file);
  for (const value of required) {
    if (!source.includes(value)) problems.push(`${file} is missing ${value}`);
  }
  if (source.includes(forbiddenProject)) {
    problems.push(`${file} still points at the Poker Firebase project`);
  }
}

const compatibilitySource = read(compatibilityFile);
if (!compatibilitySource.includes(compatibilityEndpoint)) {
  problems.push(`${compatibilityFile} is missing the documented temporary compatibility endpoint`);
}

if (problems.length > 0) fail('Firebase project boundary check failed:', problems);
else pass(`${checks.length} Firebase targets use ${expectedProject}; the single documented Mini API compatibility bridge is intact`);
