const { log } = require('console')
const exp = require('constants')
const express = require('express')
const { get } = require('http')
const app = express()
const PORT = 5000
const path = require('path')
// const dateDuration = require('./src/helper/duration');

// setup call hbs with sub folder
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

// set serving static file
app.use(express.static('src/assets'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

let dataBlog = [
  {
    id: 1,
    title: "Ini hari jumat",
    content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir.",
    author: "Rebbeca Eltra",
    startDate : "2023-08-10",
    endDate : "2023-08-10",
    html : true,
    css : true,
    js : false,
    njs : false,
    postedAt: new Date()
  },
  {
    id: 2,
    title: "Hari ini laptop jadi berat",
    content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir.",
    author: "Jhon doe",
    startDate : "2023-08-10",
    endDate : "2023-08-10",
    html : true,
    css : true,
    js : false,
    njs : false,
    postedAt: new Date()
  },
  {
    id: 3,
    title: "Hari ini aku bahagia sekali",
    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil amet adipisci dolores reiciendis placeat non iusto libero similique accusantium, cupiditate magni fugit, excepturi asperiores odio minima? Non ullam dolores quia.",
    author: "Roubilibo",
    startDate : "2023-08-10",
    endDate : "2023-08-10",
    html : true,
    css : true,
    js : false,
    njs : false,
    postedAt: new Date()
  }
]


// routing
app.get('/', home)
app.get('/blog', blog)
app.post('/blog', addBlog)
app.get('/contact', contactMe)
app.get('/blog-detail/:id', blogDetail)
app.get('/form-blog', formBlog)
app.get('/delete-blog/:id', deleteBlog)
app.get('/edit-blog/:id', viewEditBlog)
app.post('/edit-blog/:id', updateBlog)
// app.post('/form-blog', addBlog)

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// index
function home(req, res) {

  // let dataBlogRes = dataBlog.map((item) => {
  //       return {
  //           ...item,
  //           duration: dateDuration(item.startDate, item.endDate)
  //       }
  //   })
  res.render('index', { dataBlog })
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
// function addBlog(req, res) {
//   const { title, content } = req.body

//   console.log(title)
//   console.log(content)

//   res.redirect('/')
// }

// contact me
function contactMe(req, res) {
  res.render('contact-me')
}

// blog detail lama
// function blogDetail(req, res) {
//   const { id } = req.params

//   const data = {
//     id,
//     title: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
//     content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir."
//   }

//   res.render('blog-detail', { data })
// }

//delete blog 
function deleteBlog(req, res) {
  const { id } = req.params

  dataBlog.splice(id, 1)
  res.redirect('/')
}

// blog detail
function blogDetail(req, res) {
  const { id } = req.params

  res.render('blog-detail', { blog: dataBlog[id] })
}

// add a new blog
function addBlog(req, res) {
  const { title, content } = req.body

  const data = {
    title : title,
    content : content,
    // startDate : startDate,
    // endDate : endDate,
    // html : html,
    // css : css,
    // js : js,
    // njs : njs,
    image: "image.png",
    author: "Roubilibo",
    postedAt: new Date()
  }

  dataBlog.push(data)
  res.redirect('/')
}

// view edit Blog with index/id
function viewEditBlog(req, res) {
  const  { id }  = req.params

  res.render('edit-blog', {edit: dataBlog[id] })
}

// edit blog
function updateBlog(req, res) {
  const { id } = req.params;
  // const data = dataBlog.find((item) => item.id == id);
  // const {title, content, postedAt} = req.body
  const { title, content } = req.body
  let updateData = {
    title : title,
    content : content,
    // startDate : startDate,
    // endDate : endDate,
    // html : html,
    // css : css,
    // js : js,
    // njs : njs,
    image: "image.png",
    author: "Roubilibo",
    postedAt: new Date()
    }
  // data.title = title
  // data.content = content
  // data.image = "image.png"
  // data.author = "Roubilibo"
  // data.postedAt = postedAt

  // let newArr = dataBlog.filter((item) => item.id != id);
  // newArr.push(data)
  // newArr.sort((a,b) =>{
  //   return a.id - b.id
  // })
  // dataBlog = newArr
    dataBlog= dataBlog.filter((item) =>{
        return item.id != id
    })
    dataBlog.push(updateData)
  res.redirect("/");
}