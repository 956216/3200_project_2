db = db.getSiblingDB('shelfshare');

const books = db.books.find({}).limit(3).toArray();

print('3 books from the db:');
printjson(books);


/*
RESULT:

MongoDB shell version v7.0.14
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("e2b5e8d4-9ee3-44f3-8a3a-f65e18496ce8") }
MongoDB server version: 7.0.14
3 books from the db:
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
        },
        {
                "_id" : "978-0-7432-7356-5",
                "isbn" : "978-0-7432-7356-5",
                "title" : "The Great Gatsby",
                "star_rating" : 4.5,
                "authors" : [
                        {
                                "authorId" : "auth_002",
                                "name" : "F. Scott Fitzgerald",
                                "birth_year" : "1896"
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
        },
        {
                "_id" : "978-0-451-52493-5",
                "isbn" : "978-0-451-52493-5",
                "title" : "1984",
                "star_rating" : 4.7,
                "authors" : [
                        {
                                "authorId" : "auth_003",
                                "name" : "George Orwell",
                                "birth_year" : "1903"
                        }
                ],
                "genres" : [
                        {
                                "genreId" : "genre_003",
                                "name" : "Dystopian",
                                "description" : "Fiction set in oppressive or degraded societies"
                        },
                        {
                                "genreId" : "genre_004",
                                "name" : "Science Fiction",
                                "description" : "Speculative fiction exploring futuristic concepts"
                        }
                ]
        }
]
*/