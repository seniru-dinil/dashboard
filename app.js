const input = document.getElementById("input");
const date = document.getElementById("date");
const locatoin = document.getElementById("location");
const temp = document.getElementById("temp");
const detail = document.getElementById("detail");

const fetchWhether = async () => {
  let value = input.value;
  input.value = "";
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=4a100227f2ff4be182943627242711&q=${value}`,
    requestOptions
  );
  const data = await res.json();
  date.innerText = data.location.localtime;
  locatoin.innerText = data.location.name;
  temp.innerText = Math.round(data.current.temp_c) + " °C";
  detail.innerText = data.current.condition.text;
  console.log(data.location.name);
  console.log(data.location.localtime);
  console.log(data.location.country);

  console.log(Math.round(data.current.temp_c));
  console.log(data.current.condition.text);
};
