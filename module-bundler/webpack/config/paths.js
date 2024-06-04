const path = require("path");

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);

module.exports = {
  appBuild: resolveApp("build/g"),
  appPublic: resolveApp("public"),
  publicUrl: "/g/",
};
