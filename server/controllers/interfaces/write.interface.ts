import express = require('express');
interface WriteInterface {
    create: express.RequestHandler;
    update: express.RequestHandler;
    delete: express.RequestHandler;
}
export = WriteInterface;
