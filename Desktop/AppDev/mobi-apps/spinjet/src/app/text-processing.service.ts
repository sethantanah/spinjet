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
  providedIn: 'root'
})
export class TextProcessingService {

  // eslint-disable-next-line max-len
  //sfile ='Terminology mining, term extraction, term recognition, or glossary extraction, is a subtask of information extraction. The goal of terminology extraction is to automatically extract relevant terms from a given corpus. In the semantic web era, a growing number of communities and networked enterprises started to access and interoperate through the internet. Modeling these communities and their information needs is important for several web applications, like topic-driven web crawlers, web services, recommender systems, etc. The development of terminology extraction is essential to the language industry. One of the first steps to model the knowledge domain of a virtual community is to collect a vocabulary of domain-relevant terms, constituting the linguistic surface manifestation of domain concepts. Several methods to automatically extract technical terms from domain-specific document warehouses have been described in the literature. Typically, approaches to automatic term extraction make use of linguistic processors (part of speech tagging, phrase chunking) to extract terminological candidates, i.e. syntactically plausible terminological noun phrases, NPs (e.g. compounds \'credit card\', adjective-NPs \'local tourist information office\', and prepositional-NPs \'board of directors\' - in English, the first two constructs are the most frequent). Terminological entries are then filtered from the candidate list using statistical and machine learning methods. Once filtered, because of their low ambiguity and high specificity, these terms are particularly useful for conceptualizing a knowledge domain or for supporting the creation of a domain ontology. Furthermore, terminology extraction is a very useful starting point for semantic similarity, knowledge management, human translation and machine translation, etc.';
 // Terminology mining, term extraction, term recognition, or glossary extraction, is a subtask of information extraction. The goal of terminology extraction is to automatically extract relevant terms from a given corpus. In the semantic web era, a growing number of communities and networked enterprises started to access and interoperate through the internet. Modeling these communities and their information needs is important for several web applications, like topic-driven web crawlers, web services, recommender systems, etc. The development of terminology extraction is essential to the language industry. One of the first steps to model the knowledge domain of a virtual community is to collect a vocabulary of domain-relevant terms, constituting the linguistic surface manifestation of domain concepts. Several methods to automatically extract technical terms from domain-specific document warehouses have been described in the literature. Typically, approaches to automatic term extraction make use of linguistic processors (part of speech tagging, phrase chunking) to extract terminological candidates, i.e. syntactically plausible terminological noun phrases, NPs (e.g. compounds \'credit card\', adjective-NPs \'local tourist information office\', and prepositional-NPs \'board of directors\' - in English, the first two constructs are the most frequent). Terminological entries are then filtered from the candidate list using statistical and machine learning methods. Once filtered, because of their low ambiguity and high specificity, these terms are particularly useful for conceptualizing a knowledge domain or for supporting the creation of a domain ontology. Furthermore, terminology extraction is a very useful starting point for semantic similarity, knowledge management, human translation and machine translation, etc

  constructor(private spinService: SpinService) { }


  spinContent(content){
    const rg = RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi);
    const keywords = [];
    const sentences = content.trim().split('.');

    sentences.forEach((sentence, i) => {
      sentence.replace(rg, '');
      if(sentence.length < 5){
        sentences.splice(i,1);
      }

      keywords.push(this.extractKeyWords(sentence));
    });



  const spinnedContent = this.spinService.textReplacement(keywords, sentences);

  return spinnedContent;

  }

  extractKeyWords(sentence){
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const extraction_result = keyword_extractor.extract(sentence,{
    language:'english',
    remove_digits: false,
    return_changed_case:false,
    remove_duplicates: false

});

return extraction_result;
  }

}



