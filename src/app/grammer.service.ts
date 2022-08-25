import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrammerService {
  res =  {
    software: {
        name: 'GrammarBot',
        version: '4.3.1',
        apiVersion: 1,
        premium: true,
        premiumHint: 'Thanks for supporting GrammarBot!',
        status: ''
    },
    warnings: {
        incompleteResults: false
    },
    language: {
        name: 'English (US)',
        code: 'en-US',
        detectedLanguage: {
            name: 'English (US)',
            code: 'en-US'
        }
    },
    matches: [
        {
            message: 'Did you mean "are","were"?',
            shortMessage: 'Agreement error',
            replacements: [
                {
                    value: 'are'
                },
                {
                    value: 'were'
                }
            ],
            offset: 3,
            length: 2,
            context: {
                text: 'We be smart. They be smart too. How doo you s...',
                offset: 3,
                length: 2
            },
            sentence: 'We be smart.',
            type: {
                typeName: 'Other'
            },
            rule: {
                id: 'SIMP_NP_BE',
                subId: '1',
                description: 'Noun phrase followed by \'be\'',
                issueType: 'grammar',
                category: {
                    id: 'GRAMMAR',
                    name: 'Grammar'
                }
            }
        },
        {
            message: 'Did you mean "are","were"?',
            shortMessage: 'Agreement error',
            replacements: [
                {
                    value: 'are'
                },
                {
                    value: 'were'
                }
            ],
            offset: 18,
            length: 2,
            context: {
                text: 'We be smart. They be smart too. How doo you spel that wurd?',
                offset: 18,
                length: 2
            },
            sentence: 'They be smart too.',
            type: {
                typeName: 'Other'
            },
            rule: {
                id: 'SIMP_NP_BE',
                subId: '1',
                description: 'Noun phrase followed by \'be\'',
                issueType: 'grammar',
                category: {
                    id: 'GRAMMAR',
                    name: 'Grammar'
                }
            }
        },
        {
            message: 'Possible spelling mistake found',
            shortMessage: 'Spelling mistake',
            replacements: [
                {
                    value: 'dew'
                },
                {
                    value: 'too'
                },
                {
                    value: 'do'
                },
                {
                    value: 'died'
                },
                {
                    value: 'dog'
                },
                {
                    value: 'door'
                },
                {
                    value: 'die'
                },
                {
                    value: 'duo'
                },
                {
                    value: 'dies'
                },
                {
                    value: 'diet'
                },
                {
                    value: 'zoo'
                },
                {
                    value: 'dot'
                },
                {
                    value: 'lieu'
                },
                {
                    value: 'doom'
                },
                {
                    value: 'Doe'
                },
                {
                    value: 'Dow'
                },
                {
                    value: 'woo'
                },
                {
                    value: 'DOA'
                },
                {
                    value: 'boo'
                },
                {
                    value: 'doc'
                },
                {
                    value: 'dodo'
                },
                {
                    value: 'doe'
                },
                {
                    value: 'foo'
                },
                {
                    value: 'goo'
                },
                {
                    value: 'Diem'
                },
                {
                    value: 'dais'
                },
                {
                    value: 'DOB'
                },
                {
                    value: 'coo'
                },
                {
                    value: 'moo'
                },
                {
                    value: 'adieu'
                },
                {
                    value: 'dewy'
                },
                {
                    value: 'dob'
                },
                {
                    value: 'doz'
                },
                {
                    value: 'DOD'
                },
                {
                    value: 'DOE'
                },
                {
                    value: 'DOS'
                },
                {
                    value: 'DOT'
                },
                {
                    value: 'Don'
                },
                {
                    value: 'Dot'
                },
                {
                    value: 'don'
                },
                {
                    value: 'dos'
                },
                {
                    value: 'loo'
                },
                {
                    value: 'poo'
                },
                {
                    value: 'do o'
                },
                {
                    value: 'AOO'
                },
                {
                    value: 'DBO'
                },
                {
                    value: 'DCO'
                },
                {
                    value: 'DDO'
                },
                {
                    value: 'DFO'
                },
                {
                    value: 'DJO'
                },
                {
                    value: 'DMO'
                },
                {
                    value: 'DO'
                },
                {
                    value: 'DOC'
                },
                {
                    value: 'DOF'
                },
                {
                    value: 'DOI'
                },
                {
                    value: 'DOJ'
                },
                {
                    value: 'DOM'
                },
                {
                    value: 'DON'
                },
                {
                    value: 'DOP'
                },
                {
                    value: 'DPO'
                },
                {
                    value: 'DSO'
                },
                {
                    value: 'DXO'
                },
                {
                    value: 'DZO'
                },
                {
                    value: 'OO'
                },
                {
                    value: 'POO'
                },
                {
                    value: 'DAEU'
                },
                {
                    value: 'DEU'
                }
            ],
            offset: 36,
            length: 3,
            context: {
                text: 'We be smart. They be smart too. How doo you spel that wurd?',
                offset: 36,
                length: 3
            },
            sentence: 'How doo you spel that wurd?',
            type: {
                typeName: 'Other'
            },
            rule: {
                id: 'MORFOLOGIK_RULE_EN_US',
                description: 'Possible spelling mistake',
                issueType: 'misspelling',
                category: {
                    id: 'TYPOS',
                    name: 'Possible Typo'
                }
            }
        },
        {
            message: 'Possible spelling mistake found',
            shortMessage: 'Spelling mistake',
            replacements: [
                {
                    value: 'spell'
                },
                {
                    value: 'spec'
                },
                {
                    value: 'sped'
                },
                {
                    value: 'Opel'
                },
                {
                    value: 'spew'
                },
                {
                    value: 'spiel'
                },
                {
                    value: 'BPEL'
                },
                {
                    value: 'PEL'
                },
                {
                    value: 'SEL'
                },
                {
                    value: 'SPE'
                },
                {
                    value: 'SPL'
                }
            ],
            offset: 44,
            length: 4,
            context: {
                text: '...e smart. They be smart too. How doo you spel that wurd?',
                offset: 43,
                length: 4
            },
            sentence: 'How doo you spel that wurd?',
            type: {
                typeName: 'Other'
            },
            rule: {
                id: 'MORFOLOGIK_RULE_EN_US',
                description: 'Possible spelling mistake',
                issueType: 'misspelling',
                category: {
                    id: 'TYPOS',
                    name: 'Possible Typo'
                }
            }
        },
        {
            message: 'Possible spelling mistake found',
            shortMessage: 'Spelling mistake',
            replacements: [
                {
                    value: 'word'
                },
                {
                    value: 'Ward'
                },
                {
                    value: 'ward'
                },
                {
                    value: 'Hurd'
                },
                {
                    value: 'curd'
                },
                {
                    value: 'Kurd'
                },
                {
                    value: 'turd'
                },
                {
                    value: 'URD'
                }
            ],
            offset: 54,
            length: 4,
            context: {
                text: '...hey be smart too. How doo you spel that wurd?',
                offset: 43,
                length: 4
            },
            sentence: 'How doo you spel that wurd?',
            type: {
                typeName: 'Other'
            },
            rule: {
                id: 'MORFOLOGIK_RULE_EN_US',
                description: 'Possible spelling mistake',
                issueType: 'misspelling',
                category: {
                    id: 'TYPOS',
                    name: 'Possible Typo'
                }
            }
        }
    ]
};

  constructor(private http: HttpClient) {}

  getGrammerCheck(text) {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'grammarbot.p.rapidapi.com',
      'x-rapidapi-key': environment.grammarApiKey,
      'content-type': 'application/x-www-form-urlencoded',
    });

    const encodedParams = new URLSearchParams();
    encodedParams.append('text', text);
    encodedParams.append('language', 'en-US');


    return this.http.post(environment.grammarApiUrl, encodedParams, {
      headers,
      responseType: 'json',
    });
  }
}
