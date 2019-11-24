const { scopePrefixer } = require('../../dist/index');
const { join } = require('path');
const fs = require('fs').promises;

const PKG = join(__dirname, 'sample-pkg.json');

afterAll(async () => {
  await fs.writeFile(
    PKG,
    JSON.stringify(
      {
        name: 'stuff'
      },
      null,
      2
    ) + '\n'
  );
});

describe('testing outer scopePrefixer function', () => {
  test('testing with all params', async () => {
    await scopePrefixer('@billy', PKG);
    const pkg = JSON.parse((await fs.readFile(PKG)).toString());
    expect(pkg.name).toBe('@billy/stuff');
  });
});
