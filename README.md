# Rapid Deploy URL Shortener
A rapid deploy URL shortener express server made with NodeJS, Express.js and Vue.js

## Documentation
Slang:
Slug (The end of the URL that is going to be used to identify the linked URL)

Endpoints:
GET /:slug (Get and be redirected to an existing slug)

POST /:slug (Post a new slug. If the URL already exists the existing one will be returned. To forcefully create a new slug (ignoring existing), add ```force: true```, to the request body)

GET /slugs/:slug (Get the slug data for an existing slug)

## Special Thanks To:
[Coding Garden with CJ](https://www.youtube.com/channel/UCLNgu_OupwoeESgtab33CCw): For your [URL Shortener video](https://www.youtube.com/watch?v=gq5yubc1u18). It helped me with getting the idea and nail the basic premise on this project.