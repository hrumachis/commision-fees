import fs from 'fs';
import util from 'util'
import path from 'path'

/**
 * Handle file loading
 */
class File {
  /**
   * Read .json file
   * 
   * @param {string} filePath
   * @return {Promise} 
   */
  static async readJSON(filePath) {
    let result = null;

    await util.promisify(fs.readFile)(path.resolve(filePath), 'utf8').then((data) => {
      result = JSON.parse(data);
    }).catch((err) => {
      throw(err);
    });

    return result;
  }
}

export default File;
