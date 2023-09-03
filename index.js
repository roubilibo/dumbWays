const { log } = require("console");
const exp = require("constants");
const express = require("express");
const { get } = require("http");
const app = express();
const PORT = 5000;
const path = require("path");
const dateDuration = require("./src/helper/duration");
const moment = require("moment");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const upload = require("./src/middlewares/uploadFiles");
const fs = require("fs");

// sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const session = require("express-session");
const sequelize = new Sequelize(config.development);

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set serving static file
app.use(express.static("src/assets"));
app.use(express.static("src/uploads"));

// parsing data from client
app.use(express.urlencoded({ extended: false }));

// set up flash
app.use(flash());

// set up session
app.use(
	session({
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 1000 * 60 * 60 * 2, // menghitung durasi 2 jam
		},
		store: new session.MemoryStore(),
		saveUninitialized: true,
		resave: false,
		secret: "secretValue",
	})
);

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
app.post("/blog", upload.single("image"), addBlog);
app.get("/contact", contactMe);
app.get("/blog-detail/:id", blogDetail);
app.get("/delete-blog/:id", deleteBlog);
app.get("/edit-blog/:id", viewEditBlog);
app.post("/edit-blog/:id", upload.single("image"), updateBlog);

// login dan register
app.get("/register", formRegister);
app.post("/register", addUser);
app.get("/login", formLogin);
app.post("/login", userLogin);

app.get("/logout", logout);

// local server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// index
async function home(req, res) {
	try {
		let user = req.session.idUser;
		if (!user) {
			const query = `SELECT tb_projects.id, title, author, "content", "start_date", "end_date", html, css, js, njs, image, "postedAt", tb_projects."createdAt", tb_projects."updatedAt", tb_users.name AS author
				FROM public."tb_projects" 
				INNER JOIN tb_users
				ON tb_projects.author = tb_users.id
				ORDER BY tb_projects.id DESC;`;

			let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
			// console.log(obj);

			let dataBlogRes = obj.map((item) => {
				return {
					...item,
					duration: dateDuration(item.start_date, item.end_date),
					isLogin: req.session.isLogin,
					user: req.session.user,
				};
			});
			let loginCheck = {
				isLogin: req.session.isLogin,
				user: req.session.user,
			};

			res.render("index", { dataBlog: dataBlogRes, loginCheck });
		} else {
			user = user;
			const query = `SELECT tb_projects.id, title, author, "content", "start_date", "end_date", html, css, js, njs, image, "postedAt", tb_projects."createdAt", tb_projects."updatedAt", tb_users.name AS author
				FROM public."tb_projects" 
				INNER JOIN tb_users
				ON tb_projects.author = tb_users.id
				WHERE author = ${user}
				ORDER BY tb_projects.id DESC;`;

			let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
			// console.log(obj);

			let dataBlogRes = obj.map((item) => {
				return {
					...item,
					duration: dateDuration(item.start_date, item.end_date),
					isLogin: req.session.isLogin,
					user: req.session.user,
				};
			});
			let loginCheck = {
				isLogin: req.session.isLogin,
				user: req.session.user,
			};

			res.render("index", { dataBlog: dataBlogRes, loginCheck });
		}
	} catch (error) {
		console.log(error);
	}
}

// blog
function blog(req, res) {
	let loginCheck = {
		isLogin: req.session.isLogin,
		user: req.session.user,
	};
	res.render("blog", { loginCheck });
}

// form blog

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
		const query = `SELECT tb_projects.id, title, author, "content", "start_date", "end_date", html, css, js, njs, image, "postedAt", tb_projects."createdAt", tb_projects."updatedAt", tb_users.name AS author
				FROM public."tb_projects" 
				INNER JOIN tb_users
				ON tb_projects.author = tb_users.id 
				WHERE tb_projects.id = ${id};`;
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });
		// console.log(obj);

		let dataProjectRes = obj.map((item) => {
			return {
				...item,
				startDate: moment(item.start_date).format("YYYY-MM-DD"),
				endDate: moment(item.end_date).format("YYYY-MM-DD"),
				duration: dateDuration(item.startDate, item.endDate),
				isLogin: req.session.isLogin,
				idUser: req.session.idUser,
				user: req.session.user,
			};
		});
		let loginCheck = {
			isLogin: req.session.isLogin,
			idUser: req.session.idUser,
			user: req.session.user,
		};
		res.render("blog-detail", { blog: dataProjectRes[0], loginCheck });
	} catch (error) {
		console.log(error);
	}
}

async function addBlog(req, res) {
	try {
		const { title, content, startDate, endDate, html, css, js, njs } = req.body;
		const author = req.session.idUser;
		const image = req.file.filename;
		const htmlCheck = html ? true : false;
		const cssCheck = css ? true : false;
		const jsCheck = js ? true : false;
		const njsCheck = njs ? true : false;
		await sequelize.query(`INSERT INTO tb_projects(title, content, author, start_date, end_date, html, css, js, njs, image, "postedAt", "createdAt", "updatedAt")
	VALUES ('${title}', '${content}', ${author}, '${startDate}', '${endDate}', '${htmlCheck}', '${cssCheck}', '${jsCheck}', '${njsCheck}', '${image}', NOW(), NOW(), NOW());`);
		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
}
// view edit Blog with index/id
async function viewEditBlog(req, res) {
	const { id } = req.params;
	try {
		let loginCheck = {
			isLogin: req.session.isLogin,
			user: req.session.user,
		};
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
		res.render("edit-blog", { edit: obj[0], loginCheck });
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
		const image = req.file ? req.file.filename : null;

		// Get old image dari uploads
		const oldImage = `SELECT image FROM "tb_projects" WHERE id = '${id}'`;
		const [oldImageResult] = await sequelize.query(oldImage);
		const oldImageFilename = oldImageResult[0].image;

		// Delete old image dari uploads jika ada diganti dengan image baru
		if (image) {
			fs.unlinkSync(`src/uploads/${oldImageFilename}`);
		}

		await sequelize.query(
			`UPDATE "tb_projects"
					SET
						title = '${title}',
						content = '${content}',
						start_date = '${startDate}',
						end_date = '${endDate}',
						"html" = ${htmlCheck},
						"css" = ${cssCheck},
						"js" = ${jsCheck},
						"njs" = ${njsCheck},
						${image ? `image = '${image}',` : ""}
						"updatedAt" = NOW()
					WHERE
						id = ${id};`
		);
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

// fungsi register
async function addUser(req, res) {
	try {
		const { name, email, password } = req.body;
		const salt = 10;

		// cek email
		const checkEmail = `SELECT * FROM "tb_users" WHERE email = '${email}'`;
		const [oldEmail] = await sequelize.query(checkEmail);
		const oldEmailName = oldEmail[0].email;
		console.log(oldEmailName);
		if (oldEmailName === email) {
			req.flash("danger", "email tidak boleh sama");
			return res.redirect("/register");
		}

		await bcrypt.hash(password, salt, (err, hashPassword) => {
			const query = `INSERT INTO "tb_users" (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`;

			sequelize.query(query);
			res.redirect("login");
		});
	} catch (error) {
		console.log(error);
	}
}

// fungsi User login
async function userLogin(req, res) {
	try {
		const { email, password } = req.body;
		const query = `SELECT * FROM "tb_users" WHERE email = '${email}'`;
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

		// console.log(obj);

		// checking if email has not been registered
		if (!obj.length) {
			req.flash("danger", "user has not been registered");
			return res.redirect("/login");
		}

		await bcrypt.compare(password, obj[0].password, (err, result) => {
			if (!result) {
				req.flash("danger", "password wrong");
				return res.redirect("/login");
			} else {
				req.session.isLogin = true;
				req.session.idUser = obj[0].id;
				req.session.user = obj[0].name;
				req.flash("success", "login success");
				res.redirect("/");
			}
		});
	} catch (error) {
		console.log(error);
	}
}

async function logout(req, res) {
	try {
		req.session.destroy();

		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
}
