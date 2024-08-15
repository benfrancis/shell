/**
 * Web App Manager.
 * 
 * Manages installed web apps.
 */
const WebApps = {

  /**
   * A Map of app IDs to WebApp objects.
   */
  apps: new Map(),

  /**
   * Start the app manager.
   * 
   * @param {Database} database Database for saving apps.
   */
  start: async function(database) {
    console.log('Starting app manager...');
    this.db = database;
    this.db.listApps().then((appRecords) => {
      // TODO: figure out where ID comes from.
      appRecords.forEach((appRecord, appId) => {
        try {
          let webApp = new WebApp(appRecord.manifest, appRecord.manifestUrl, 
            appRecord.documentUrl);
          this.apps.set(appId, webApp);
        } catch {
          console.error('Failed to instantiate web app with id ' + appId);
        }
      });
    });
  },

  /**
   * Add an app to the database.
   * 
   * @param {String} manifestUrl 
   * @param {String} documentUrl 
   * @param {Object} manifest
   * @returns 
   */
  create: function(manifestUrl, documentUrl, manifest) {
    // Try to parse id from manifest
    let webApp;
    try {
      webApp = new WebApp(manifest, manifestUrl, documentUrl);
    } catch(error) {
      console.error('Failed to parse web app manifest retrieved from URL ' + manifestUrl);
      // TODO: Show error to user
      return;
    }
    const id = webApp.id;

    this.db.createApp(id, manifestUrl, documentUrl, manifest).then(() => {
      console.log('Successfully created app with id: ' + id);
    }).catch((error) => {
      console.error('Error creating app with id: ' + id);
    });
  },

  /**
   * Get the current list of installed apps.
   * 
   * @returns {Map} A Map of app IDs to WebApp objects.
   */
  list: function() {
    return this.apps;
  }
}