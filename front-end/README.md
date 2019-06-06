# Chef Client (alpha)
Application in React / Redux to manage customers of a fictitious establishment in the restaurant business.

## Instalation
With the backend installed and running¹, open the terminal and enter the following commands in sequence:
```
npm install
npm start
```
###### 1 - instructions for install and run the back-end are in the back-end's folder.

## Utilization
When you start the application, a login screen is displayed. To access the application use one of the following predefined users:

| Username  | Password | Restrictions |
| ------------- | ------------- | ---: |
| admin  | admin  | N/A.
| user  | user  | Visualization, editing e creation.
| noob  | noob  | Visualization only.

## Tests

For this evaluation two test suites were configured using Jest.

| Test | Description |
| -------------------------- | ---: |
| Test user role options | Tests whether the component responsible for the delete and edit options returns options according to the access level of the logged in user.|
| Test Logged output | Header must identify if user is logged in and submit logout option |

to start the tests use the command

```
npm test
```

# Technologies used
* React
* Redux
* Responsivo
* Jest
* GraphQL
* CSS / HTML, no frameworks
* Short-circuit, arrow functions, destructuring, async await, ...

# **Notes**
* ***Sleep function in API has the purpose of simulate the delay from the server, thus showing the loading UI feedback.***
* The choice for not to use frameworks to compose the application's UI is  to display the knowledge in CSS.
* Masks and validation of data (eg CPF / CNPJ) were not implemented with the purpose of facilitating the inclusion and registration of data for testing  purpose. 

