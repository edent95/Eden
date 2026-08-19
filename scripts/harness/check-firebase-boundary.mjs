import { fail, pass, read } from './lib.mjs';

const expectedProject = 'eden-tan';
const forbiddenProject = 'poker-power-card-3abea';
const checks = [
  ['.firebaserc', [expectedProject]],
  ['package.json', [`--project ${expectedProject}`]],
  ['functions/index.js', [`${expectedProject}-default-rtdb`]],
  ['services/penneyLeaderboard.ts', [`${expectedProject}-default-rtdb`]],
  ['services/penneyMini.ts', [`asia-southeast1-${expectedProject}.cloudfunctions.net`]],
];

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

if (problems.length > 0) fail('Firebase project boundary check failed:', problems);
else pass(`${checks.length} Firebase targets use the dedicated ${expectedProject} project`);
