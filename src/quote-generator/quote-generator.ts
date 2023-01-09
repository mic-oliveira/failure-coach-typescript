import { QuoteInterface } from "../quote-interface/quote-interface.interface";
import { fsReadFile } from "ts-loader/dist/utils";

export class QuoteGenerator {

  constructor(private quote: QuoteInterface) {
  }

  setLanguage(language?:string) {
    switch (language.substring(0,2)) {
      case 'pt': return 'pt-br';
      case 'en': return 'en';
      default: throw new Error('Language not implemented.');
    }
  }

  private loadQuotesFile(lang: string) {
    const quotes = fsReadFile(`src/i18n/pt-br.json`, 'utf8');
    return JSON.parse(quotes);
  }

  loadQuotes(lang: string){
    const quotes = this.loadQuotesFile(this.setLanguage(lang));
    this.quote.setQuotes(quotes.quotes);
    return this;
  }

  getWisdomQuote(index?:number) {
    return this.quote.getQuote(index);
  }
}
