const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};
exports.comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
