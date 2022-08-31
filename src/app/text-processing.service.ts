/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

// import {toString} from 'nlcst-to-string';
// import {retext} from 'retext';
// import retextPos from 'retext-pos';
// import retextKeywords from 'retext-keywords';

import keyword_extractor from 'keyword-extractor';
import { SpinService } from './spin.service';

@Injectable({
  providedIn: 'root',
})
export class TextProcessingService {

  constructor(private spinService: SpinService) {}

  spinContent(content, ignorewords) {
    const rg = RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi);
    const keywords = [];
    const sentences = this.getPara(content.trim()).trim().split('.');

    sentences.forEach((sentence, i) => {
      sentence.replace(rg, '');

      sentence.replace('\\""', '');

      if (sentence.length < 5) {
        sentences.splice(i, 1);
      }

      keywords.push(this.extractKeyWords(sentence));
    });

    const spinnedContent = this.spinService.textReplacement(
      keywords,
      sentences,
      ignorewords
    );

    return spinnedContent;
  }


  paraphraseText(content){
    return this.spinService.paraphrase(this.getPara(content));
  }



  extractKeyWords(sentence) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const extraction_result = keyword_extractor.extract(sentence, {
      language: 'english',
      remove_digits: false,
      return_changed_case: false,
      remove_duplicates: false,
    });

    return extraction_result;
  }

  getPara(content) {
    const text = content.split('\n\n');
    let newText = '';

    text.forEach((element, l) => {
      const xl = text[l].replace('.', ' [para].');
      text[l] = xl;
      //  console.log(text[l])
      newText += text[l];
    });
    return newText;
  }
}
