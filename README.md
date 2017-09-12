<h2> Url Shortner </h2>
A scalable Url shortner using NodeJS and MongoDb

<h2>How to run it</h2>

* Build node docker container using "docker build -t bvthakur/node . "
* Get MongoDB docker image using " docker pull mongo:latest "
* Run "docker run -v "$(pwd)":/data --name mongo -d mongo mongod --smallfiles " 
* Run "docker run -p 8081:8081 --link mongo:mongo -it bvthakur/node " to link bvthakur/node to mongo 
* Open https://localhost:8081



