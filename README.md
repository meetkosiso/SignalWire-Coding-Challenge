# SignalWire Coding Challenge

A service that accepts a payload, stores the data and send a webhook request to https://webhook.site/

## Database

I used an in memory data store that is not persisted on disk and that gets cleared once the service is stopped or killed.
This was built only for the purpose of this Challenge, so you will not have to install much dependency or doing
many configurations in order to get the service to run.

## To install the service Dependencies

```
npm install
```

## To start the service

```
npm run dev
```

## To run Test

```
npm run test
```

## To lint

```
npm run lint
```
