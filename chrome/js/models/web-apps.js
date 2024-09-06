/**
 * Web App Manager.
 * 
 * Manages installed web apps.
 */
class WebApps extends EventTarget {
  apps = new Map();

  /**
   * Constructor.
   * 
   * @param {Database} database Database for saving apps.
   */
  constructor(database) {
    super();
    this.db = database;
  }

  /**
   * Start the app manager.
   * 
   * @returns {WebApps} The initialised web app manager instance.
   */
  async start() {
    console.log('Starting app manager...');
    this.refreshAppList();
  }

  /**
   * Add an app to the database.
   * 
   * @param {String} manifestUrl The URL from which the manifest was retrieved.
   * @param {String} documentUrl The URL of the document from which the manifest was linked.
   * @param {Object} manifest The raw content of the manifest parsed as JSON.
   * @returns {Promise} A Promise that resolves on successful creation.
   */
  async create(manifestUrl, documentUrl, manifest) {
    // Try to parse id from manifest
    let webApp;
    try {
      webApp = new WebApp(manifest, manifestUrl, documentUrl);
    } catch(error) {
      console.error('Failed to parse web app manifest retrieved from URL ' + manifestUrl);
      // TODO: Show error to user in the view layer
      throw new Error();
    }
    const id = webApp.id;

    this.db.createApp(id, manifestUrl, documentUrl, manifest).then(() => {
      console.log('Successfully created app with id: ' + id);
      this.refreshAppList().then(() => {
        this.dispatchEvent(new Event('_appcreated'));
      });
      return;
    }).catch((error) => {
      console.error('Error creating app with id: ' + id);
      // TODO: Show error to user in the view layer
      throw new Error();
    });
  }

  /**
   * Get the current list of installed apps.
   * 
   * @returns {Map} A Map of app IDs to WebApp objects.
   */
  list() {
    return this.apps;
  }

  /**
   * Refresh the list of apps in memory.
   */
  async refreshAppList() {
    this.db.listApps().then((appRecords) => {
      appRecords.forEach((appRecord, appId) => {
        try {
          let webApp = new WebApp(appRecord.manifest, appRecord.manifestUrl, 
            appRecord.documentUrl);
          this.apps.set(appId, webApp);
        } catch {
          console.error('Failed to instantiate web app with id ' + appId);
        }
      });
      return;
    });
  }
}