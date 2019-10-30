import Users from '@modules/Users'
import Config from '@/Config'

/**
 * Data storage
 */
class Store {
  constructor() {
    this.users = new Users();
    this.config = new Config();
    this.initPromise = null;
  }

  /**
   * Run initializing functions
   */
  init() {
    this.setInitPromise();
  }

  /**
	 * Set promise for configurations async calls
	 */
  setInitPromise() {
    this.initPromise = new Promise((resolve, reject) => {
      this.initConfigs().then(resolve).catch(reject);
    }).catch(() => {
      console.log("WARNING: Using local configurations. They might be out-dated.") 
    });
  }

  /**
   * Promise configuration calls
   */
  async initConfigs() {
    await this.config.getRemoteConfig();
  }
}

export default Store;
