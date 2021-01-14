const fs= require('fs');

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter a user</title></head>');
        res.write('<body><h1>Welcome to my page</h1><form action="/createUser" method="POST"><input type="text" name="userName"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users'){
        res.write('<html>');
        res.write('<head><title>List of Users</title></head>');
        res.write(`
        <body>
        <ul>
        <li>
            Broad
        </li>
        <li>
            Anderson
        </li>
        <li>
            Root
        </li>
        <li>
            Morgan
        </li>
        </ul>
        </body>`);
        res.write('</html>');
        return res.end();
    }
    if(url === '/createUser'){
        const body = [];
        req.on("data",(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            fs.writeFile('users.txt',user,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        })
    }
}

module.exports = {requestHandler:requestHandler};