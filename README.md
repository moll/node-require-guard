Require Guard for Node.js
=========================
[![NPM version](https://badge.fury.io/js/require-guard.png)](http://badge.fury.io/js/require-guard)
[![Build status](https://travis-ci.org/moll/node-require-guard.png)](https://travis-ci.org/moll/node-require-guard)

Require Guard is a library for Node.js that **prevents** files from being required and loaded **more than once**.

When you find yourself **fighting code-reloaders** or **test runners** like Mocha to **stop reloading** your slow initialization code each cycle, and no one else can help, maybe you can hire the **Require Guard**.

*"Hey, but doesn't Node.js' `require` itself not require files twice?"*  
Yes, but those pesky code-reloaders and test runners, for your own good, unload everything between [test] cycles to keep things fresh. For such cases Require Guard is the sliced bread beneath your toast. Run that external process or slow op once and not worry that it gets run again.


Using the Guard
---------------
Install with: `npm install require-guard`

Then you have 3 ways:

1. Prevent the current file from being reloaded:
   ```javascript
   require("require-guard")()
   ```

2. Prevent an *already loaded* library (also takes an array) from being reloaded:
   ```javascript
   require("selenium-webdriver")
   require("require-guard")("selenium-webdriver")
   ```

3. Prevent an *already loaded* file (also takes an array) from being reloaded:
   ```javascript
   require("./start-browser")
   require("require-guard")("./start-browser")
   ```


### Example of guarding Selenium WebDriver with Mocha attacking 

As an example, let's say you're using [Mocha](http://visionmedia.github.com/mocha/) with [Selenium WebDriver](https://code.google.com/p/selenium/wiki/WebDriverJs). Because Selenium starts up as fast as an [old Lada engine](http://youtu.be/smndCQGZCLk), you'll want to boot it up once when starting Mocha's watcher and then get on your merry way with testing.

`./test/browser.js`:
```javascript
require("require-guard")()
var WebDriver = require("selenium-webdriver")
module.exports = new WebDriver.Builder().build()
```

`./test/test.js`:
```javascript
var browser = require("./browser")
describe("The Internet", function() { ... })
```

Then, while `mocha --watch` reruns and reruns your tests, your browser will remain open and will get reused.


License to Kill
---------------
Require Guard is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


Dossier
-------
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](https://mondayapp.com) supported the engineering work.

If you find Require Guard has muscles that need improving, please type to me at [andri@dot.ee](mailto:andri@dot.ee) or [create an issue](https://github.com/moll/node-require-guard/issues).
