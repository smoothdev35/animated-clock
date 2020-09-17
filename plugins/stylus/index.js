module.exports = {
  onBuild: async ({ utils: { run } }) => {
    await run.command(
    "stylus -w public/_includes/css/main.styl -o public/css/main.css"
    );
  },
};
