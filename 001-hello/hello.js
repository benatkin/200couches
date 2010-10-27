(function() {
  var Hello;
  var __hasProp = Object.prototype.hasOwnProperty;
  Hello = {
    attachments: {
      "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js",
      "backbone-min.js": "http://documentcloud.github.com/backbone/backbone-min.js"
    },
    init: function() {
      this.Starter.root = (this.Starter.parent = this);
      return this.Starter.start();
    },
    layout: {
      scripts: {
        "jquery.js": "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js",
        "underscore.js": "_attachments/underscore-min.js",
        "backbone.js": "_attachments/backbone-min.js"
      }
    },
    requires: {
      _order: ['underscore', 'backbone'],
      backbone: './_attachments/backbone-min.js',
      fs: true,
      http: true,
      underscore: './_attachments/underscore-min.js',
      url: true
    },
    Starter: {
      doc: "Starter downloads some needed files and initializes and starts Pusher.",
      activate: function() {
        var Backbone;
        Backbone = this.lib.backbone;
        return (this.root.Starter = Backbone.Model.extend(this));
      },
      download: function(files, remaining) {
        var chunks, file, filepath, request, self, server, url;
        if (remaining.length === 0) {
          this.require();
          this.activate();
          return new this.root.Starter();
        }
        file = remaining[0];
        filepath = '_attachments/' + file;
        url = this.lib.url.parse(files[file]);
        console.log("Downloading " + (url.pathname) + " from " + (url.hostname));
        chunks = [];
        self = this;
        server = this.lib.http.createClient(url.port || 80, url.hostname);
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
            self.lib.fs.writeFileSync(filepath, chunks.join(''));
            return self.download(files, remaining.slice(1));
          });
        });
      },
      initialize: function() {
        return console.log("Hello from Backbone.js!");
      },
      mkdir: function() {
        var dir, stat;
        dir = './_attachments';
        stat = this.lib.fs.statSync('.');
        try {
          return this.lib.fs.mkdirSync(dir, stat.mode);
        } catch (error) {
          return null;
        }
      },
      require: function() {
        var _i, _len, _ref, _result, key, value;
        if (this.lib.fs === true) {
          this.lib.fs = require('fs');
        }
        _ref = this.lib._order;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          value = this.lib[key];
          if (value === true) {
            this.lib[key] = require(key);
          } else if (value.substring) {
            try {
              if (this.lib.fs.statSync(value).isFile()) {
                this.lib[key] = require(value);
              }
            } catch (error) {
              null;
            }
          }
        }
        _ref = this.lib;
        for (key in _ref) {
          if (!__hasProp.call(_ref, key)) continue;
          value = _ref[key];
          if (value === true) {
            this.lib[key] = require(key);
          }
        }
        _result = []; _ref = this.lib;
        for (key in _ref) {
          if (!__hasProp.call(_ref, key)) continue;
          value = _ref[key];
          _result.push((function() {
            if (value.substring) {
              try {
                return this.lib.fs.statSync(value).isFile() ? (this.lib[key] = require(value)) : null;
              } catch (error) {
                return null;
              }
            }
          }).call(this));
        }
        return _result;
      },
      start: function() {
        var _ref, file, files, key, remaining, url, value;
        this.lib = {};
        _ref = this.root.requires;
        for (key in _ref) {
          if (!__hasProp.call(_ref, key)) continue;
          value = _ref[key];
          this.lib[key] = value;
        }
        this.require();
        files = this.root.attachments;
        remaining = [];
        _ref = files;
        for (file in _ref) {
          if (!__hasProp.call(_ref, file)) continue;
          url = _ref[file];
          remaining.push(file);
        }
        this.mkdir();
        return this.download(files, remaining);
      }
    }
  };
  Hello.init();
}).call(this);
