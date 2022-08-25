// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCFqmj2LcppXD5lT9AI18tpfzg4l0AO4Wg',
    authDomain: 'spinjet-18756.firebaseapp.com',
    projectId: 'spinjet-18756',
    storageBucket: 'spinjet-18756.appspot.com',
    messagingSenderId: '821147206244',
    appId: '1:821147206244:web:2c846d02fe4b3b8d32d571',
    measurementId: 'G-4E6RMF24H4'
  },
  // apiKey: 'd9bebfe0900a47a5889839b836d67d5e',
  // apiUrl: ' https://calm-sands-71620.herokuapp.com/https://api.spinbot.com',
  grammarApiKey: '648f8a99b0mshbb6f6c2762f3dc5p126dbfjsn507c2682e459',
  grammarApiUrl: 'https://grammarbot.p.rapidapi.com/check',
  apiUrl: 'https://api-inference.huggingface.co/models/roberta-large',
  paraphraserAPIURL: 'https://api-inference.huggingface.co/models/tuner007/pegasus_paraphrase',
  apiToken: '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'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
