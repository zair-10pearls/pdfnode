const express = require('express');
var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');

const app = express();
const port = 3000;
var bc_id = "da39a3ee5e6b4b0d3255bfef2fio32k342lkoekcZ"
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(port, function(){
  console.log('LOG - Node js Express js Tutorial');
  
// input.pdf file we are getting this from
// Use here the field names you got from read
var pdf = pdfFillForm.writeSync('input.pdf',
	{ "bc_id": bc_id }, { "save": "pdf" } );
  fs.writeFileSync('output.pdf', pdf);

  pdfFillForm.read('input.pdf')
  .then(function(result) {
      console.log(result);
  }, function(err) {
    console.log(err);
  });
});filled_test

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname,'public', 'index.html'));
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })