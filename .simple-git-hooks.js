module.exports = {
  'pre-commit': 'pnpm exec lint-staged',
  'commit-msg': 'pnpm exec tsx ./scripts/verify-commit.ts',
  'pre-push': 'pnpm exec format',
};
