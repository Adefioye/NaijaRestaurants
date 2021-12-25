# YelpCamp

The purpose of the project is to allow for the creation of campground with specific details while creating reviews for each campground.

## The following are the features that have been added to the yelpcamp app so far

- A form has been created for the addition of campground with specific details like title, price, description, location, author, images, reviews.

- GET, POST, PUT, DELETE methods have been implemented in creating, editing, updating, and deletion of campground.

- POST and DELETE methods have been implemented in the creation of reviews for each campground.

- Authentication and Authorization have been implemented using `passport.js`. Campground can only be created after logging in a user. Also, only log-in `authors ` of campground can edit, update and delete campground. In addition, log-in `review authors` only have the rights to delete reviews.

-

## To DOs(DONE)

- Validating the images(meaning, submission should not be possible without an image)
- Handle errors relating to forward geocoding
- To repurpose yelpcamp codebase for like Restaurants in Nigeria.

## To DOs(TO BE DONE)

- Clean up every remnant of campground for restaurants
- Remove `price` input from new and edit form
