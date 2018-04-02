import '../styles/bot-field.scss';

type CallbackFunction = (...args: any[]) => void;

export class BotField {
    private options: any;
    private selector: any;

    constructor (options: any = {}) {
        this.options = BotField.extend(options);

        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;

        // Early throw if selector doesn't exists
        if (this.selector === null) {
            throw new Error('You need to specify a selector!');
        }
    }

    public static readonly CSS_CLASSES: any = {

    };

    /**
     * Call
     * @param {CallbackFunction} callback
     */
    public init(callback: CallbackFunction) {
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    public removeActiveClass(): void {

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
