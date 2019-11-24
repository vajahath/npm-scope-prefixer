import { readPackageJson, extractName, prefixScope, updateFile } from './utils';
import normalize = require('normalize-path');

export async function scopePrefixer(
  scope: string | undefined,
  pkgJsonPath?: string
) {
  if (!scope) {
    throw new Error('Please provide scope');
  }
  if (pkgJsonPath) {
    pkgJsonPath = normalize(pkgJsonPath);
  }

  const pkg = await readPackageJson(pkgJsonPath);
  const origName = pkg.name;

  const unScopedName = extractName(origName);

  if (!unScopedName) {
    throw new Error(
      `Couldn't properly extract un-scoped package name (${pkg.name})`
    );
  }

  const scopePrefixedName = prefixScope(scope, unScopedName);

  // change pkg.json
  pkg.name = scopePrefixedName;

  await updateFile(pkg, pkgJsonPath);

  console.info(
    `## Package name re-scoped ('${origName}' > '${scopePrefixedName}')`
  );
}
