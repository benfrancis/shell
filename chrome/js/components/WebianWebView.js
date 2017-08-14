/**
 * Webian WebView.
 *
 * <webian-webview> is a Custom Element which provides a common abstraction
 * on top of both Electron's <webview> and Gecko's <iframe mozbrowser>, falling
 * back to a vanilla <iframe> with limited functionality.
 */
class WebianWebView extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
    switch(Shell.RUNTIME) {
      case 'electron':
        console.log('Defining <webian-webview> as <webview>');
        var webview = document.createElement('webview');
        webview.src = this.getAttribute('src');
        shadow.appendChild(webview);
        break;
      case 'qbrt':
        console.log('Defining <webian-webview> as <iframe mozbrowser>');
        var iframe = document.createElement('iframe');
        iframe.setAttribute('mozbrowser', true);
        iframe.setAttribute('remote', true);
        iframe.src = this.getAttribute('src');
        shadow.appendChild(iframe);
        break;
      default:
        console.log('Defining <webian-webview> as <iframe>');
        var iframe = document.createElement('iframe');
        iframe.src = this.getAttribute('src');
        shadow.appendChild(iframe);
        break;
    }

  }
}

window.customElements.define('webian-webview', WebianWebView);
