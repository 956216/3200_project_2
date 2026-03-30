db = db.getSiblingDB('shelfshare');

const result = db.loans.aggregate([
  { $group: { _id: "$status", total_loans: { $sum: 1 } } },
  { $sort: { total_loans: -1 } }
]).toArray();

print('Total loans grouped by their current status:');
printjson(result);

/*
RESULT:

MongoDB shell version v7.0.14
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4c600520-c98c-4552-85fc-e7332bee2866") }
MongoDB server version: 7.0.14
Total loans grouped by their current status:
[
        {
                "_id" : "RETURNED",
                "total_loans" : 4
        },
        {
                "_id" : "ACTIVE",
                "total_loans" : 3
        },
        {
                "_id" : "OVERDUE",
                "total_loans" : 1
        }
]
*/