const formatUserData = (user) => {
  const userData = { ...user };
  delete userData.passwordHash;
  delete userData.__v;
  return userData;
};

module.exports = {
  formatUserData,
};
