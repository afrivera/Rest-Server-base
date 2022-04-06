const newman = require('newman');

newman.run({
    collection: './postman/usersTest.postman_collection.json',
    environment: './postman/rest-api-develop.postman_environment.json',
    reporters: ['htmlextra'], 
    iterationCount: 1,
    reporter:{
        htmlextra:{
            export: './postman/report.html' 
        } 
    } 
});