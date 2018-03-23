import express = require('express');
interface ReadInterface {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;
}
export = ReadInterface;
