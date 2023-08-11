// let namaSiswa1 = "Bagus";
// let namaSiswa2 = "Guswandi";
// let namaSiswa3 = "Arsya";

// console.log(namaSiswa1);
// console.log(namaSiswa2);
// console.log(namaSiswa3);

// ! Array
// ? tabungan value kalian, dimana kalian bisa memiliki lebih dari satu value dalam satu variabel

// let namaSiswa = ["Bagus", "Guswandi", "Arsya"];
// console.log(namaSiswa);
// console.log(namaSiswa[1]);
// console.log(namaSiswa[2]);

// let nama = "Bagus";
// let alamat = "Tangerang";
// let umur = 24;

// console.log(nama);
// console.log(alamat);
// console.log(umur);

// ! Object
// ? tabungan variabel kalian, dimana kalian bisa memiliki lebih dari satu key-valuee dalam satu variabel
// ? contoh = nama: "Bagus", alamat: "Tangerang"
// ? dimana nama sebagai key dan  "Bagus" sebagai value

// let dataPersonal1 = {
//     nama: "Bagus",
//     alamat: "Tangerang",
//     umur:24
// };

// let dataPersonal2 = {
//     nama: "Guswandi",
//     alamat: "Padang",
//     umur: 20
// }

// let dataPersonal3 = {
//     nama: "Arsya",
//     alamat: "Karawang",
//     umur: 17
// }

// console.log(dataPersonal1);
// console.log(dataPersonal2.nama);
// console.log(dataPersonal3.umur);

// !Array of object
// ? Memperbolehkan kita menyimpan lebih dari satu object dalam satu variabel

// let dataPersonal = [
//     {
//         nama: "Bagus",
//         alamat: "Tangerang",
//         umur: 24,
//         hobi:["ngoding", "mancing", "tidur"]
//     },
//     {
//     nama: "Guswandi",
//     alamat: "Padang",
//     umur: 20
//     },
//     {
//     nama: "Arsya",
//     alamat: "Karawang",
//     umur: 17
//     }

// ]

// console.log(dataPersonal);
// console.log(dataPersonal[1]);
// console.log(dataPersonal[2].nama);


// let data = [];


// function addData(event){
//     let person = {
//         nama: "Maulana",
//         alamat: "Bandung",
//         umur: 24
//     };
//     // ? fungsi push adalah memasukkan data baru di dalam sebuah array
//     // ? sebagai contoh, data person akan dimasukkan kedalam array data
//     data.push(person);

//     console.log(data);
// }
// addData();

// let data = [];

// function addData(evenet){
//     event.preventDefault();

//     let blog = {
//         title: document.getElementById("input-blog-title").value,
//         content : document.getElementById("input-blog-content").value
//     };

//     data.push(blog);
//     console.log(data);
// }

let dataBlog = [];

function addBlog(event){
    event.preventDefault();

    let title = document.getElementById("input-blog-title").value;
    let content = document.getElementById("input-blog-content").value;
    let image =document.getElementById("input-blog-image").files;

    // icon
    const iconNodeJs = `<i class="fa-brands fa-node-js fa-xl"></i>`;
    const iconReactJs = `<i class="fa-brands fa-react fa-xl"></i>`;
    const iconJavaScript = `<i class="fa-brands fa-js fa-xl"></i>`;
    const iconHtml5 = `<i class="fa-brands fa-html5 fa-xl"></i>`;

    //check kondisi

  let checkNodeJS = document.getElementById("check-nodejs").checked
    ? iconNodeJs
    : "";
  let checkReactJS = document.getElementById("check-reactjs").checked
    ? iconReactJs
    : "";
  let checkJavaScript = document.getElementById("check-javascript").checked
    ? iconJavaScript
    : "";
  let checkHTML5 = document.getElementById("check-html5").checked
    ? iconHtml5
    : "";

    // durasi
  let startDate = document.getElementById("input-start").value;
  let endDate = document.getElementById("input-end").value;

  let startDateValue = new Date(startDate);
  let endDateValue = new Date(endDate);

  // ? hitung selisih

  let rentangWaktu = endDateValue.getTime() - startDateValue.getTime();
  let rentangHari = rentangWaktu / (1000 * 3600 * 24);
  let rentangMinggu = Math.floor(rentangHari / 7);
  let rentangBulan = Math.floor(rentangHari / 30);
  let distance = "";

  // ? kondisi

  if (rentangHari <= 6){
    distance = rentangHari + " Hari";
  } else if (rentangMinggu <= 3){
    distance = rentangMinggu + " Minggu";
  } else if (rentangBulan >= 1){
    distance = rentangBulan + " Bulan";
  }

    image = URL.createObjectURL(image[0]);
    console.log(image);

    let blog = {
        title,
        content,
        image,
        checkNodeJS,
        checkJavaScript,
        checkReactJS,
        checkHTML5,
        distance
    };



    dataBlog.push(blog);
    console.log(dataBlog);

    renderBlog();
}
// ?looping
// pada () for, value pertama adalah default value
// value kedua merupakan kondisi
// value ketiga akan berjalan ketika kondisi kedua true
    
    // for (let index = 0; index < dataBlog.length; index++){
    //     console.log(dataBlog[index]);
    // }

    function renderBlog(){
        document.getElementById("container-project-list").innerHTML = "";

        for (let index = 0; index < dataBlog.length; index++){
            console.log(dataBlog[index]);

            document.getElementById("container-project-list").innerHTML += `
    <div class="container-card-project">
                <div class="image-project-container">
                    <img id="image-project-list" class="image-project-list" src="${dataBlog[index].image}"/>
                </div>
                <div class="title-project">
                    <h3>${dataBlog[index].title}</h3>
                </div>
                <div class="duration-project">
                    <p>Duration ${dataBlog[index].distance} :</p>
                </div>
                <div class="description-project">
                    <p>${dataBlog[index].content}</p>
                </div>
                <div class="tech-card-container">
                    <div class="tech-project">
                        ${dataBlog[index].checkNodeJS}
                        ${dataBlog[index].checkJavaScript}
                        ${dataBlog[index].checkReactJS}
                        ${dataBlog[index].checkHTML5}
                    </div>
                </div>
                <div class="button-card-container">
                    <button type="button" id="edit-button">Edit</button>
                    <button type="button" id="delete-button">Delete</button>
                </div>
            </div>`;
        }
    }

    function dummyCard() {
  document.getElementById("container-project-list").innerHTML = "";

  for (let i = 0; i < 6; i++) {
    document.getElementById("container-project-list").innerHTML += `
        <div class="container-card-project">
        <div class="image-project-container">
            <img id="image-project-list" class="image-project-list" src="img/mob psycho3.png"/>
        </div>
        <div class="title-project">
            <h3><a href="blog-detail.html">Dumbways Fullstack</a></h3>
        </div>
        <div class="duration-project">
            <p>Duration : 3 Bulan</p>
        </div>
        <div class="description-project">
            <p>App that used for student, it was deployed and can downloaded on
              playstore. Happy Download</p>
        </div>
        <div class="tech-card-container">
            <div class="tech-project">
                <i class="fa-brands fa-node-js fa-xl"></i>
                <i class="fa-brands fa-js fa-xl"></i>
                <i class="fa-brands fa-react fa-xl"></i>
                <i class="fa-brands fa-html5 fa-xl"></i>
            </div>
        </div>
        <div class="button-card-container">
            <button type="button" id="edit-button">Edit</button>
            <button type="button" id="delete-button">Delete</button>
        </div>
        </div>
        `;
  }
}

dummyCard() 