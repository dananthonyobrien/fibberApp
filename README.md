![](https://github.com/dananthonyobrien/Edgeworth-POI-Project/blob/main/Edgeworth/public/images/edgeworth-logo.png)


# Edgeworth: The Map of Irish Science
Edgeworth is an interactive Point of Interest (POI) map that allows users to view and add profiles of Irish scientists and places of scientific interest.
Edgeworth is named after Richard Lovell Edgeworth, the Anglo Irish inventor and scientist that built Ireland's first optical telegraph system in the early nineteenth century, allowing information to pass from coast to coast in record speeds.
Join the Edgeworth network, and become part of the story of Irish science!

## Tools
Edgeworth is built using Node.js; persistance comes from MongoDB. It is hosted on Glitch and all source files can be accessed on GitHub. Mocha used for testing.

## Getting Started
### Initialising node.js
To initialize node.js project, follow these steps:
1. Open project (eg. edgeworth) in Visual Studio Code or other editor
2. To launch node.js file, in the command line navigate to folder the index.js file is in (eg. Home>EdgeworthIrishScienceMap) and enter:
`node index.js`
2. Code now running at http://localhost:3000 (local host address may be different, check output in command line).
**Note:** Changes to html can be seen by saving Visual Studio and refreshing browers. However, for changes to JavaScript, you must CTRL+C out node.js at the command line, and then reinitialise by re-entering:
`node index.js`

### Launching mongodb database
To launch MongoDB database, follow these steps:
1. Typically, to launch the mongodb database service on your platform, first create a directory somewhere (eg. Home>EdgeworthIrishScienceMap) to store the database itself:
`mkdir db`
2.	Enter:
`mongod -dbpath db`
3.	Launch Robo 3T, File > Connect
4.	For new connections, click Create
**Note:** Make sure Mongoose in installed:
`npm i mongoose` 

### Push files to GitHub with Git
To host files on GitHub using Git, complete the following steps:
1. Initialise project with Git:
`git init`
2. Add new files:
`git add .`
3. Commit files, adding message:
`git commit -m "new security feature added"`
4. **Optional:** Add new branch (here named develop):
`git branch develop`
5. **Optional:** Switch between branches:
`git checkout master`
6. **Optional:** To merge branches checkout branch you wish to merge to (ie develop):
`git merge feature-security`
**Note:** Best practise to use tagged release, main, development, and new feature branches workflow
7. Created new repository on GitHub and get url. Link local and remote:
`git remote add origin https://github.com/Edgeworth-POI-Project.git`
8. Push from local to remote:
`git push origin develop`
9. To tag your branch at a particular point:
`git tag -a v1.5 -m "Version 1.5 with new security feature"`

### Call APIs
To call Edgeworth contributions APIs, complete the following steps:
1. Open Postman
2. Use GET method
3. Enter base url (localhost:3000) + /api/contributions

### Run tests
To run Mocha tests for Edgeworth in Visual Studio Code complete the following steps:
1. `npm install mocha`
2. Add `"test": "mocha -u tdd"` to scripts in package.json
3. `npm test`
