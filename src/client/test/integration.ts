import PWBin from '../index';

describe('Integration', () => {

    it('should store a password', async () => {

        // const password = 'Hello World!';
        const password = 'wPW66HSb3Ja44RlmNeScl2fN9iawdG9Rv4g27eNqzwlbSKAmWGe5VhCuTu1RhACWLcKONq';
        const pin = '123456';

        const storage = await PWBin.storePassword(password, pin);

    });

});