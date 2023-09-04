import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        humidity: number;
        feels_like: string;
    };
    weather: {
        description: string;
    }[];
    wind: {
        speed: number;
    };
}

function App() {

    const [data, setData] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState('');

    const search = async (event: any) => {
        if (event.key === 'Enter') {
            try {
                const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=232c0a0880ae295730164fb7e4ad7a80`);
                const {lat, lon} = geoResponse.data[0];
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=232c0a0880ae295730164fb7e4ad7a80&units=metric`);
                setData(weatherResponse.data);
                console.log(weatherResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLocation('');
        }
    }

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={search}
                    placeholder='Enter location'
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        {data?.main ? <p>{data?.name}, {data?.sys.country}</p> : null}
                    </div>
                    <div className="temp">
                        {data?.main ? <h1>{data?.main.temp} C°</h1> : null}
                    </div>
                    <div className="description">
                        <p>{data?.weather[0].description}</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="feels">
                        {data?.main ? <p className="bold">{data?.main.feels_like} C°</p> : null}
                        <p>Feels like</p>
                    </div>
                    <div className="humidity">
                        <p className="bold">{data?.main.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data?.main ? <p className="bold">{data?.wind.speed} Km/h</p> : null}
                        <p>Wind speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
