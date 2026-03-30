db = db.getSiblingDB('shelfshare');

const count = db.users.countDocuments({ userId: "user_001" });

print('Number of documents for user_001:');
print(count);


/*
RESULT:

MongoDB shell version v7.0.14
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("d2587f2c-c0e6-4650-b66a-1dfd48a8bb7a") }
MongoDB server version: 7.0.14
Number of documents for user_001:
1
*/