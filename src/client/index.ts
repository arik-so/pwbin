import sjcl = require('sjcl');
import rp = require('request-promise-native');

export default class PWBin {
    static encrypt(password: string, pin: string): string {
        // @ts-ignore
        return sjcl.encrypt(pin, password);
    }

    static decrypt(ciphertext: string, pin: string): string {
        return sjcl.decrypt(pin, ciphertext);
    }

    static async storePassword(password: string, pin: string): Promise<string> {
        const encryptedPassword = this.encrypt(password, pin);
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/pw/store',
            json: true,
            body: {
                content: encryptedPassword
            }
        };
        const response = await rp(options);
        return response.address;
    }
};