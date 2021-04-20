import { addAliases } from 'module-alias';
import { join, resolve } from 'path';

const srcDir = join(__dirname, '..');

addAliases({
  '@src': resolve(srcDir),
  '@modules': resolve(srcDir, 'modules'),
  '@database': resolve(srcDir, 'database'),
  '@errors': resolve(srcDir, 'errors'),
  '@helpers': resolve(srcDir, 'helpers'),
  '@middlewares': resolve(srcDir, 'middlewares'),
});
