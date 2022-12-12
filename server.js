const express = require('express');
var pdfFillForm = require('pdf-fill-form');
var PDFLib = require('pdf-lib')
const { PDFDocument, rgb, StandardFonts } = PDFLib
const { writeFileSync, readFileSync } = require("fs");
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
  modifyPDF()
});

// pdf-lib package if we don't have field form id in pdf 

async function modifyPDF() {
  const document = await PDFDocument.load(readFileSync("./Certificate.pdf"));

  const courierBoldFont = await document.embedFont(StandardFonts.Courier);
  const firstPage = document.getPage(0);
  const { width, height } = firstPage.getSize()
  const bc_id = "23jh23h4kdFG322324FDg3232"

  firstPage.moveTo(width - 300, height- height + 30);
  firstPage.drawText('Token: ' + bc_id, {
    font: courierBoldFont,
    size: 12,
    lineHeight: 10,
  });

  writeFileSync("with_hash.pdf", await document.save());
}

modifyPDF().catch((err) => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })