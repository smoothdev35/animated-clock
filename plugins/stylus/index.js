module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command(
    "stylus public/_includes/css/main.styl -o public/css/main.css"
    );
  },
};
