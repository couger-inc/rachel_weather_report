#!/usr/bin/env node
const http = require('http');
const config = require('config');
const rp = require('request-promise');
const {logger, Darksky} = require('./lib');
const configDarksky = require('./config/darksky');
const {inputDataFactory} = require('./lib/dto/dto');
const {Interactor} = require('./lib/usecase/interactor');
const {Presenter} = require('./lib/presenter/presenter');

const port = process.env.PORT || 8889;
const server = http.createServer((request, response) => {
  logger.system.debug(`Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});

server.listen(port, () => {
  logger.system.debug(`Server is listening on port ${port}`);
});

const WebSocketServer = require('websocket').server;
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

const originIsAllowed = (origin) => (config.webSocket.origin === origin || true);

wsServer.on('request', (request) => {
  logger.system.debug(`Peer ${request.remoteAddress} Connection requested. Origin [${request.origin}]`);
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    logger.error.error(`Connection from origin ${request.origin} rejected.`);
    return;
  }

  const connection = request.accept(null, request.origin);

  connection.on('message', (message) => {
    switch (message.type) {
      case 'utf8':
        logger.system.debug('Received Message: ' + message.utf8Data);

        const inputData = inputDataFactory(message.utf8Data);
        const darksky = new Darksky(
            configDarksky.forecastUrl,
            configDarksky.apiKey);
        // TODO: inputData.units, inputData.langの値があれば使うようにする。
        const queryParams = {
          units: configDarksky.units,
          lang: configDarksky.lang,
        };
        // TODO: inputData.latlangの値があれば使うようにする。
        const url = darksky.buildForecastUrl(
            configDarksky.latlng,
            queryParams);
        rp.get(url).then((response) => {
          const interactor = new Interactor();
          const outputData = interactor.handle(inputData, response);
          const presenter = new Presenter();
          const viewModel = presenter.handle(outputData);
          connection.sendUTF(JSON.stringify(viewModel));
        }).catch((error) => {
          logger.error.error(JSON.stringify(error));
        });
        break;
      case 'binary':
        connection.sendBytes(message.binaryData);
        logger.system.debug('Received Binary Message of ' + message.binaryData.length + ' bytes');
        break;
      default:
        logger.error.error('Received non UTF8 & non binary');
        break;
    }
  });

  connection.on('close', (reasonCode, description) => {
    logger.system.debug(
        `[${reasonCode}]Peer ${connection.remoteAddress} disconnected. ${description}`
    );
  });
});

process.on('unhandledRejection', (err) => {
  logger.error.fatal('unhandledRejection', err);
});
