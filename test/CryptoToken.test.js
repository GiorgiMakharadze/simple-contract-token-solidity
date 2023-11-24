const CryptoToken = artifacts.require("CryptoToken");

contract("CryptoToken", (accounts) => {
  let cryptoToken;
  const [owner, addr1, addr2] = accounts;

  beforeEach(async () => {
    cryptoToken = await CryptoToken.new();
  });

  it("should set the right minter", async () => {
    assert.equal(await cryptoToken.minter(), owner);
  });

  it("should mint tokens correctly", async () => {
    await cryptoToken.mint(addr1, 1000);
    assert.equal(await cryptoToken.balances(addr1), 1000);
  });

  it("should only allow minter to mint tokens", async () => {
    try {
      await cryptoToken.mint(addr1, 1000, { from: addr2 });
      assert.fail("The mint should not be successful");
    } catch (err) {
      assert.include(err.message, "Only minter can mint tokens");
    }
  });
});
