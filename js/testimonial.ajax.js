const testimonialData = new Promise((resolve, reject) => {
  const ajax = new XMLHttpRequest();

  ajax.open("GET", "https://api.npoint.io/fe723cd13fa0337086c2", true);

  ajax.onload = function () {
    if (ajax.status === 200) {
      resolve(JSON.parse(ajax.responseText));
    } else {
      reject("Error!");
    }
  };

  ajax.onerror = function () {
    reject("Error!");
  };

  ajax.send();
});

async function allTestimonials() {
  try {
    const response = await testimonialData;
    console.log(response);

    let testimonialHTML = "";

    response.forEach((item) => {
      testimonialHTML += `
        <div class="testimonial">
          <img src="${item.image}" class="profile-testimonial" />
          <p class="quote">${item.quote}</p>
          <hr>
          <p class="author">- ${item.author}</p>
          <p class="author">${item.rating}<i class="fa-solid fa-star"></i></p>
        </div>
      `;
    });

    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (err) {
    console.log(err);
  }
}

allTestimonials();

async function filterTestimonials(rating) {
  try {
    const response = await testimonialData;
    let testimonialHTML = "";

    const testimonialFiltered = response.filter(function (data) {
      return data.rating === rating;
    });

    if (testimonialFiltered.length === 0) {
      testimonialHTML = `<h1>Data not found!</h1>`;
    } else {
      testimonialFiltered.forEach(function (item) {
        testimonialHTML += `
          <div class="testimonial">
            <img src="${item.image}" class="profile-testimonial" />
            <p class="quote">${item.quote}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating}<i class="fa-solid fa-star"></i></p>
          </div>
        `;
      });
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (err) {
    console.log(err);
  }
}
