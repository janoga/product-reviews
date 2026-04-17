const config = {
  '*.{ts,tsx,js,mjs,cjs}': ['eslint --fix --max-warnings 0', 'prettier --write'],
  '*.{json,md,css,yaml,yml}': ['prettier --write'],
};

export default config;
