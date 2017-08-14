/**
 * Webian Shell.
 *
 * The main Shell object which starts everything else.
 */

var Shell = {

  /**
   * Name of runtime Shell is running in.
   *
   * Either 'electron' or 'qbrt'.
   */
  RUNTIME: null,

  /**
   * Start Shell.
   */
  start: function() {
    // Detect runtime
    //var process = process || null;
    if (window.ownerGlobal != undefined) {
      this.RUNTIME = 'qbrt';
      console.log('Shell starting in qbrt runtime');
    } else if (typeof window !== 'undefined' && window.process &&
      window.process.type === 'renderer'){
      this.RUNTIME = 'electron';
      console.log('Shell starting in Electron runtime');
    } else {
      console.error('Error: Webian Shell must be run using Electron or qbrt');
    }

    /*var test = document.createElement('webian-webview');
    document.body.appendChild(test);*/

    this.windowManager = WindowManager.start();
    this.systemToolbar = SystemToolbar.start();
    // Add event listeners
    window.addEventListener('_goinghome', this.handleGoingHome);
    window.addEventListener('_leavinghome', this.handleLeavingHome);
  },

  /**
   * Handle navigating to home screen.
   */
  handleGoingHome: function() {
    document.body.classList.add('home');
  },

  /**
   * Handle navigating away from home screen.
   */
  handleLeavingHome: function() {
    document.body.classList.remove('home');
  }
};

/**
  * Start Shell on page load.
  */
window.addEventListener('load', function shell_onLoad() {
  window.removeEventListener('load', shell_onLoad);
  Shell.start();
});
