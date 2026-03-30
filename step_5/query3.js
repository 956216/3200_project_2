db = db.getSiblingDB('shelfshare');

const books = db.books.find({
  $or: [
    { star_rating: { $gt: 4.7 } },
    { "authors.1": { $exists: true } } // if the second element exists, there's a second author
  ]
}).toArray();

print('Books that are rated > 4.7 OR have multiple authors:');
printjson(books);

/*
RESULT:

MongoDB shell version v7.0.14
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7dda7fa0-9cd5-4534-8545-99b2b06084fb") }
MongoDB server version: 7.0.14
Books that are rated > 4.7 OR have multiple authors:
[
        {
                "_id" : "978-0-06-112008-4",
                "isbn" : "978-0-06-112008-4",
                "title" : "To Kill a Mockingbird",
                "star_rating" : 4.8,
                "authors" : [
                        {
                                "authorId" : "auth_001",
                                "name" : "Harper Lee",
                                "birth_year" : "1926"
                        }
                ],
                "genres" : [
                        {
                                "genreId" : "genre_001",
                                "name" : "Literary Fiction",
                                "description" : "Character-driven novels exploring the human condition"
                        },
                        {
                                "genreId" : "genre_002",
                                "name" : "Classics",
                                "description" : "Enduring works of lasting literary merit"
                        }
                ]
        }
]

*/