const base = require('airtable').base('appbpIvf5JUe2PCdH')
const express = require('express')
const path = require('path')


const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '.'))

let records

app.get('/', async (req, res) => {
  if (records) {
    console.log("cached")
    res.render("page", {
      records,
    })
  } else {
    console.log('fetching records')
    records = await base('Business Hours')
      .select({
        view: 'Grid view',
      })
      .firstPage()
    res.render('page', {
      records,
    })
    setTimeout(() => {
      console.log('clearing cache')
      records = null
    }, 10 * 1000)
  }
})

app.listen(3000, () => console.log('Server ready'))
