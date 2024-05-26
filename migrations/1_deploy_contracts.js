const auth = artifacts.require("Auth");
const storage = artifacts.require("Storage");
const migrations = artifacts.require("migrations");
module.exports = function (deployer) {
  deployer.deploy(auth);
  deployer.deploy(storage);
  deployer.deploy(migrations);
};
