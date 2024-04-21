export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister().then(() => {
        console.log('Service worker unregistered.');
      });
    }).catch(error => {
      console.error('Error during service worker unregistration:', error);
    });
  }
}
