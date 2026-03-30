# ShelfShare — MongoDB Collection Definitions

This document defines the four main collections in the ShelfShare MongoDB database. Each collection includes two example documents demonstrating the structure and embedded subdocuments.

---

## 1. `users` Collection

Each user document embeds their owned book copies (`ownedBooks`) and circle memberships (`memberships`) as arrays.

```json
{
  "_id": "user_001",
  "userId": "user_001",
  "name": "Alice Chen",
  "email": "alice.chen@email.com",
  "joinedAt": "2025-09-15T10:30:00Z",

  "ownedBooks": [
    {
      "userBookId": "ub_001",
      "isbn": "978-0-06-112008-4",
      "visibilityPublic": true,
      "status": "AVAILABLE",       // AVAILABLE | REQUESTED | LOANED
      "condition": "LIKENEW"       // LIKENEW | GOOD | FAIR | BEATEN
    },
    {
      "userBookId": "ub_002",
      "isbn": "978-0-7432-7356-5",
      "visibilityPublic": true,
      "status": "LOANED",
      "condition": "GOOD"
    }
  ],

  "memberships": [
    {
      "membershipId": "mem_001",
      "circleId": "circle_001",
      "permissionLevel": "admin",   // admin | member
      "canBorrow": true,
      "canLend": true,
      "joinedAt": "2025-09-15T10:30:00Z"
    }
  ]
}
```

```json
{
  "_id": "user_002",
  "userId": "user_002",
  "name": "Marcus Rivera",
  "email": "marcus.r@email.com",
  "joinedAt": "2025-10-02T14:15:00Z",

  "ownedBooks": [
    {
      "userBookId": "ub_003",
      "isbn": "978-0-14-028329-7",
      "visibilityPublic": false,
      "status": "AVAILABLE",
      "condition": "FAIR"
    }
  ],

  "memberships": [
    {
      "membershipId": "mem_002",
      "circleId": "circle_001",
      "permissionLevel": "member",
      "canBorrow": true,
      "canLend": true,
      "joinedAt": "2025-10-05T09:00:00Z"
    },
    {
      "membershipId": "mem_003",
      "circleId": "circle_002",
      "permissionLevel": "admin",
      "canBorrow": true,
      "canLend": false,
      "joinedAt": "2025-11-01T08:00:00Z"
    }
  ]
}
```

---

## 2. `books` Collection

Each book document embeds its authors and genres as arrays. Author and genre info is denormalized (copied in) so lookups don't require a separate query.

```json
{
  "_id": "978-0-06-112008-4",
  "isbn": "978-0-06-112008-4",
  "title": "To Kill a Mockingbird",
  "star_rating": 4.8,

  "authors": [
    {
      "authorId": "auth_001",
      "name": "Harper Lee",
      "birth_year": "1926"
    }
  ],

  "genres": [
    {
      "genreId": "genre_001",
      "name": "Literary Fiction",
      "description": "Character-driven novels exploring the human condition"
    },
    {
      "genreId": "genre_003",
      "name": "Classics",
      "description": "Enduring works of lasting literary merit"
    }
  ]
}
```

```json
{
  "_id": "978-0-7432-7356-5",
  "isbn": "978-0-7432-7356-5",
  "title": "The Great Gatsby",
  "star_rating": 4.5,

  "authors": [
    {
      "authorId": "auth_002",
      "name": "F. Scott Fitzgerald",
      "birth_year": "1896"
    }
  ],

  "genres": [
    {
      "genreId": "genre_001",
      "name": "Literary Fiction",
      "description": "Character-driven novels exploring the human condition"
    }
  ]
}
```

---

## 3. `lendingCircles` Collection

Each lending circle embeds its members as an array. Member names are denormalized from the users collection so you can display circle rosters without a join.

```json
{
  "_id": "circle_001",
  "circleId": "circle_001",
  "name": "Bay Area Bookworms",
  "createdAtDate": "2025-09-10T12:00:00Z",
  "description": "A lending circle for book lovers in the SF Bay Area",

  "members": [
    {
      "membershipId": "mem_001",
      "userId": "user_001",
      "name": "Alice Chen",
      "permissionLevel": "admin",
      "canBorrow": true,
      "canLend": true,
      "joinedAt": "2025-09-15T10:30:00Z"
    },
    {
      "membershipId": "mem_002",
      "userId": "user_002",
      "name": "Marcus Rivera",
      "permissionLevel": "member",
      "canBorrow": true,
      "canLend": true,
      "joinedAt": "2025-10-05T09:00:00Z"
    }
  ]
}
```

```json
{
  "_id": "circle_002",
  "circleId": "circle_002",
  "name": "Campus Reads",
  "createdAtDate": "2025-10-20T08:00:00Z",
  "description": "Northeastern University student book-sharing group",

  "members": [
    {
      "membershipId": "mem_003",
      "userId": "user_002",
      "name": "Marcus Rivera",
      "permissionLevel": "admin",
      "canBorrow": true,
      "canLend": false,
      "joinedAt": "2025-11-01T08:00:00Z"
    }
  ]
}
```

---

## 4. `loans` Collection

Each loan document embeds its reviews as an array and its originating borrow request as a single object. The lenderId and isbn are denormalized from the UserBook so the loan document is self-contained.

```json
{
  "_id": "loan_001",
  "loanId": "loan_001",
  "userBookId": "ub_002",
  "loaneeId": "user_002",
  "lenderId": "user_001",
  "isbn": "978-0-7432-7356-5",
  "dueDate": "2026-01-15",
  "returnedAtDate": "2026-01-10",
  "status": "RETURNED",            // ACTIVE | RETURNED | OVERDUE
  "conditionAtLend": "GOOD",
  "conditionAtReturn": "GOOD",

  "reviews": [
    {
      "reviewId": "rev_001",
      "review_maker": "user_001",   // the lender reviewing the borrower
      "review_subject": "user_002",
      "rating": 5,
      "comment": "Returned on time and in great condition!",
      "createdAtDate": "2026-01-11T09:00:00Z",
      "type": "BORROWER"            // BORROWER = reviewing the borrower, LENDER = reviewing the lender
    },
    {
      "reviewId": "rev_002",
      "review_maker": "user_002",   // the borrower reviewing the lender
      "review_subject": "user_001",
      "rating": 5,
      "comment": "Book was in perfect condition, great lender.",
      "createdAtDate": "2026-01-11T10:00:00Z",
      "type": "LENDER"
    }
  ],

  "request": {
    "requestId": "req_001",
    "loanerId": "user_001",
    "loaneeId": "user_002",
    "requestedAtDate": "2025-12-20T14:00:00Z",
    "status": "ACCEPTED",           // PENDING | ACCEPTED | DENIED
    "message": "Hey Alice, could I borrow The Great Gatsby for a few weeks?"
  }
}
```

```json
{
  "_id": "loan_002",
  "loanId": "loan_002",
  "userBookId": "ub_001",
  "loaneeId": "user_002",
  "lenderId": "user_001",
  "isbn": "978-0-06-112008-4",
  "dueDate": "2026-03-01",
  "returnedAtDate": null,
  "status": "ACTIVE",
  "conditionAtLend": "LIKENEW",
  "conditionAtReturn": null,

  "reviews": [],

  "request": {
    "requestId": "req_002",
    "loanerId": "user_001",
    "loaneeId": "user_002",
    "requestedAtDate": "2026-02-01T11:00:00Z",
    "status": "ACCEPTED",
    "message": "Can I borrow Mockingbird? Loved Gatsby!"
  }
}
```
