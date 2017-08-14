/**
 * Webian Shell.
 *
 * Run Webian Shell in either Electron or qbrt.
 */

var Components = Components || null;
if (Components) {
  Components.utils.import('resource://gre/modules/Console.jsm');
  console.log('Starting qbrt');
  Components.utils.import('chrome://app/content/start-qbrt.jsm');
  startQbrt();
} else if (process && process.versions && process.versions.electron) {
  console.log('Starting Electron');
  require('./start-electron.js');
} else {
  console.error('Error: Webian Shell must be run using Electron or qbrt');
}
