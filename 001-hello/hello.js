(function() {
  var hello;
  hello = {
    layout: {
      scripts: {
        "jquery.js": {
          src: "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js",
          hotlink: true
        },
        "underscore.js": "http://documentcloud.github.com/underscore/underscore-min.js",
        "backbone.js": "http://documentcloud.github.com/backbone/backbone-min.js"
      }
    },
    ready: function() {
      return console.log("Hello from Node!");
    }
  };
  hello.ready();
}).call(this);
