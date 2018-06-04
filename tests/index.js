const config = require("./gulp.config")();
const {helpers, emailSrc} = config;

test("non ASCII characters", () => { // TODO https://www.quora.com/How-do-I-detect-non-ASCII-characters-in-a-file
  const emailFiles = helpers.walkSync(`.${emailSrc}`, []);
  emailFiles.forEach((file) => {
    if (file) {
      const unAscciiChars = /[^\x00-\x7F]+/.test(file);
      expect(unAscciiChars).toBe(false);
    }
  });
});
