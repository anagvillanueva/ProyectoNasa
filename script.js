// API KEY ZGs1GgOR1IytmpbhVETfeDJIXZMA0N30CfZ7RdAc


async function sendApodRequest() {
  let UrlAPOD = "https://api.nasa.gov/planetary/apod?api_key=";
  let API_KEY = "ZGs1GgOR1IytmpbhVETfeDJIXZMA0N30CfZ7RdAc";
  let dateInput = document.querySelector("#datepicker");
  let title = document.querySelector("#title");
  let mediaSection = document.querySelector("#media-section");
  let information = document.querySelector("#description");

  const currentDate = new Date().toISOString().slice(0, 10);

  const imgSection = 
      `<a id="hdimg" href="" target="-blank">
      <div class="image-div">
      <img id="image_of_the_day" src="">
      </div>
      </a>`;

  const vdSection = 
      `<div class="video-div"> 
      <iframe id="videoLink" src="" frameborder="0">
      </iframe></div>`;

  let newDate = "&date=" + dateInput.value + "&";

  function fetchData() {
    try {
      fetch(UrlAPOD + API_KEY + newDate)
        .then((response) => response.json())
        .then((json) => {
          displayD(json);
        });
    } catch (error) {
      console.log(error);
    }
  }

function displayD(data) {
    title.innerHTML = data.title;
    date.innerHTML = data.date;
    dateInput.max = currentDate;
    
    if (data.media_type == "video") {
      mediaSection.innerHTML = vdSection;
      document.getElementById("videoLink").src = data.url;
    } else {
      mediaSection.innerHTML = imgSection;
      document.getElementById("hdimg").href = data.hdurl;
      document.getElementById("image_of_the_day").src = data.url;
    }
    information.innerHTML = data.explanation;
  }
  fetchData();
}

function getDates(date) {
  let formatDate = new Date(date);
  let dateArray = []

  dateArray.push(lessDaysToDate(formatDate, 1));
  dateArray.push(formatDate);

  for (let i = 1; i < 4; i++) {
    dateArray.push(addDaysToDate(formatDate, i))
  }

  console.log(dateArray);
}

function addDaysToDate(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function lessDaysToDate(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}


const dateInput = document.querySelector("#datepicker");
dateInput.addEventListener("change", (e) => {
  e.preventDefault();
  sendApodRequest();
});

