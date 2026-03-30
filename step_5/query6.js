db = db.getSiblingDB('shelfshare');

const result = db.users.find({
  ownedBooks: { $elemMatch: { condition: "LIKENEW" } }
}, { _id: 0, name: 1, email: 1 }).toArray();

print('Users who own a book in LIKENEW condition:');
printjson(result);

/*
RESULT:

MongoDB shell version v7.0.14
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("061a5efd-2a56-448f-b44b-77d97d2c6270") }
MongoDB server version: 7.0.14
Users who own a book in LIKENEW condition:
[
        {
                "name" : "Alice Chen",
                "email" : "alice.chen@email.com"
        },
        {
                "name" : "Priya Patel",
                "email" : "priya.patel@email.com"
        },
        {
                "name" : "Jordan Kim",
                "email" : "jordan.kim@email.com"
        },
        {
                "name" : "David Park",
                "email" : "david.park@email.com"
        },
        {
                "name" : "Liam O'Brien",
                "email" : "liam.obrien@email.com"
        }
]
*/