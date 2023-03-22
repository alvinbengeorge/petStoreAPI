import requests
from time import sleep
url = 'http://localhost:8080/{}'

def createUser():
    r = requests.post(
        url.format('usercreate'), 
        json={
            'username': 'newUser', 
            'password': 'newUser'
        }
    )
    print(r.content.decode())

def addPet():
    r = requests.post(
        url.format('addpets'), 
        json={
            'name': 'test', 
            'type': 'test',
            'age': 1,
            'color': 'test',
            'image': 'test',
        },
        headers={
            "username": "newUser",
            "password": "newUser"
        }
    )
    print(r.content.decode())

def getAllPets():
    r = requests.get(url.format('pets'))
    print(r.content.decode())
    return r.json()

def editPet():
    r = requests.patch(
        url.format('editpet/{}'.format(getAllPets()[0]['id'])), 
        json={
            'name': 'test1', 
            'type': 'test',
            'age': 1,
            'color': 'test',
            'image': 'test',
        },
        headers={
            "username": "newUser",
            "password": "newUser"
        }
    )
    print(r.content.decode())

def deletePet():
    r = requests.delete(
        url.format('deletepet/{}'.format(getAllPets()[0]['id'])), 
        headers={
            "username": "newUser",
            "password": "newUser"
        }
    )
    print(r.content.decode())

if __name__ == '__main__':
    print("\n\nCreateUser Test")
    createUser()
    sleep(1)
    print("\n\nAddPet Test")
    addPet()
    sleep(1)
    print("\n\nGetAllPets Test")
    getAllPets()
    sleep(1)
    print("\n\nEditPet Test")
    editPet()
    sleep(1)
    print("\n\nDeletePet Test")
    deletePet()
    sleep(1)