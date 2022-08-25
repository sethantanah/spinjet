/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SpinService {
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private afStore: AngularFireStorage
  ) {}

  paraphrase(
    words: string = 'the big fox',
  ) {
    const content = words.split('.');
    const body = JSON.stringify({ inputs: content });

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.apiToken,
    });

    const response = this.http.post(environment.paraphraserAPIURL, body, {
      headers,
      responseType: 'json',
    });

    return response;
  }

  sendMessage(msg: string) {
    this.afs.collection('messages').add({ message: msg }).then();
  }

  textReplacement(kws, sentenceList) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      spins: 4,
      mask: '[MASK]',
      algorithm: 'bert_low_case',
      word_strength: 1,
    };

    const url =
      'https://calm-sands-71620.herokuapp.com/https://spinjet-api.herokuapp.com/incomes';
    const body = JSON.stringify({
      kw: kws,
      sentences: sentenceList,
      options: options,
    });

    const response = this.http.post(url, body, {
      headers,
      responseType: 'json',
    });

    return response;
  }

  // const  headers = new HttpHeaders(
  //   {
  //     'x-auth-key': environment.apiKey,
  //     'x-spin-cap-words': spinCaps ? 'true' : 'false',
  //     'x-words-to-skip': skipWords,
  //      Accept: 'text/plain; charset=utf-8',
  //     'Content-Type': 'text/plain',
  //     mode: 'no-cors'
  //   }
  // );
}
