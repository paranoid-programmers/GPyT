module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
