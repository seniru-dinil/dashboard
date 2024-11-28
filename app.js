const input = document.getElementById("input");
const date = document.getElementById("date");
const locatoin = document.getElementById("location");
const temp = document.getElementById("temp");
const detail = document.getElementById("detail");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const uv = document.getElementById("uv");
const cloud = document.getElementById("cloud");
const rise = document.getElementById("rise");
const feels = document.getElementById("feels");
const alert_box = document.getElementById("alert-box");
const alert_section = document.getElementById("alert-section");
const card_section = document.getElementById("card-section");
handleWhether();

function handleWhether() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWhether(`${lat},${lon}`);
      },
      (error) => {
        console.error("Error getting location:", error);
        fetchWhether("Colombo");
      }
    );
  } else {
    fetchWhether("Colombo");
  }
}

async function fetchWhether(value) {
  input.value = "";
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=4a100227f2ff4be182943627242711&q=${value}&days=5`,
    requestOptions
  );
  const data = await res.json();
  try {
    data.error.code == 1006;
    if (data.error.code == 1006) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No matching location found.!",
      });
      return;
    }
  } catch (TypeError) {
    date.innerText = data.location.localtime;
    locatoin.innerText = data.location.name;
    temp.innerText = Math.round(data.current.temp_c) + " °C";
    detail.innerText = data.current.condition.text;
    wind.innerHTML =
      `<div class="d-flex align-items-center gap-1 mx-3">
        <h3 class="fs-1 fw-semibold">${data.current.wind_kph}</h3>` +
      `<span class="opacity-50 fs-6"> Km/h</span>
      </div>`;
    uv.innerHTML =
      `<h3 class="fs-1 fw-semibold">${data.current.uv}</h3>` +
      `<span class="opacity-50 fs-6">uv</span>`;
    rise.innerHTML = `<h3 class="fs-1 fw-semibold">${data.forecast.forecastday[0].astro.sunrise}</h3>`;

    humidity.innerHTML = `${data.current.humidity} <span class="opacity-50 fs-6">%</span>`;
    cloud.innerHTML = `${data.current.cloud}`;
    feels.innerHTML = `${data.current.feelslike_c} <span class="opacity-50 fs-6">°C</span>`;
    let arr = [];
    data.forecast.forecastday.forEach((day) => {
      arr.push(day.day.maxtemp_c);
    });
    newArr = arr.map((temp) => Math.round(temp));
    console.log(arr);

    card_section.innerHTML = `
<div class="day-card">
            <div class="day-img"><img src="img/raining.png" alt="" /></div>
            <h6 class="h6 text-center m-0 fs-6 opacity-75 mt-3" id="name">
              Monday
              <h6 class="day-temp text-center mt-1 opacity-75">${newArr[0]}°C</h6>
            </h6>
          </div>
          <div class="day-card">
            <div class="day-img"><img src="img/rainy-day.png" alt="" /></div>
            <h6 class="h6 text-center m-0 fs-6 opacity-75 mt-3" id="name">
              Tuesday
            </h6>
            <h6 class="day-temp text-center mt-1 opacity-75">${newArr[1]}°C</h6>
          </div>
          <div class="day-card">
            <div class="day-img"><img src="img/storm.png" alt="" /></div>
            <h6 class="h6 text-center m-0 fs-6 opacity-75 mt-3" id="name">
              Wednesday
            </h6>
            <h6 class="day-temp text-center mt-1 opacity-75">${newArr[2]}°C</h6>
          </div>
          <div class="day-card">
            <div class="day-img"><img src="img/raining.png" alt="" /></div>
            <h6 class="h6 text-center m-0 fs-6 opacity-75 mt-3" id="name">
              Thursday
            </h6>
            <h6 class="day-temp text-center mt-1 opacity-75">${newArr[3]}°C</h6>
          </div>
          <div class="day-card">
            <div class="day-img"><img src="img/rainy-day.png" alt="" /></div>
            <h6 class="h6 text-center m-0 fs-6 opacity-75 mt-3" id="name">
              Friday
            </h6>
            <h6 class="day-temp text-center mt-1 opacity-75">${newArr[4]}°C</h6>
          </div>
    `;

    const chartInstance = Chart.getChart("myChart");
    if (chartInstance !== undefined) {
      chartInstance.destroy();
    }
    const ctx = document.getElementById("myChart").getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Tempeture",
            data: arr,
            borderWidth: 1,
            borderColor: "#ff0000",
            backgroundColor: "#ff0000",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
  alert_section.innerHTML = `<div class="alert-box" id="alert-box"><h4 class="alert-msg">avoid entering or going near rivers and streams due to potential dangers like strong currents, hidden hazards, slippery rocks, and unpredictable water levels,</h4></div>`;
}
