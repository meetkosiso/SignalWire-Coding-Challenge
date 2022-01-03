# Ticket-Tags-Processor

A service that accepts a payload, stores the data and send a webhook request to https://webhook.site/

## Database

I used an in memory data store that is not persisted on disk and that gets cleared once the service is stopped or killed.
This was built only for the purpose of this Challenge, so users will not have to install much dependency or doing
many configurations in order to get the service to run.

## To install the service Dependencies

```
npm install
```

## To start the service

```
npm run dev
```

## To create a ticket and tags on the service running on localhost

```
Request Type: Post
Route: localhost:3000/api/v1/ticket/create
Request Body: {
 user_id: '1234',
 title: 'My title',
 tags:  ["tag1", "tag2", "tag3"],
}
```

## To run Test

```
npm run test
```

## To lint

```
npm run lint
```
