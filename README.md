# <Student Database API>

## Description

This project is a RESTful API which takes POST and GET requests from client servers and returns a JavaScript Object Notation(JSON) formatted response. From this API, you can perform the following tasks:
- Fetch a record
- Create a record
- Update a record
- Delete a record

![testing site](https://user-images.githubusercontent.com/86119205/184479142-c667a3aa-4f61-4698-b8f4-beb00a08c603.jpg)


## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Features](#features)
- [Usage](#usage)
- [Tests](#tests)
- [How to Contribute](#how-to-contribute)
- [Credits](#credits)
- [License](#license)

## Installation

- Step 1: Clone this repository in your local system
```shell
git clone https://github.com/AbhinavJaintle/backend.git
```
- Step 2: Connect to your local MongoDB server and change the url in `app.js` file to the port where your local MongoDB server is running. For example:
```javascript
const url = 'mongodb://127.0.0.1:27017';
```
- Step 3: Import a database:

![database](https://user-images.githubusercontent.com/86119205/184480424-609f96cf-bee3-4bff-b878-f54ae21b2bc9.jpg)


You can import either `/mongodb-local-connect/student.csv` or `/mongodb-local-connect/student.json` in your local MongoDB collection if you want to import the data from this database or better make your own entries!



- Step 4: Validate your collection by giving different parameter's datatypes and specify required fields.

![validator](https://user-images.githubusercontent.com/86119205/184479880-dc0994b5-6ced-4aa6-9ff2-28b884df4aba.jpg)
For my database, I used the following JSON Schema to authenticate the entries:
```jsonSchema
{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id'
    ],
    additionalProperties: true,
    properties: {
      _id: {
        bsonType: 'number',
        description: 'must be an integer'
      },
      name: {
        bsonType: 'string',
        description: 'must be a string'
      },
      phoneNumber: {
        bsonType: 'number',
        minimum: 1000000000,
        maximum: 9999999999,
        exclusiveMaximum: false,
        description: 'must be an integer in [ 1000000000, 9999999999 ]'
      },
      Age: {
        bsonType: 'number',
        description: 'must be an integer'
      },
      isStudent: {
        bsonType: 'bool',
        description: 'can only be one of true or false'
      },
      highestQualification: {
        bsonType: 'string',
        description: 'must be a string'
      },
      interests: {
        bsonType: [
          'array'
        ],
        minItems: 0,
        maxItems: 25,
        items: {
          bsonType: 'string'
        },
        description: 'must be an array of string'
      }
    }
  }
}
```
- Step 5: Test the API:

Hop to the [Tests](#tests) section to see the various ways you can test this API.

## Dependencies

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mongodb": "^4.8.1",
    "nodemon": "^2.0.19"
  }
}
```

## Features

As of now, the features include **fetching an existing record**, **creating a new record**, **updating an existing record** or **deleting a record**.
Behind the scenes 

Database **before** and **after** update query:

![before](https://user-images.githubusercontent.com/86119205/184486666-ea5455c3-a8bb-4aa8-90a0-9ca5f20e3f11.jpg) ![after](https://user-images.githubusercontent.com/86119205/184486718-b9cad7cc-6b13-43b1-b15a-dca1b3ffbe6b.jpg)



## Usage


I am working on providing this code in languages other than javascript as well, if you'd like to help, please see the [How to Contribute](#how-to-contribute) section. 
To directly see the API in action without having to code it yourself, you can skip over to [Tests](#tests).

- 1. To get the records of the requested student by '_id'

```javascript
<script>
   fetch('http://localhost:6069/get?_id=60033690588')
	.then(response => response.text())
	.then(response => console.log(response))
	.catch(err => console.error(err));
</script>
```

- 2. To create a new record

```javascript
<script>
// POST request using fetch()
fetch("http://localhost:6069/create", {
	
 method: "POST",
	
 body: JSON.stringify({
    _id: 665879522,
    name : 'Dhanesh',
    email : 'dk@gmail.com',
    phoneNumber : 7756879224,
    Age : 19,
    isStudent : true,
    highestQualification : 'B.Tech',
    interests : ['DSA', 'C++', 'Java']    
  }
),
	
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
})

.then(response => response.text())

.then(response => console.log(response));


</script>
```

- 3. To delete the records of the requested student by '_id'

```javascript
<script>
  fetch("http://localhost:6069/delete", {
    
   method: "POST",
    
   body: JSON.stringify({
      _id: "4433690588"
    }),
    
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  
  .then(response => response.text())
  
  .then(response => console.log(response));
</script>
```

- 4. To update an existing record 

```javascript
<script>
    // POST request using fetch()
    fetch("http://localhost:6069/update", {
      
     method: "POST",
      
     body: JSON.stringify({
        _id: 8566785457,
        phoneNumber : 7844432809,
        address : '1-5-6/B8/F5, ABC Colony, Hyderabad',
        branch : 'CSE'
      }),
      
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    
    .then(response => response.text())
    
    .then(response => console.log(response));
    
    
 </script>
```


## Tests

You can directly check the working of this API by either opening the `temp.html` page or by making changes as per your convineince. Here's how:
- Follow all the installation procedure to install the application.
- Run the application by using the following command:
```shell
node app.js
```
- Save changes in temp.html and open the page.
- See console for results.

## How to Contribute

If you so wish to contribute you can drop a message to me here: **tle.jain[at]gmail[dot]com**

or connect with me here: [LinkedIn](https://www.linkedin.com/in/jaintle/)


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


---


## Credits

© Abhinav Jain 2022

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


