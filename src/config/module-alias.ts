import { addAliases } from 'module-alias';
import { join, resolve } from 'path';

const srcDir = join(__dirname, '..');

addAliases({
  '@src': resolve(srcDir),
  '@config': resolve(srcDir, 'config'),
  '@errors': resolve(srcDir, 'errors'),
  '@utils': resolve(srcDir, 'utils'),
  '@shared': resolve(srcDir, 'shared'),
  '@database': resolve(srcDir, 'database'),
  '@middlewares': resolve(srcDir, 'middlewares'),
  '@modules': resolve(srcDir, 'modules'),
  '@server': resolve(srcDir, 'server'),
});
