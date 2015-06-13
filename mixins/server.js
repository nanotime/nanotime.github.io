var restify = require('restify');

var server = restify.createServer({
  name: 'testServer',
  version: '1.0.0'
});

server.get('/hello/:name', sayHello);

function sayHello (req, res, next) {
  res.json(200, { name: req.params.name });
  return next();
}

const port: 3000;

server.listen(port, function() { console.log(`Working on ${port}`) });