# GoIT Node.js Homework

This is an API for managing of contact list.
Application written using node.js, express, mongodb, mognoose.

## Methods and endpoints

Below there is despcrition and demostation of using appropriate methods and endpoints

### GET /api/contacts

Response expects list of contacts with following fields:

```javascript
{
id: "6450bfdd49d07ac0498a188c",
name: "Example",
email: "example@someemail.com",
phone: "666-666-666",
favorite: false
}
```

#### Code description

200 - OK

### GET /api/contacts/:id

Response expects a contact with requested id:

```javascript
{
    id: "6450bfdd49d07ac0498a188c",
    name: "Example",
    email: "example@someemail.com",
    phone: "666-666-666",
    favorite: false
}
```

#### Code description

200 - OK

404 - Contact with "id" ID is not found

### POST /api/contacts

Body of request:

```javascript
{
    name: "Example",
    email: "example@someemail.com",
    phone: "666-666-666",
    favorite: false
}
```

**Field favorite is optional. Established as "false" by default**
**Number expects "xxx-xxx-xxx" format**

Response:

```javascript
{
    id: "6450bfdd49d07ac0498a188c",
    name: "New contact example",
    email: "newexample@someemail.com",
    phone" "666-666-666",
    favorite: false
}
```

#### Code description

201 - Created

400 - Bad request

### PUT /api/contacts/:id

Body of request:

```javascript
{
    name: "ExampleUPD",
    email: "exampleUPD@someemail.com",
    phone: "666-666-666"
}
```

**Field favorite is optional. Established as "false" by default**<br>
**Number expects "xxx-xxx-xxx" format**

Response:

```javascript
{
id: "6450bfdd49d07ac0498a188c",
name: "ExampleUPD",
email: "exampleUPD@someemail.com",
phone: "666-666-666",
favorite: false
}
```

#### Code description

200 - OK

400 - Bad request

404 - Not found

### PATCH /api/contacts/:id/favorite

Body of request:

```javascript
{
  favorite: true;
}
```

Response:

```javascript
{
    id: "6450bfdd49d07ac0498a188c",
    name: "Example",
    email: "example@someemail.com",
    phone: "666-666-666",
    favorite: true
}
```

#### Code description

200 - OK

400 - Bad request

404 - Not found

### DELETE /api/contacts/:id

Response expects deleted contact data:

```javascript
 {
    id: "6450bfdd49d07ac0498a188c",
    name: "Example",
    email: "example@someemail.com",
    phone: "666-666-666",
    favorite: false
}
```

#### Code description

200 - OK

400 - Not found

### Other errors

404 - Page is not found (non-existing endpoint)

500 - Server error
