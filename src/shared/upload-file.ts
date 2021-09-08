import fs from 'fs';
import path from 'path';

import { mkdirp } from '@src/utils';

interface RequestSave {
  file: Express.Multer.File;
  directory: string;
  name: string;
}

class UploadFile {
  public async save({ file, name, directory }: RequestSave): Promise<string> {
    await mkdirp(directory);

    const ext = `${path.extname(file.originalname).slice(1)}`;
    const filename = `${name}.${ext}`;

    await fs.promises.writeFile(path.resolve(directory, filename), file.buffer);

    return filename;
  }

  public async remove(directoryWithName: string): Promise<void> {
    try {
      await fs.promises.rm(directoryWithName);
    } catch {
      //
    }
  }
}

const sharedUploadFile = new UploadFile();
export default sharedUploadFile;
