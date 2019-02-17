import Password, {PasswordModel} from '../models/Password';
import {BadRequestError} from '../api/errors';
import * as randomstring from 'randomstring';

export default class PasswordController {

    private static readonly EXPIRATION_DELTA = 10 * 60 * 1000; // 10 minutes

    private static generateAddress(): string {
        return randomstring.generate({
            length: 4,
            charset: 'abcdefghkmnpqrstwxyz'
        });
    };

    public static async cleanBin() {
        // throw out all passwords
        const now = Date.now();
        const expiredCreation = now - this.EXPIRATION_DELTA;
        await Password.remove({createdAt: {$lt: expiredCreation}});
    }

    public static async retrieve(req, res) {
        const address = req.params.address;
        // @ts-ignore
        const password: PasswordModel = await Password.findOne({address});

        await this.cleanBin();

        res.render('password', {content: password.content});
    }

    public static async store(req) {
        const content = req.body.content;

        if (content.length < 10) {
            throw new BadRequestError('invalid_ciphertext');
        }

        if (content.length > 250) {
            throw new BadRequestError('ciphertext_too_long');
        }

        let sjclData;
        try {
            sjclData = JSON.parse(content);
        } catch (e) {
            throw new BadRequestError('invalid_ciphertext');
        }

        if (!sjclData.iv || !sjclData.v || !sjclData.iter || !sjclData.mode || !sjclData.cipher || !sjclData.salt || !sjclData.ct) {
            throw new BadRequestError('invalid_ciphertext');
        }

        // the content is a valid sjcl string, we can proceed
        const address = this.generateAddress();

        const password: PasswordModel = new Password({
            content,
            address
        });
        const savedPassword = await password.save();

        const expiryTimestamp = savedPassword.createdAt.getTime() + this.EXPIRATION_DELTA;
        const expiry = new Date(expiryTimestamp);

        return {
            address,
            expiry: expiryTimestamp / 1000 // send the expiration timestamp in seconds
        };
    }

}