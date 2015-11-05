# Reddit Slash Command for Mixmax

This is an open source Mixmax Slash Command. Right now, you are much better off searching a gif-only or image-only subreddit as I have not yet figured out how to filter the reddit api end.

For some reason, you can query

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:9145/typeahead?text=cats
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=cats
```
