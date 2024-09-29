import { https } from 'firebase-functions';
import next from 'next';

const app = next({
    dev: false,
    conf: { distDir: '.next' },
});

const handle = app.getRequestHandler();

export const nextServer = https.onRequest(async (req, res) => {
    await app.prepare();
    return await handle(req, res);
});