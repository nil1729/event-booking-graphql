# Event Booking App

Simple GraphQL server implementation Using ReactJS, NodeJS and MongoDB.

- #### Live Demo [here](https://mern-gpl-nil.herokuapp.com/).
  - Test User Credentials
    - Email: `nil@gmail.com`
    - Password: `1234`
- #### Github Repository [link](https://github.com/nil1729/event-booking-graphql).

---

### Technology and Modules used for this Project

1. _`Node JS Express Framework`_ is used as a building Backend part of this Website.
2. _`MongoDB`_ used for Database to store Users and Events Details.
3. _`GarphQL`_ is used to build APIs for this Website.
4. _`React JS`_ is used as frontend Framework for building SPA.
5. _`Bootswatch Minty Theme`_ is used as CSS Framework and the website is Responsive for all Devices.
6. _`ChartJS`_ is used for Charting the responses and Data.

7. _`JWT`_ is used for Authentication purpose.
8. Token will be stored in `Local Storage` of Client Browser.
9. Encrypt passwords with `bcrypt`

10. _`ChartJS`_ is used for charting the Data got from Bookings.

---

## Run this Project on Local Environment.

1. **Prerequisites**

   - NodeJS installed on your Local machine
   - MongoDB installed on your local machine or have an Atlas Account.

2. **Credentials Setup**

   - Create a MongoDB Atlas Account for Host this Project Online. Find Tutorials [here](https://www.youtube.com/watch?v=KKyag6t98g8).

3. **Project Setup**

   - Clone this Repository or Download the zip File.
     ```
      >> git clone https://github.com/nil1729/event-booking-graphql
     ```
   - Create a new file `.env` on root directory and put following secrets on that file.

     ```
        MONGO_URI= <--- MongoDB Connection URL --->
        JWT_SECRET= <--- JsonWebToken Secret Key --->
     ```

   - Run this command

     ```
      >> npm run dev  // to run the Full Project.

      >> npm run server // to start only backend server and go to http://localhost:5000 to test APIs on GraphQL Playground

      >> npm run Client // to start React Development server only (But it will not working alone as api depends on Backend also)

     ```

---

### Website Preview

## <img src="./collage.png" alt="">

<p style="text-align: center;">Made With<span style="color: red;"> &#10084; </span>by <a href="https://github.com/nil1729" target="_blank"> Nilanjan Deb </a> </p>
