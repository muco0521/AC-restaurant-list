const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((item) => item.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const filteredRestaurants = restaurantList.results.filter(
    (item) => 
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) 
  )
  res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
})


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}` )
})

