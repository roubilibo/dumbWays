const express = require('express')
const app = express()
const PORT = 5000
const path = require('path')

// setup call hbs with sub folder
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

// set serving static file
app.use(express.static('src/assets'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

// routing
app.get('/', home)
app.get('/blog', blog)
app.post('/blog', addBlog)
app.get('/contact', contactMe)
app.get('/blog-detail/:id', blogDetail)
app.get('/form-blog', formBlog)
// app.post('/form-blog', addBlog)

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// index
function home(req, res) {
  res.render('index')
}


// blog
function blog(req, res) {
  res.render('blog')
}

// form blog
function formBlog(req, res) {
  res.render('form-blog')
}

// add a new blog
function addBlog(req, res) {
  const { title, content } = req.body

  console.log(title)
  console.log(content)

  res.redirect('/')
}

// contact me
function contactMe(req, res) {
  res.render('contact-me')
}

// blog detail
function blogDetail(req, res) {
  const { id } = req.params

  const data = {
    id,
    title: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
    content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir."
  }

  res.render('blog-detail', { data })
}
