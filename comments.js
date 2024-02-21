// Create web server with Node.js
// http://localhost:3000/ will show the comments
// http://localhost:3000/submit will submit the comments
// http://localhost:3000/comments will show the comments in JSON format
// http://localhost:3000/comments?name=John will show the comments of John in JSON format

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    if (urlObj.pathname === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        // res.end("Submit successfully");
        res.writeHead(302, {
            'Location': '/comments'
        });
        res.end();
    } else if (urlObj.pathname === '/comments') {
        var json = JSON.stringify(comments);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(json);
    } else {
        fs.readFile('./index.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    }
}).listen(3000, function () {
    console.log('Server is running on http://localhost:3000/');
});
```

###