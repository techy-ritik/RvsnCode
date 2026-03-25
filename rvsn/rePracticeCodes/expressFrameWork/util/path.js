const path = require('path');


module.exports = path.dirname(process.mainModule.filename);  // here process.mainModule.filename directly identify the parent directory of the file from which we are sending file automatically and add it in the path so that we don't need to mover to upper level folders for navigating to the file which we want to send