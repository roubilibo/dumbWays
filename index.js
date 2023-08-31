const { log } = require("console");
const exp = require("constants");
const express = require("express");
const { get } = require("http");
const app = express();
const PORT = 5000;
const path = require("path");
const dateDuration = require("./src/helper/duration");
const moment = require("moment");

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

// login dan register
app.get("/register", formRegister);
// app.post("/register", addUser);
app.get("/login", formLogin);
// app.post("/login", userLogin);

// local server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// index
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
async function deleteBlog(req, res) {
	const { id } = req.params;
	try {
		await sequelize.query(`DELETE FROM "tb_projects" WHERE id=${id}`);
		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
}

// blog detail
async function blogDetail(req, res) {
	try {
		const { id } = req.params;
		const query = `SELECT * FROM "tb_projects" WHERE id = ${id};`;
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
		// console.log(obj);

		res.render("blog-detail", { blog: obj[0] });
	} catch (error) {
		console.log(error);
	}
}

async function addBlog(req, res) {
	try {
		const { title, content, author, startDate, endDate, html, css, js, njs } =
			req.body;
		const image = "image.png";
		const htmlCheck = html ? true : false;
		const cssCheck = css ? true : false;
		const jsCheck = js ? true : false;
		const njsCheck = njs ? true : false;
		await sequelize.query(`INSERT INTO tb_projects(title, content, author, start_date, end_date, html, css, js, njs, image, "postedAt", "createdAt", "updatedAt")
	VALUES ('${title}', '${content}', '${author}', '${startDate}', '${endDate}', '${htmlCheck}', '${cssCheck}', '${jsCheck}', '${njsCheck}', '${image}', NOW(), NOW(), NOW());`);
		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
}
// view edit Blog with index/id
async function viewEditBlog(req, res) {
	const { id } = req.params;
	try {
		const query = `SELECT * FROM "tb_projects" WHERE id=${id};`;
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
		// console.log(obj);

		obj = obj.map((item) => {
			return {
				...item,
				startDate: moment(item.start_date).format("YYYY-MM-DD"),
				endDate: moment(item.end_date).format("YYYY-MM-DD"),
			};
		});
		res.render("edit-blog", { edit: obj[0] });
	} catch (error) {
		console.log(error);
	}
}

// edit blog
async function updateBlog(req, res) {
	try {
		const { id } = req.params;
		const { title, content, startDate, endDate, html, css, js, njs } = req.body;
		const htmlCheck = html ? true : false;
		const cssCheck = css ? true : false;
		const jsCheck = js ? true : false;
		const njsCheck = njs ? true : false;
		await sequelize.query(`UPDATE "tb_projects" 
        SET 
            title = '${title}', 
            content = '${content}', 
            start_date = '${startDate}', 
            end_date = '${endDate}', 
            "html" = ${htmlCheck},
            "css" = ${cssCheck},
            "js" = ${jsCheck},
            "njs" = ${njsCheck},
            "postedAt" = NOW(), 
            "createdAt" = NOW(), 
            "updatedAt" = NOW() 
        WHERE 
            id = ${id}
        ;`);
		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
}

// tampil form register
function formRegister(req, res) {
	res.render("register");
}

// tampil form login
function formLogin(req, res) {
	res.render("login");
}
