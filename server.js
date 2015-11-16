var loopback = require('loopback');
var path = require('path');
var app = loopback();
var fs = require("fs");
var bodyParser = require('body-parser');
var open = require("open");

app.use(bodyParser.urlencoded({extended: true}));

app.use(loopback.static(path.resolve(__dirname, './client')));

var run = function(filename){
  fs.access(filename, fs.R_OK | fs.W_OK, function (err) {
    if(err){
      if(err.code === "ENOENT"){
        console.log("Create : " + filename);
        var sample = [{"Title":"Example","Contents":"hoo bar"},{"Title":"Example2","Contents":"hoge huga"},{"Title":"test","Contents":"123"}];
        fs.writeFileSync(filename, JSON.stringify(sample), "utf-8");
      }else{
        console.log(err.code);
        return;
      }
    }
    app.get('/json', function(req, res){
      fs.readFile(filename, 'utf8', function(err, data){
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
      fs.writeFileSync(filename, req.body.data, "utf-8");
      res.send({
        status: "success"
      })
    })
    
    console.log("http://localhost:8989/");
    app.listen(8989);
    open("http://localhost:8989/");
    
    
  });
  
}


module.exports = {
  run: run
}


