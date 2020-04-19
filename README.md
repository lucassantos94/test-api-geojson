# Sample Forum - Documentation
## Quick start
To run this software you must already have docker and docker-compose installed then:
  - setup .env file following the .env.sample file: 
>   NODE_PORT=8030 -- port node application will run \ 
>   SECRET=SHHHTESTING --- JWT secret
  - setup your cors whitelist domain inside: src/config/cors.json , keep the pattern 
  ```
  {
  "whitelist":[
    "www.domain.com.br",
    "localhost",
    "127.0.0.1",
    yourwhitelisteddomain,
    ]

  }
  ```

  - start database container
  ```
  $ docker-compose up -d --build db
  ```
  - seed database
  ```
  $ docker-compose run -d --rm restore 
  ```
  - start backend container
  ```
  $ docker-compose up -d node
  ```
it will run tow containers, one for the database ( Mongodb) and other for the backend 

 - after that you app should be available to use on the port you've choosen on your .env file

 #### Notes: 
  For testing and avaliation of this app, the database password is still hardcoded on the docker-compose.yml file.
## Database diagram and model Schemas
  database diagram is inside file: ./Comicclan db diagram.pdf

  model schemas inside ./src/shared/infra/database/mongoose/model
## Sample Data:

 - users:
 ```
{
    "user": "lucassantos",
    "alias": "testl",
    "pass": "pass1",
    "email": "lucas@email.com"
}
{
    "user": "newUser2",
    "alias": "test2",
    "pass": "pass2",
    "email": "user@email.com"
}
{
    "user": "newUser3",
    "alias": "test3",
    "pass": "pass3",
    "email": "user2@email.com"
}
 ```

## Routes

Routes are divided into authenticated routes and those who don't require authentication
### No authentication required:
 - /user/register  :
 > Request type : POST \
 > Creates a new user if e-mail no already used
 > Sample body \
 > { \
 >   "user": "lucassantos", - String between 5 and 40 characters\
 >   "alias": "test1",- String between 5 and 40 characters\
 >   "pass": "pass123",- String between 5 and 15 characters\
 >   "email": "lucas@email.com"- must be a valid email\
 > }
 > returns 201 when user created

 - /user/login  :
 > Request type : POST \
 > Authenticates user if email and password are correct
 > Sample body \
 > { \
 >   "pass": "pass123",- String between 5 and 15 characters\
 >   "email": "lucas@email.com"- must be a valid email\
 > } \
 > return 201 and adds a cookie to response 


### Authentication required:
 - /post  :
 > Request type : POST \
 > Creates a new Post \
 > Sample body \
 > { \
 >   "text": "Sample new post here",- String between 1 and 500 characters\
 > } \
 > return 201 when post Created

 - /post/comment  :
 > Request type : POST \
 > Creates a new Post \
 > Sample body \
 > { \
>    "postId": "das857das8da-d8sa6da97", - String uuid v4\
 >   "text": "Sample new post here",- String between 1 and 500 characters\
 > } \
 > return 201 when post Created

 - /post/#page  :
 > Request type : GET \
 > Gets all recent posts limited to 15 by page
 > #page - Number number of the post page for request \
 > return 200 0 to 15 posts on response body \
 > Sample Response \
 > { \
 >   data:  [\
 >     {\
 >     id: String uuid - post ID,\
 >     userId: String uuid - post creator ID ,\
 >     text: String - post text,\
 >     date: Date - date of creation,\
 >     }\
 >  ]\
 >}

  - /post/comment/#postId/#page  :
 > Request type : GET \
 > Gets all recent post's comments limited to 15 by page
 > #postId - String uuid - id of the post being searched \
 > #page - Number number of the comment page for request \
 > return 200 -  0 to 15 comments on response body \
 > Sample Response \
 > { \
 >   data:  [\
 >     {
 >       text: String - comment's text\
 >       userId: String uuid - user who did the comment \
 >       date: Date - date the comment was created\
 >  ]\
 >}