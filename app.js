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

const fetchWhether = async () => {
  let value = input.value;
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
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }
  } catch (TypeError) {
    date.innerText = data.location.localtime;
    locatoin.innerText = data.location.name;
    temp.innerText = Math.round(data.current.temp_c) + " °C";
    detail.innerText = data.current.condition.text;
    wind.innerHTML =
      `<h3 class="fs-1 fw-semibold">${data.current.wind_kph}</h3>` +
      `<span class="opacity-50 fs-6"> Km/h</span>`;
    uv.innerHTML =
      `<h3 class="fs-1 fw-semibold">${data.current.uv}</h3>` +
      `<span class="opacity-50 fs-6">uv</span>`;
    rise.innerHTML = `<h3 class="fs-1 fw-semibold">${data.forecast.forecastday[0].astro.sunrise}</h3>`;

    humidity.innerHTML = `${data.current.humidity} <span class="opacity-50 fs-6">%</span>`;
    cloud.innerHTML = `${data.current.cloud}`;
    feels.innerHTML = `${data.current.feelslike_c} <span class="opacity-50 fs-6">°C</span>`;

    const ctx = document.getElementById("myChart");
    let arr = [];
    data.forecast.forecastday.forEach((day) => {
      arr.push(day.day.maxtemp_c);
    });
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Tempeture",
            data: arr,
            borderWidth: 1,
            borderColor: "#00e600",
            backgroundColor: "#00e600",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  alert_section.innerHTML = `<div class="alert-box" id="alert-box"><h4 class="alert-msg">avoid entering or going near rivers and streams due to potential dangers like strong currents, hidden hazards, slippery rocks, and unpredictable water levels,</h4></div>`;
};
