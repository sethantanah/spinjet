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


  spinContent(content, ignorewords){
 
    const rg = RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi);
    const keywords = [];
    const sentences = this.getPara(content.trim()).trim().split('.');


    sentences.forEach((sentence, i) => {
      sentence.replace(rg, '');
      
      sentence.replace('\\""', '');
  
      if(sentence.length < 5){
        sentences.splice(i,1);
    
      }

    
 


      keywords.push(this.extractKeyWords(sentence));

      
    });





  const spinnedContent = this.spinService.textReplacement(keywords, sentences, ignorewords);

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

  getPara(content) {
    const text = content.split('\n\n')
    let newText = '';

    text.forEach((element, l) => {
      const xl = text[l].replace('.', ' [para].')
      text[l] = xl
      //   //const el = element+ '[para].'
      //  console.log(text[l])
      newText += text[l];
    });
   

    return content
  }
}



// [
//   "The damage was caused by fires which Ukraine's state nuclear agency said had interfered with power lines connecting the plant on Thursday, temporarily cutting Zaporizhzhia off from the national grid for the first time in its history",
//   "\n\n\"As a result, the station's two working power units were disconnected from the network,\" Kyiv officials said",
//   "\n\nThe state nuclear company said work was under way on Friday to try to reconnect the reactors to the grid",
//   " Zaporizhzhia's other four reactors have been out of action for most of the war",
//   "\n\nSatellite images taken on Wednesday showed an extensive fire burning in the immediate vicinity of the nuclear complex",
//   "\n\nPresident Zelensky blamed the damage on Russian shelling, and in his nightly address accused Moscow of putting Ukraine and Europe \"one step away\" from disaster"
// ]


// [
//   [
//       "damage",
//       "caused",
//       "fires",
//       "Ukraine's",
//       "state",
//       "nuclear",
//       "agency",
//       "interfered",
//       "power",
//       "lines",
//       "connecting",
//       "plant",
//       "Thursday",
//       "temporarily",
//       "cutting",
//       "Zaporizhzhia",
//       "national",
//       "grid",
//       "time",
//       "history"
//   ],
//   [
//       "result",
//       "station's",
//       "working",
//       "power",
//       "units",
//       "disconnected",
//       "network",
//       "Kyiv",
//       "officials"
//   ],
//   [
//       "state",
//       "nuclear",
//       "company",
//       "work",
//       "Friday",
//       "reconnect",
//       "reactors",
//       "grid"
//   ],
//   [
//       "Zaporizhzhia's",
//       "reactors",
//       "action",
//       "war"
//   ],
//   [
//       "Satellite",
//       "images",
//       "Wednesday",
//       "showed",
//       "extensive",
//       "fire",
//       "burning",
//       "vicinity",
//       "nuclear",
//       "complex"
//   ],
//   [
//       "President",
//       "Zelensky",
//       "blamed",
//       "damage",
//       "Russian",
//       "shelling",
//       "nightly",
//       "address",
//       "accused",
//       "Moscow",
//       "putting",
//       "Ukraine",
//       "Europe",
//       "step",
//       "disaster"
//   ],
//   []
// ]

