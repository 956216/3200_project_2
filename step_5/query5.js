db = db.getSiblingDB('shelfshare');

db.lendingCircles.updateOne(
  { circleId: "circle_001" },
  { $set: { acceptsNewMembers: false } }
);

print('Updated circle_001 to disable accepting new members');

/*
RESULT:

MongoDB shell version v7.0.14
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("54ecb1c6-9bef-4d35-8eb0-3a54f2b618e0") }
MongoDB server version: 7.0.14
Updated circle_001 to disable accepting new members
*/
