import '../styles/bot-field.scss';

type CallbackFunction = (...args: any[]) => void;

export class BotField {
    private options: any;
    private selector: any;
    private elements: any = [];

    constructor (options: any = {}) {
        this.options = BotField.extend(options);

        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;

        // Early throw if selector doesn't exists
        if (this.selector === null) {
            throw new Error('You need to specify a selector!');
        }

        console.log(this.selector);
        this.elements = this.selector.elements;
    }

    public static readonly CSS_CLASSES: any = {

    };

    /**
     * Call
     * @param {CallbackFunction} callback
     */
     public init(callback: CallbackFunction) {
         this.getData('https://randomuser.me/api/');
     }

    public getData(url: string): void {
        fetch(url)
            .then((res: any) => res.json())
            .then((res: any) => {
                this.fieldForm(res.results);
            });
    }

     public fieldForm(data: any): void {
         console.log(data.length);
         for( const i of this.elements) {
             console.log(i.name);
         }
     }

     public removeActiveClass(): void {
         // code
     }

     public destroy(): void {
         this.removeActiveClass();
     }

     private static extend(options: CallbackFunction): object {
         const settings: any = {
             selector: '.bot-field',
         };

         const defaultSettings = <any>options;
         for (const i of Object.keys(defaultSettings)) {
             settings[i] = defaultSettings[i];
         }

         return settings;
     }
 }

import { BotField as MyBotField } from './bot-field';
export namespace MyModule {
    export const BotField = MyBotField;
}

(<any>window).BotField = MyModule.BotField;
