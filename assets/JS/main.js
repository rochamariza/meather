const clima = document.querySelector('.clima')
const temp = document.querySelector('.temperatura')
const vento = document.querySelector('.vento')
const umidade = document.querySelector('.umidade')
const info = document.querySelector('.info')
const raios = document.querySelector('.uv')
const form = document.querySelector('.form')
const lat = document.querySelector('.lat')
const long = document.querySelector('.lon')
const preci = document.querySelector('.preci')
const search = document.querySelector('#procurar')
const submit = document.querySelector('.botao')

info.style = "display:none"

const fetchAPI = async (local) =>{
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=44a794bf71e8413a842221417241510&q=${local}&aqi=no&lang=pt`)
    const data = await response.json()
    return data
}

const renderWeather = async (local) =>{

    const data = await fetchAPI(local)
    if(data){
        info.style = "display:block"
       clima.innerHTML = data["current"]["condition"]["text"]
        temp.innerHTML = data["current"]["temp_c"] + "°c"
        umidade.innerHTML = data.current.humidity
        vento.innerHTML = data["current"]["wind_kph"] + "km/h" 
        raios.innerHTML = data["current"]["uv"]
        lat.innerHTML = data["location"]["lat"]
        long.innerHTML = data["location"]["lon"]
        preci.innerHTML = data["current"]["precip_mm"]
    }
    
}

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    renderWeather(search.value.toLowerCase())
    
})