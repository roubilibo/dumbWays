// console.log("Hello World");
// alert("Selamat Pagi");
// document.write("Hello Batch 49")
// function hello(){
//     let satu = 50;
//     let dua = 20;

//     let result = satu + dua;

//     console.log(result);

// }
// hello();

// function Hello(satu, dua){
//     let result = satu +dua;
//     console.log(result);
// }

// Hello(50, 20);

function submitData() {
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let phone = document.getElementById("phone").value;
	let subject = document.getElementById("subject").value;
	let description = document.getElementById("description").value;

	if (name == "") {
		return alert("nama harus diisi");
	} else if (email == "") {
		return alert("email harus diisi");
	} else if (phone == "") {
		return alert("phone harus diisi");
	} else if (subject == "") {
		return alert("subject harus diisi");
	} else if (description == "") {
		return alert("description harus diisi");
	}

	//     console.log(name);
	//     console.log(email);
	//     console.log(phone);
	//     console.log(subject);
	//     console.log(message);
	let emailReceiver = "roubilridlo@gmail.com";
	let a = document.createElement("a");
	alert(
		(a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}, silahkan kontak saya pada nomor ${phone}`)
	);
	// a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}, silahkan kontak saya pada nomor ${phone}`;
	// alert(
	// 	(a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailReceiver}&su=${subject}&body=Halo, nama saya ${name}, ${message}, Silahkan kontak saya pada nomor ${phone}`)
	// );
	a.click();

	let data = { name, email, phone, subject, message };
	console.log(data);
}
