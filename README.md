# HashTag - News App made with MERN

| [🔗 **Deployed Site**](https://hashtag-news.netlify.app/) | [▶️ Demo Video](https://youtu.be/kMqgrvK6NS4/) |
| ------------- |:-------------:|

> [!IMPORTANT]  
> Due to the limitations of free tier on render.com, the [server becomes idle after 15 minutes of inactivity](https://render.com/docs/free#spinning-down-on-idle).
> To get around this reload the page after 5 seconds when loading for the first time.

## How to run
To run backend
```
cd backend
npm i
npm run dev
```

To run frontend
```
cd frontend
npm i
npm run dev
```

## Implementation
### Frontend

For frontend I used **ReactJS**, using **Vite** as the build tool.

For the topic switching, a `/GET` request is made to the  backend, and the `FeedContext` is used to update the `feed` variable which is an Object with list of news item of the topics loaded so far. When the site loads for the first time, the `DEFAULT_TOPIC` from `constants.js` is loaded.

For the search function, again there is  `/GET` request.

For the email subscription part, a `/POST` request is sent, based on whose response, either an error message is shown, or a success message is shown.

For the styling, I've used `.module.css` files for each individual components so ensure proper scoping of CSS. To switch theme, There are 2 files `light.css` and `dark.css` with different css variables. I again used a `ThemeContext` that provides a value for the theme and decides what styles are applied to the `App` component. The  website is made responsive with media-queries upto 300px.

### Backend

For backend, I used **NodeJS**, **ExpressJS** and **MongoDB** for database.

For news aggregation, I scrape the RSS feed of *Times Of India*. They provided separate channels for different topics which I listed down in the `TOPIC_PROVIDERS` variable in `constants.js`.

On initialisation and connecting to the DB, the `updateFeed` function is invoked that runs through the all the `TOPIC_PROVIDERS`, and saves them to the DB. This function is invoked every 15 minutes to refresh the feed.

To access the feed, the route `/api/feed/:topic` is provided, that returns list of news item for that topic. The route `/api/search/:q` returns all matching news item with the substring "q" (case-insensitive) in title or content.

For the email subscription part, the route is `/api/subscribe/`. There is validation for valid email id and uniqueness, after which it is stored in the DB.
