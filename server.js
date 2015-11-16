var loopback = require('loopback');
var path = require('path');
var app = loopback();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(loopback.static(path.resolve(__dirname, './client')));

app.get('/json', function(req, res){
  fs.readFile('data.json', 'utf8', function(err, data){
    if(err){
      res.send({
        status: "failed",
        message: err
      })
      console.log(err);
    }else{
      res.send({
        status: "success",
        data: data
      });
    }
  });
});

app.post("/json", function(req, res){
  fs.writeFileSync("data.json", req.body.data, "utf-8");
  res.send({
    status: "success"
  })
})

app.listen(3000);