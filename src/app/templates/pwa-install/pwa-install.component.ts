import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-pwa-install',
  templateUrl: './pwa-install.component.html',
  styleUrls: ['./pwa-install.component.css']
})
export class PwaInstallComponent implements OnInit {

  deferredPrompt: any;
  showButton = false;

  constructor() { }

  ngOnInit() {
    // if ('serviceWorker' in navigator){
    //   navigator.serviceWorker.register('/ngsw-worker.js').then(function(registration) {
    //     console.log('Service worker  registrado com sucesso:', registration);
    //
    //   }).catch(function(error) {
    //     console.log('Falha ao Registrar o Service Worker:', error);
    //
    //   });
    // }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }

}
