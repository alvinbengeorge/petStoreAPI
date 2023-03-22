# petStoreAPI `GDSC`
This is a simple pet store API that allows you to add, delete, update and get pets from the store. It also allows you to add, delete, update and get owners of the pets. The API is built using Node.js and Express.js. The API is also connected to a MongoDB database. 

## Installation and Running the API
```sh
git clone https://github.com/alvinbengeorge/petStoreAPI
cd petStoreAPI
chmod +x pet.sh

# For servers
./pet.sh server

# For developers
./pet.sh dev
```

## EndPoints
### `/pets/:id [GET]`
Returns all the pets in the store if ID is not provided. If ID is provided, returns the pet with the given ID.

### `/addpets [POST]`
Adds a pet to the store. The body of the request should be in the following format:
```json
{
    "name": "petName",
    "age": 1,
    "type": "petType",
    "color": "petColor",
    "image": "https://petImageURL"
}
```

### `/deletepet/:id [DELETE]`
Deletes the pet with the given ID. \
**Can only be done by the owner of the pet.**

### `/editpet/:id [PATCH]`
Edits the pet with the given ID. The body of the request should be in the following format:
```json
{
    "name": "petName",
    "age": 1,
    "type": "petType",
    "color": "petColor",
    "image": "https://petImageURL"
}
```

### `/usercreate [POST]`
Creates a user. The body of the request should be in the following format:
```json
{
    "username": "userName",
    "password": "userPassword"
}
```

