const CryptoToken = artifacts.require("CryptoToken");

contract("CryptoToken", (accounts) => {
  let cryptoToken;
  const [owner, addr1, addr2] = accounts;

  beforeEach(async () => {
    cryptoToken = await CryptoToken.new();
  });

  it("should send tokens correctly", async () => {
    await cryptoToken.mint(addr1, 1000);
    await cryptoToken.send(addr2, 500, { from: addr1 });
    assert.equal(await cryptoToken.balances(addr1), 500);
    assert.equal(await cryptoToken.balances(addr2), 500);
  });

  it("should mint tokens correctly", async () => {
    await cryptoToken.mint(addr1, 1000);
    assert.equal(await cryptoToken.balances(addr1), 1000);
  });

  it("should not allow sending tokens when balance is insufficient", async () => {
    try {
      await cryptoToken.send(addr2, 500, { from: addr1 });
      assert.fail("The send should not be successful");
    } catch (err) {
      assert.include(err.message, "Insufficient balance");
    }
  });

  it("should burn tokens correctly", async () => {
    await cryptoToken.mint(addr1, 1000);
    await cryptoToken.burn(500, { from: addr1 });
    assert.equal(await cryptoToken.balances(addr1), 500);
  });

  it("should not allow burning more tokens than the balance", async () => {
    try {
      await cryptoToken.burn(1000, { from: addr1 });
      assert.fail("The burn should not be successful");
    } catch (err) {
      assert.include(err.message, "Insufficient balance");
    }
  });
});
