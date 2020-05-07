# test 

## Quick start
To run this software you must already have docker and docker-compose installed then:
  - setup .env file following the .env.sample file: 
>   NODE_PORT=8000 -- port node application will run inside your container\
>   APP_PORT=3000 -- port node application will be exposed externally 
 

  - start database container
  ```
  $ docker-compose up -d --build db
  ```
  - seed database
  ```
  $ docker-compose run -d --rm mongo-seed 
  ```
  - start backend container
  ```
  $ docker-compose up -d node
  ```
  it will run two containers, one for the database (Mongodb) and other for the backend 

  after that you app should be available to use on the port you've choosen on your .env at APP_PORT file


 #### Notes: 
  For testing and avaliation purposes, the database's username and password are still hardcoded on the docker-compose.yml file.

 ## Testing

 Att the root level of this project run :
 ```
 $ npm install
 ```
 Then run :
 ```
 $ npm run test
 ```
 



## Routes

### NOTE: All routes don't require authentication

 - /pdv/  :
 > Request type : POST \
 > Creates a new PDV \
 > Sample body \
 > { \
 >   "tradingName": "Cervejaria do Lucas", - String \
 >   "ownerName": "Lucas Novo Parceiro",- String \
 >   "document": "pass123",- String between 5 and 15 characters\
 >   "coveraArea": { \
 >   "type":"MultiPolygon" -- must be this specific type\
 >   "coordinates": [[[[ number,number ]]]] -- four layer coordinate's array following geojson pattern\
 >    }\
 >   "address": { \
 >   "type":"Point" -- must be this specific type\
 >   "coordinates": [ number,number ] -- coordinate`s array following geojson pattern\
 >    }\
 > }
 > returns 200 whit pdv created

 - /pdv/#ID  
 > Request type : get \
 > Find Partner by ID  \
 > must replace url #ID with partner to be found\
 > Sample response body \
 > { \
 >    "id":32561 - number\
 >   "tradingName": "Cervejaria do Lucas", - String \
 >   "ownerName": "Lucas Novo Parceiro",- String \
 >   "document": "pass123",- String between 5 and 15 characters\
 >   "coveraArea": { \
 >   "type":"MultiPolygon" \
 >   "coordinates": [[[[ number,number ]]]] -- four layer coordinate's array following geojson pattern\
 >    }\
 >   "address": { \
 >   "type":"Point" -- must be this specific type\
 >   "coordinates": [ number,number ] -- coordinate`s array following geojson pattern\
 >    }\
 > }
 > returns 200 with pdv found or 204 if none found

 - /pdv/near/#LAT/%LONG  
 > Request type : get \
 > Find Partner by location (latitude and longitude)  \
 > must replace url #LAT with latitude and #LONG with longitude\
 > Sample response body \
 > { \
 >    "id":32561 - number \
 >   "tradingName": "Cervejaria do Lucas", - String \
 >   "ownerName": "Lucas Novo Parceiro",- String \
 >   "document": "pass123",- String between 5 and 15 characters\
 >   "coveraArea": { \
 >   "type":"MultiPolygon" \
 >   "coordinates": [[[[ number,number ]]]] -- four layer coordinate's array following geojson pattern \
 >    }\
 >   "address": { \
 >   "type":"Point" \
 >   "coordinates": [ number,number ] -- coordinate`s array following geojson pattern\
 >    }\
 > }
 > returns 200 with pdv found or 204  if none found
