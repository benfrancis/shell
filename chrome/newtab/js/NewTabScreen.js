/**
 * Webian Shell New Tab Screen.
 *
 * The new tab page for Webian Shell.
 */

var NewTabScreen = {
  /**
   * Start New Tab Screen.
   */
  start: function() {
    console.log('Starting new tab screen...');
    this.appGrid = document.getElementById('app-grid');
    //Start the Shell Database
    Database.start();
    this.showApps();
    // Update the app grid whenever there's a database change
    window.addEventListener('_databasechanged', this.showApps.bind(this));
  },

  /*
   * Show grid of app icons.
   */
  showApps: function() {
    this.appGrid.innerHTML = '';

    Database.getApps().then(function(apps) {
      apps.forEach(function(appObject) {
        var icon = new Icon(appObject, '_self');
      });
    });
  }
};

/**
  * Start New Tab Screen on page load.
  */
window.addEventListener('load', function newtab_onLoad() {
  window.removeEventListener('load', newtab_onLoad);
  NewTabScreen.start();
});
