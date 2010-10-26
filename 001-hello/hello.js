(function() {
  var Hello;
  var __hasProp = Object.prototype.hasOwnProperty;
  Hello = {
    layout: {
      scripts: {
        "jquery.js": "https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js",
        "underscore.js": true,
        "backbone.js": true
      }
    },
    files: {
      "underscore-min.js": "http://documentcloud.github.com/underscore/underscore-min.js",
      "backbone-min.js": "http://documentcloud.github.com/backbone/backbone-min.js"
    },
    Pusher: {
      download: function(files, remaining) {
        var file;
        if (remaining.length === 0) {
          return null;
        }
        file = remaining[0];
        console.log("Downloading " + (file));
        return this.download(files, remaining.slice(1));
      },
      push: function() {
        var _ref, file, files, remaining, url;
        files = this.root.files;
        remaining = [];
        _ref = files;
        for (file in _ref) {
          if (!__hasProp.call(_ref, file)) continue;
          url = _ref[file];
          remaining.push(file);
        }
        return this.download(this.root.files, remaining);
      }
    },
    init: function() {
      this.Pusher.root = (this.Pusher.parent = this);
      return this.Pusher.push();
    }
  };
  Hello.init();
}).call(this);
