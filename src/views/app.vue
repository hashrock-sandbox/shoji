<style>
  .saved{
    color: gray;
    font-size: 0.5rem;
    text-align: right;
  }
</style>

<template>
  <p class="saved">Saved : {{saved}}</p>
  <div id="editor"></div>
</template>

<script>

  var superagent = require("superagent");
  var util = require("../libs/util");
  var url = "/json";

  module.exports = {
    data: function () {
      return {
        msg: '',
        result: "",
        saved: ""
      }
    },
    methods : {
      save : function(data){
        var self = this;
        
        var o = util.arrayToObj(data);
        superagent
          .post(url)
          .type('form')
          .send({data : JSON.stringify(o)})
          .end(function(err, res){
            self.saved = new Date();
          });
      }
    },
    ready: function(){
      var self = this;
      
      superagent.get(url, function(err, data){
        var container = document.getElementById('editor');
        var source = JSON.parse(data.body.data);
        
        var hot = new Handsontable(container,{
          data: util.objToArray(source),
          minSpareRows: 1,
          minSpareCols: 1,
          afterChange: function(changes, source) {
            self.save(this.getData());
          }
        });
      })
    }
  }
</script>