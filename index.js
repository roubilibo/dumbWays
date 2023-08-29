const { log } = require("console");
const exp = require("constants");
const express = require("express");
const { get } = require("http");
const app = express();
const PORT = 5000;
const path = require("path");
const dateDuration = require("./src/helper/duration");

// sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set serving static file
app.use(express.static("src/assets"));

// parsing data from client
app.use(express.urlencoded({ extended: false }));

// let dataBlog = [
// 	{
// 		id: 1,
// 		title: "Ini hari jumat",
// 		content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir.",
// 		author: "Rebbeca Eltra",
// 		startDate : "2023-08-10",
// 		endDate : "2023-09-10",
// 		html : true,
// 		css : true,
// 		js : false,
// 		njs : false,
// 		postedAt: new Date()
// 	},
// 	{
// 		id: 2,
// 		title: "Hari ini laptop jadi berat",
// 		content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir.",
// 		author: "Jhon doe",
// 		startDate : "2023-08-10",
// 		endDate : "2023-10-10",
// 		html : true,
// 		css : true,
// 		js : false,
// 		njs : false,
// 		postedAt: new Date()
// 	},
// 	{
// 		id: 3,
// 		title: "Hari ini aku bahagia sekali",
// 		content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil amet adipisci dolores reiciendis placeat non iusto libero similique accusantium, cupiditate magni fugit, excepturi asperiores odio minima? Non ullam dolores quia.",
// 		author: "Roubilibo",
// 		startDate : "2023-08-10",
// 		endDate : "2023-11-10",
// 		html : false,
// 		css : false,
// 		js : true,
// 		njs : true,
// 		postedAt: new Date()
// 	}
// ]

// routing
app.get("/", home);
app.get("/blog", blog);
app.post("/blog", addBlog);
app.get("/contact", contactMe);
app.get("/blog-detail/:id", blogDetail);
app.get("/form-blog", formBlog);
app.get("/delete-blog/:id", deleteBlog);
app.get("/edit-blog/:id", viewEditBlog);
app.post("/edit-blog/:id", updateBlog);
// app.post('/form-blog', addBlog)

// local server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// index
// function home(req, res) {

// 	let dataBlogRes = dataBlog.map((item) => {
// 				return {
// 						...item,
// 						duration: dateDuration(item.startDate, item.endDate)
// 				}
// 		})
// 	res.render('index', { dataBlog: dataBlogRes })
// }

async function home(req, res) {
	try {
		const query = `SELECT id, title, author, "content", "start_date", "end_date", html, css, js, njs, author, "postedAt", "createdAt", "updatedAt"
        FROM public."tb_projects";`;

		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
		// console.log(obj);

		let dataBlogRes = obj.map((item) => {
			return {
				...item,
				duration: dateDuration(item.start_date, item.end_date),
			};
		});

		res.render("index", { dataBlog: dataBlogRes });
	} catch (error) {
		console.log(error);
	}
}

// blog
function blog(req, res) {
	res.render("blog");
}

// form blog
function formBlog(req, res) {
	res.render("form-blog");
}

// contact me
function contactMe(req, res) {
	res.render("contact-me");
}

//delete blog
function deleteBlog(req, res) {
	const { id } = req.params;

	dataBlog.splice(id, 1);
	res.redirect("/");
}

// blog detail
function blogDetail(req, res) {
	const { id } = req.params;

	res.render("blog-detail", { blog: dataBlog[id] });
}

// add a new blog
function addBlog(req, res) {
	const { title, author, content, startDate, endDate, html, css, js, njs } =
		req.body;

	const data = {
		id: new Date().getTime(),
		title: title,
		author: author,
		content: content,
		startDate: startDate,
		endDate: endDate,
		html: html,
		css: css,
		js: js,
		njs: njs,
		image: "image.png",
		postedAt: new Date(),
	};

	dataBlog.push(data);
	res.redirect("/");
}

// view edit Blog with index/id
function viewEditBlog(req, res) {
	const { id } = req.params;

	res.render("edit-blog", { edit: dataBlog[id] });
}

// edit blog
function updateBlog(req, res) {
	const { id } = req.params;
	const { title, content, author, startDate, endDate, html, css, js, njs } =
		req.body;
	let updateData = {
		id: id,
		title: title,
		content: content,
		author: author,
		startDate: startDate,
		endDate: endDate,
		html: html,
		css: css,
		js: js,
		njs: njs,
		image: "image.png",
		postedAt: new Date(),
	};
	dataBlog = dataBlog.filter((item) => {
		return item.id != id;
	});
	dataBlog.push(updateData);
	res.redirect("/");
}
