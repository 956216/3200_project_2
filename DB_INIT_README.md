# ShelfShare — MongoDB Initialization Guide

## Database Overview

| Collection       | Documents | Description                                  |
|-----------------|-----------|----------------------------------------------|
| `users`          | 8         | Users with embedded ownedBooks & memberships |
| `books`          | 12        | Books with embedded authors & genres         |
| `lendingCircles` | 3         | Circles with embedded members                |
| `loans`          | 8         | Loans with embedded reviews & request        |

## Importing via MongoDB Compass

### Prerequisites
- MongoDB installed and running locally (or a remote connection string)
- MongoDB Compass installed

### Steps

1. **Open MongoDB Compass** and connect to your MongoDB instance (default: `mongodb://localhost:27017`).

2. **Create the database**: Click the `+` button next to "Databases" in the left sidebar. Enter `shelfshare` as the database name and `users` as the first collection name. Click "Create Database."

3. **Import `users` collection**:
   - Click on the `users` collection in the sidebar.
   - Click the green **"Add Data"** button → **"Import JSON or CSV file"**.
   - Select `users.json` from this folder.
   - Click **"Import"**. You should see 8 documents.

4. **Create and import `books` collection**:
   - Click the `+` button next to the `shelfshare` database to create a new collection.
   - Name it `books` and click "Create Collection."
   - Click **"Add Data"** → **"Import JSON or CSV file"** → select `books.json`.
   - Click **"Import"**. You should see 12 documents.

5. **Create and import `lendingCircles` collection**:
   - Create a new collection named `lendingCircles`.
   - Import `lendingCircles.json`. You should see 3 documents.

6. **Create and import `loans` collection**:
   - Create a new collection named `loans`.
   - Import `loans.json`. You should see 8 documents.

### Verification

After importing, you should see the `shelfshare` database with 4 collections in the Compass sidebar. Click on any collection and verify the document count matches the table above. Expand a document to confirm embedded arrays (e.g., `ownedBooks`, `authors`, `reviews`) are present.

## Alternative: Import via Command Line

If you prefer using `mongoimport` instead of Compass:

```bash
mongoimport --db shelfshare --collection users --file users.json --jsonArray
mongoimport --db shelfshare --collection books --file books.json --jsonArray
mongoimport --db shelfshare --collection lendingCircles --file lendingCircles.json --jsonArray
mongoimport --db shelfshare --collection loans --file loans.json --jsonArray
```

The `--jsonArray` flag is required because each file contains a JSON array of documents.
