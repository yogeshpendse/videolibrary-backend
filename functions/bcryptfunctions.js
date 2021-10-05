const bcrypt = require("bcryptjs");
async function hashthispassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  return hashedpassword;
}
const checkifpasswordsmatch = async (password, hashedpassword) =>
  await bcrypt.compare(password, hashedpassword);
module.exports = { hashthispassword, checkifpasswordsmatch };
