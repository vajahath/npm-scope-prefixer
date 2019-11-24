const {
  extractName,
  prefixScope,
  readPackageJson,
  DEFAULT_PKG_PATH,
  updateFile
} = require('../dist/utils');
const { join, resolve } = require('path');
const fs = require('fs').promises;

describe('testing default package path', () => {
  test('should be the root package.json', () => {
    expect(DEFAULT_PKG_PATH).toBe(resolve(__dirname, '..', 'package.json'));
  });
});

describe('testing package name extractor', () => {
  test('testing with scoped package', () => {
    expect(extractName('@scope/package')).toBe('package');
  });
  test('testing with un-scoped package', () => {
    expect(extractName('package')).toBe('package');
  });
  test('testing with un-scoped package with -', () => {
    expect(extractName('package-name')).toBe('package-name');
  });
});

describe('testing scope prefixer', () => {
  test('testing with @ in scope', () => {
    expect(prefixScope('@scope', 'package')).toBe('@scope/package');
  });
  test('testing without @ in scope', () => {
    expect(prefixScope('scope', 'package')).toBe('@scope/package');
  });
});

describe('testing package.json reader', () => {
  test('testing default params', async () => {
    // should read this packages package.json file
    const pkg = await readPackageJson();
    expect(typeof pkg).toBe('object');
    expect(pkg.name).toBe('@vaju/npm-scope-prefixer');
  });

  test('testing provided params - type 1', async () => {
    const pkg = await readPackageJson('tests/_sample-pkg.json');
    expect(typeof pkg).toBe('object');
    expect(pkg.name).toBe('sample-package');
  });

  test('testing provided params - type 2', async () => {
    const pkg = await readPackageJson('./tests/_sample-pkg.json');
    expect(typeof pkg).toBe('object');
    expect(pkg.name).toBe('sample-package');
  });

  test('testing provided params - type 3', async () => {
    // windows
    const pkg = await readPackageJson('tests\\_sample-pkg.json');
    expect(typeof pkg).toBe('object');
    expect(pkg.name).toBe('sample-package');
  });

  test('testing invalid package', async () => {
    // windows
    await expect(readPackageJson('tests\\_invalid-pkg.xjson')).rejects.toThrow(
      SyntaxError
    );
  });
});

describe('testing updateFile', () => {
  const sampleFileLoc = join(__dirname, 'test.json');
  afterEach(() => {
    return fs.unlink(sampleFileLoc);
  });

  test('providing sample file loc and content', async () => {
    const content = 'something';
    await updateFile(content, sampleFileLoc);
    expect((await fs.readFile(sampleFileLoc)).toString()).toBe(content);
  });

  test('providing sample file loc and content(as obj)', async () => {
    const sampleFileLoc = join(__dirname, 'test.json');
    const contentAsObj = { stuff: 'stuff' };
    const contentAsString = JSON.stringify(contentAsObj, null, 2);

    await updateFile(contentAsObj, sampleFileLoc);
    expect((await fs.readFile(sampleFileLoc)).toString()).toBe(contentAsString);
  });
});
