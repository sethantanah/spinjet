import { environment } from 'src/environments/environment';
import { GrammerService } from './../grammer.service';
import { SpinService } from './../spin.service';
import { onClickHandler } from '../selection'

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { Share } from '@capacitor/share';
import { documentId } from 'firebase/firestore';
import { TextProcessingService } from '../text-processing.service';

interface Update
  {
    link: String,
    message: String,
    version:String
  }


@Component({
  selector: 'app-content-spinner',
  templateUrl: './content-spinner.page.html',
  styleUrls: ['./content-spinner.page.scss'],
})
export class ContentSpinnerPage implements OnInit, AfterViewInit {
  @ViewChild('divMessages', { read: ElementRef })
  private divMessages: ElementRef;
  // eslint-disable-next-line max-len
  content = '';
  message = '';
  tempContent = '';
  spinnedContent = [];
  edittableText = '';
  spinnedContents = '';
  ignoreActive = false;
  textready = false;
  toogleTextArea = false;
  paraphraseMode = false;
  isLoading = false;
  editMode = false;
  timer: any = 0;
  ignorewords = [];

  grammarChecked = [];
  grammerCorrect = '';
  ignoreGWords = [];

  trackContentChanges = [];
  changeCount = 0;

  res: any;
  textarea: any;
  textChangeDelay = false;
  isSpinned = true;
  grammarChecking = false;

  keepOriginal = false;

  update: Update;
  hasupdate = false;

  constructor(
    private toastCtrl: ToastController,
    private spinService: SpinService,
    private clipboard: Clipboard,
    private statusBar: StatusBar,
    private grammar: GrammerService,
    private renderer: Renderer2,

    private textProcessing: TextProcessingService
  ) {


    this.res = grammar.res;
    this.spinService.getUpdate().subscribe( res => {
      this.update = {
        link: res.get('link'),
        message: res.get('message'),
        version: res.get('version')
      }

      if(this.update.version === environment.appVersion){
        this.hasupdate = false;
      }else{
        this.hasupdate = true;
      }

     })
  }

  ngOnInit() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

  ngAfterViewInit() { }

  activateIgnore() {
    const ignoremodal = document.getElementById('input-bar');
    if (ignoremodal) {
      ignoremodal.setAttribute('display', 'flex');
    }
    this.ignoreActive = true;
  }

  deactivateIgnore() {
    const ignoremodal = document.getElementById('input-bar');
    if (ignoremodal) {
      ignoremodal.setAttribute('display', 'none');
    }
    this.ignoreActive = false;
  }

  addWord(word: string) {
    const words = word.trim().split(',');

    words.forEach((w) => {
      this.ignorewords.push(w);
    });
  }

  removeWord(w: string) {
    const wordsArray = [];
    this.ignorewords.forEach((word, i) => {
      if (w.trim() !== word.trim()) {
        wordsArray.push(word);
      }
    });
    this.ignorewords = wordsArray;
  }

  spintext() {
    this.spinHandler();
    let trackTimer = 0;
    this.timer = window.setInterval(() => {
      trackTimer += 1;
      if (trackTimer > 3) {
        this.spinHandler();
      }
      this.presentToast(
        'Unable to connect api, please check your network',
        'wifi'
      );
      window.clearInterval(this.timer);
    }, 15000);
  }


  spinHandler() {
    this.textChangeDelay = false;
    this.isLoading = true;
    this.isSpinned = true;
    this.textProcessing.spinContent(this.content, this.ignorewords).subscribe(res => {
      this.log(res)
      this.textready = true;
      this.isLoading = false;
      this.keepOriginal = true;
      window.clearInterval(this.timer);

      this.spinnedContents = res.toString();
      this.textToarray(this.content, res.toString());

    });
  }

  paraphraseText() {
    this.paraphraseHandler();
    let trackTimer = 0;
    this.timer = window.setInterval(() => {
      trackTimer += 1;
      if (trackTimer > 3) {
        this.paraphraseHandler();
      }
      this.presentToast(
        'Unable to connect api, please check your network',
        'wifi'
      );
      window.clearInterval(this.timer);
    }, 15000);


  }

  paraphraseHandler() {
    this.textChangeDelay = false;
    this.isLoading = true;
    this.isSpinned = true;
    this.textready = false;
    this.spinService
      .paraphrase(this.content)
      .subscribe((res) => {

        this.textready = true;
        this.isLoading = false;
        this.keepOriginal = true;
        window.clearInterval(this.timer);
        this.spinnedContents = this.convertTOString(res, true);
        this.textToarray(this.content, this.convertTOString(res, true));
      });
  }










  grammerCheck(
    spinnedContent = '',
    isSpined = false
  ) {
    this.textarea = document.getElementById('contentEditor');
    if (!this.keepOriginal) {
      this.content = this.textarea?.innerText;
    }
    this.textarea.addEventListener('input', () => {
      if (!this.keepOriginal) {
        this.content = this.textarea?.innerText;

      }

      

      const content = isSpined ? spinnedContent : this.content;


      if (this.isSpinned && content.length > 10) {
        this.grammarChecking = true;
        this.grammar.getGrammerCheck(content).subscribe((res) => {
          this.grammarChecking = false;
          if (res) {
            this.ignorewordGrammar(res, content, this.ignoreGWords);
          }

        });
      }
    });
  }

 

  underlineGrammar(content, text: string) {
    this.grammarChecked = [];
    //let newText = '';
    let cursor = 0;
    content.matches.forEach((match, i) => {
      const offset = match.offset;
      length = match.length;
      if (cursor < offset) {
        //newText += text.slice(cursor,offset);

        this.grammarChecked.push({
          word: text.slice(cursor, offset),
          wrong: 'none',
          mistake: false,
        });

        //newText += '**' + text.slice(offset,(offset+length)) + '**';

        const textCount = text
          .slice(offset, offset + length)
          .trim()
          .split(' ');
        if (textCount.length === 1) {
          this.grammarChecked.push({
            word: text.slice(offset, offset + length).trim(),
            wrong: 'text',
            mistake: true,
            matchs: content.matches[i].replacements,
          });
        } else {
          this.grammarChecked.push({
            word: text.slice(offset, offset + length).trim(),
            wrong: 'grm',
            mistake: true,
            matchs: content.matches[i].replacements,
          });
        }
        cursor = offset + length;
      }
    });

    if (cursor < text.length) {
      //newText += text.slice(cursor);
      this.grammarChecked.push({
        word: text.slice(cursor).trim(),
        wrong: 'none',
        mistake: false,
      });
    }

    this.log(this.grammarChecked);
    //return newText;
    this.renderDom();
    this.isSpinned = false;
  }

  ignorewordGrammar(content, text, customDictionary, changed = false) {
    this.textChangeDelay = false;
    this.grammarChecked = [];
    const newText = '';
    let cursor = 0;
    content.matches.forEach((match, i) => {
      const offset = match.offset;
      length = match.length;
      if (cursor < offset) {
        const errorText = text.slice(offset, offset + length);
        if (customDictionary && match.rule.id === 'MORFOLOGIK_RULE_EN_US') {
          let isInDict = false;
          customDictionary.forEach((item) => {
            if (item === errorText) {
              isInDict = true;
            }
          });
          if (isInDict) {
            return;
          }
        }
        // newText += text.slice(cursor, offset);
        this.grammarChecked.push({
          word: text.slice(cursor, offset),
          wrong: 'none',
          changed: false,
          mistake: false,
        });
        // newText += '**' + errorText + '**';

        const textCount = errorText
          .slice(offset, offset + length)
          .trim()
          .split(' ');
        if (textCount.length === 1) {
          this.grammarChecked.push({
            word: errorText,
            wrong: 'text',
            mistake: true,
            changed: false,
            matchs: content.matches[i].replacements,
          });
        } else {
          this.grammarChecked.push({
            word: errorText,
            wrong: 'grm',
            mistake: true,
            changed: false,
            matchs: content.matches[i].replacements,
          });
        }

        cursor = offset + length;
      }
    });

    if (cursor < text.length) {
      // newText += text.slice(cursor);
      this.grammarChecked.push({
        word: text.slice(cursor),
        wrong: 'none',
        mistake: false,
        changed: false,
      });
    }

    //this.log(this.grammarChecked);

    const raw = this.content.split(' ');
    if (changed) {
      this.grammarChecked.forEach((t) => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < raw.length; i++) {
          if (t.word.trim().toLowerCase() === raw[i].trim().toLowerCase()) {
            //  t.color = '#1A1E24';
            t.changed = false;
            break;
          } else {
            t.changed = true;
          }
        }
      });
    }
    this.isSpinned = false;
    this.renderDom();
  }

  autoCorrect() {
    let newText = '';
    let cursor = 0;

    this.res.matches.forEach((match) => {
      const offset = match.offset;
      const length = match.length;
      if (cursor < offset) {
        newText += this.content.slice(cursor, offset);
        const repls = match.replacements;

        if (repls && repls.length > 0) {
          newText += repls[0].value;
        }
        cursor = offset + length;
      }
    });

    if (cursor < this.content.length) {
      newText += this.content.slice(cursor);
    }
    this.grammerCorrect = newText;
    this.log(newText);
  }

  correctMistake(newW, pos) {
    this.grammarChecked[pos].word = newW;
    this.grammarChecked[pos].wrong = 'none';
    this.renderDom();
  }

  ignore(pos) {
    this.grammarChecked[pos].mistake = false;
    this.grammarChecked[pos].wrong = 'none';
    this.ignoreGWords.push(this.grammarChecked[pos].word);
    this.renderDom();
  }

  renderDom() {
    this.textarea.innerHTML = '';
    this.textarea.innerText = '';
    //create the DOM element
    const mainSpan = this.renderer.createElement('span');
    this.grammarChecked.forEach((e, i) => {
      const subSpan = this.renderer.createElement('span');
      const toolTip = this.renderer.createElement('div');
      this.renderer.setAttribute(toolTip, 'class', 'tooltipX');
      this.renderer.appendChild(subSpan, this.renderer.createText(e.word));

      if (e.wrong === 'text' && e.changed === false) {
        this.renderer.setAttribute(subSpan, 'class', 'wText');
      } else if (e.wrong === 'grm' && e.changed === false) {
        this.renderer.setAttribute(subSpan, 'class', 'wGrm');
      } else if (e.changed === true) {
        this.renderer.setAttribute(subSpan, 'class', 'uColor');
      }

      if (e.mistake) {
        const tooltiptext = this.renderer.createElement('div');
        const ignore = this.renderer.createElement('span');
        this.renderer.setAttribute(ignore, 'class', 'ignore');
        this.renderer.appendChild(ignore, this.renderer.createText('Ignore'));

        this.renderer.setAttribute(tooltiptext, 'class', 'tooltiptext');
        this.renderer.appendChild(toolTip, subSpan);
        this.renderer.appendChild(toolTip, tooltiptext);
        this.renderer.appendChild(tooltiptext, ignore);
        this.renderer.appendChild(mainSpan, toolTip);

        e.matchs.forEach((m) => {
          const options = this.renderer.createElement('span');
          this.renderer.appendChild(
            options,
            this.renderer.createText(m.value.trim())
          );
          this.renderer.appendChild(tooltiptext, options);

          this.renderer.listen(options, 'click', () => {
            this.correctMistake(m.value, i);
          });
        });
        this.renderer.listen(ignore, 'click', () => {
          this.ignore(i);
        });
      } else {
        this.renderer.appendChild(mainSpan, subSpan);
      }
    });

    //Now append the li tag to divMessages div
    this.renderer.appendChild(this.divMessages.nativeElement, mainSpan);
    this.textChangeDelay = true;
  }

  textToarray(raw: string, spinned: string) {
    let rawTextarray = [];
    let spinnedTextarray = [];
    rawTextarray = raw.split(' ');
    spinnedTextarray = spinned.split(' ');
    this.compareText(rawTextarray, spinnedTextarray);
  }

  compareText(raw = [], spinned = []) {
    const processedText = [];
    spinned.forEach((w) => {
      processedText.push({ word: w, color: '#1A1E24' });
    });

    this.spinnedContent = processedText;
    this.toogleTextArea = true;

    let content = '';
    this.spinnedContent.forEach((text) => {
      content += text.word + ' ';
    });
    this.edittableText = this.content;

    this.grammar.getGrammerCheck(content).subscribe((res) => {
      if (content.length > 0) {
        this.ignorewordGrammar(res, content, this.ignoreGWords, true);
      }
    });

    this.trackContentChanges.push(content.trim());
    this.trackContentChanges.push(this.content);
  }

  editSpinnedText(e) {
    // e.stopPropagation();
    if (this.trackContentChanges.length >= 2) {
      this.content =
        this.trackContentChanges[this.trackContentChanges.length - 2];
    }
    this.toggleTextAreas();
  }

  revertEdit() {
    this.editMode = !this.editMode;
    if (this.changeCount !== 0) {
      this.changeCount -= 1;
    }

    if (
      this.changeCount >= 0 &&
      this.changeCount < this.trackContentChanges.length
    ) {
      this.content = this.trackContentChanges[this.changeCount];
    }
  }

  redoEdit() {
    if (this.changeCount !== this.trackContentChanges.length - 1) {
      this.changeCount += 1;
    }

    if (
      this.changeCount >= 0 &&
      this.changeCount < this.trackContentChanges.length
    ) {
      this.content = this.trackContentChanges[this.changeCount];
    }
    this.editMode = !this.editMode;
  }

  toggleTextAreas() {


    if (this.toogleTextArea) {
      this.textarea.innerText = this.content;


    } else {
      this.textarea.innerText = this.spinnedContents;
      this.renderDom()
    }
    this.toogleTextArea = !this.toogleTextArea;

  }



  convertTOString(res, isSum) {
    /// console.log(res)
    let summary = '';
    if (res && isSum) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < res.length; i++) {
        summary = summary + ' ' + res[i].generated_text;
      };
    } else {
      res.forEach((item, i) => {
        const nextSentence = item[3].sequence.split('*');

        //console.log(nextSentence[i])
        summary = summary + '' + nextSentence[i] + '. ';
      });
    }

    // console.log(res);
    return summary.trim().replace('<s>', '').replace('</s>', '').replace('<mask>', '');
  }




  toggelMode() {
    this.paraphraseMode = !this.paraphraseMode;
  }

  copyText() {
    this.clipboard.copy(this.spinnedContents);
    // window.navigator.clipboard.writeText(this.spinnedContents)
    this.presentToast('Text copied', 'clipboard-outline');
  }

  pasteText() {
    // navigator.clipboard.readText().then(
    //   resolve => {
    //     this.content = resolve;
    //    }
    // )
    this.clipboard.paste().then(
      (resolve: string) => {
        this.content = resolve;
      },
      (reject: string) => {
        this.presentToast(reject, 'clipboard-outline');
      }
    );
  }

  sendMessage() {
    if (this.message.length > 10) {
      this.spinService.sendMessage(this.message);
      this.presentToast('Thanks for the feedback', 'thumbs-up');
      this.message = '';
    }
  }

  async presentToast(msg: string, icx: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      mode: 'ios',
      duration: 2000,
      position: 'top',
      color: 'warning',
      icon: icx,
    });

    await toast.present();
  }

  async share() {
    const shareData = {
      title: 'Spinjet',
      text: 'SpinJet helps you rewrite any text into unique plagiarism-free content in seconds, try it!  \n \n',
      url: 'https://play.google.com/store/apps/details?id=io.spinjet.appv1',
    };

    try {
      await navigator.share(shareData);
    } catch {
      await Share.share({
        title: 'Spinjet',
        text: 'SpinJet helps you rewrite any text into unique plagiarism-free content in seconds, try it! \n \n',
        url: 'https://play.google.com/store/apps/details?id=io.spinjet.appv1',
      });
    }
  }

  desktopVersion() {
    const url = 'https://ethstudios.net/article-rewriter-tool';
    window.open(url, '_system', 'location=yes');
  }

  updateApp(url){
  window.location.href = url;
  }

  log(text) {
    console.log(text);
  }
}
