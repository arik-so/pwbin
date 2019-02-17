import sjcl = require('sjcl');
import rp = require('request-promise-native');

export default class PWBin {

    private baseUri: string;

    constructor(config: { baseUri: string }) {
        this.baseUri = config.baseUri;
    }

    static encrypt(password: string, pin: string): string {
        // @ts-ignore
        return sjcl.encrypt(pin, password);
    }

    public static decrypt(ciphertext: string, pin: string): string {
        return sjcl.decrypt(pin, ciphertext);
    }

    public async storePassword(password: string, pin: string): Promise<string> {
        const encryptedPassword = PWBin.encrypt(password, pin);
        const options = {
            method: 'POST',
            uri: this.baseUri + '/pw/store',
            json: true,
            body: {
                content: encryptedPassword
            }
        };
        return rp(options);
    }

}

module.exports = PWBin;