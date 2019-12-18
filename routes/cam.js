const express = require('express');
const spawn = require('child_process').spawn;
const router = express.Router();
 
const child = spawn(
  '/opt/vc/bin/raspivid', 
  ['-hf', '-w', '1280', '-h', '1024', '-t', '999999999', '-fps', '20', '-b', '5000000', '-o', '-']
);

router.post('/watch', async (req, res) => {
  child.stdout.pipe(res);
});
 
module.exports = router; 