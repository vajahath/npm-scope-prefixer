import { join } from 'path';
import { promises as fs } from 'fs';
import normalize = require('normalize-path');

export const DEFAULT_PKG_PATH = join(process.cwd(), 'package.json');

export function extractName(fullName: string): string | undefined {
  const match = fullName.match(/((?<=\/).+|^((?!\/).)*$)/gi);
  return (match || [])[0];
}

export function prefixScope(scope: string, packageName: string): string {
  return `${scope.startsWith('@') ? scope : `@${scope}`}/${packageName}`;
}

export async function readPackageJson(path = DEFAULT_PKG_PATH) {
  path = normalize(path);
  const pkg: { name: string } = JSON.parse(
    (await fs.readFile(path)).toString()
  );
  return pkg;
}

export async function updateFile(
  content: string | object,
  path = DEFAULT_PKG_PATH
) {
  path = normalize(path);

  if (typeof content === 'object') {
    content = JSON.stringify(content, null, 2);
  }

  await fs.writeFile(path, content);
}
