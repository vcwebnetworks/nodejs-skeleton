import { addAliases } from 'module-alias';
import { resolve, join } from 'path';

const srcDir = join(__dirname, '..');

addAliases({
  '@src': resolve(srcDir),
});
