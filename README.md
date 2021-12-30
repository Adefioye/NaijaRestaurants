# naijaRestaurants

The purpose of the project is to allow for the creation of restaurants with specific details while creating reviews for each restaurant.

## The following are the features that have been added to the naijaRestaurants app so far

- A form has been created for the addition of restaurants with specific details like name, description, location, author, images, reviews.

- GET, POST, PUT, DELETE methods have been implemented in creating, editing, updating, and deletion of restaurants.

- POST and DELETE methods have been implemented in the creation of reviews for each restaurant.

- Authentication and Authorization have been implemented using `passport.js`. Restaurants can only be created after succesfully logging in a user. Also, only log-in `authors ` of restaurants can edit, update and delete restaurants. In addition, log-in `review authors` only have the rights to delete reviews.

-

## To DOs (DONE)

- Validating the images(meaning, submission should not be possible without an image)

## To DOs (TO BE DONE)

- Handle errors relating to forward geocoding
- Change Original Image picture of all restaurants in seed data
- Change background image of `NaijaRestaurants` homepage
- Implement `Pagination` on `All restaurants` page [DONE]
- Deploy to HEROKU
