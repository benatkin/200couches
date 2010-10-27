(function() {
  var Hello;
  var __hasProp = Object.prototype.hasOwnProperty;
  Hello = {
    attachments: {
      "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js",
      "backbone-min.js": "http://documentcloud.github.com/backbone/backbone-min.js"
    },
    layout: {
      scripts: {
        "jquery.js": "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js",
        "underscore.js": "_attachments/underscore-min.js",
        "backbone.js": "_attachments/backbone-min.js"
      }
    },
    init: function() {
      this.Starter.root = (this.Starter.parent = this);
      return this.Starter.start();
    },
    requires: {
      "backbone": true
    },
    Starter: {
      doc: "Starter downloads some needed files and initializes and starts Pusher.",
      activate: function() {
        var Backbone;
        this.root.requires.underscore = require('./underscore-min.js');
        this.root.requires.backbone = require('./backbone-min.js');
        Backbone = this.root.requires.backbone;
        return (this.root.Starter = Backbone.Model.extend(this));
      },
      download: function(files, remaining) {
        var chunks, file, request, self, server, url;
        if (remaining.length === 0) {
          this.activate();
          return new this.root.Starter();
        }
        file = remaining[0];
        url = this.url.parse(files[file]);
        console.log("Downloading " + (url.pathname) + " from " + (url.hostname));
        chunks = [];
        self = this;
        server = this.http.createClient(url.port || 80, url.hostname);
        request = server.request('GET', url.pathname, {
          'host': url.hostname
        });
        request.end();
        return request.on('response', function(response) {
          response.setEncoding('utf8');
          response.on('data', function(chunk) {
            return chunks.push(chunk);
          });
          return response.on('end', function() {
            self.fs.writeFileSync(file, chunks.join(''));
            return self.download(files, remaining.slice(1));
          });
        });
      },
      initialize: function() {
        return console.log("Hello from Backbone.js!");
      },
      start: function() {
        var _ref, file, files, remaining, url;
        this.url = require('url');
        this.http = require('http');
        this.fs = require('fs');
        files = this.root.attachments;
        remaining = [];
        _ref = files;
        for (file in _ref) {
          if (!__hasProp.call(_ref, file)) continue;
          url = _ref[file];
          remaining.push(file);
        }
        return this.download(files, remaining);
      }
    }
  };
  Hello.init();
}).call(this);
