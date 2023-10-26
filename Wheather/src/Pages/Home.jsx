import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const apiKey = "1b2ba74cd65930aeea9c827c6f81ffc9";
  const [stadt, setStadt] = useState("Berlin");
  const [weatherdata, setWeatherdata] = useState();
  const [clouds, setClouds] = useState();
  const [icon, setIcon] = useState();
  const [temprator, setTemprator] = useState();
  const [wind, setWind] = useState();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${stadt}&appid=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeatherdata(data);
        setClouds(() => {
          switch (true) {
            case data.clouds.all < 20:
              return "Clear sky";
              break;
            case data.clouds.all < 50:
              return "Partly cloudy";
              break;
            case data.clouds.all < 80:
              return "Very cloudy";
              break;
            default:
              return "Very cloudy";
              break;
          }
        });
        setIcon(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        setTemprator(`${(data.main.temp - 273.15).toFixed(0)}°C`);
        setWind(`${data.wind.speed} km/h`);
      });
  }, [stadt]);
  return (
    <>
      <main>
        <section className="container">
          <article>
            <button
              onClick={(event) => setStadt(event.target.value)}
              value="hamburg"
            >
              Hamburg
            </button>
            <button
              onClick={(event) => setStadt(event.target.value)}
              value="berlin"
            >
              Berlin
            </button>
            <button
              onClick={(event) => setStadt(event.target.value)}
              value="koeln"
            >
              Köln
            </button>
            <button
              onClick={(event) => setStadt(event.target.value)}
              value="australien"
            >
              Australien
            </button>
          </article>
          <p>{weatherdata ? clouds : "Loading..."}</p>
          <img src={icon} alt={clouds} />
          <p>Aktuell : {temprator}</p>
          <p>Windgeschwindugkeit: {wind}</p>
        </section>
      </main>
    </>
  );
};

export default Home;
