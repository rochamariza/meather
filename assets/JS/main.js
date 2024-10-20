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
const senter = document.querySelector('.senter')
const fases = document.querySelector('.fases')
const lua = document.querySelector('.lua')

info.style.display = "none"

const fetchAPI = async (local) =>{
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=44a794bf71e8413a842221417241510&q=${local}&aqi=no&lang=pt`)
    const data = await response.json()
    return data
}
const fetchFasesAPI = async (local) =>{
    const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=44a794bf71e8413a842221417241510&q=${local}&dt=0&lang=pt`)
    const data = await response.json()
    return data
}
const fetchMoonAPI = async (local) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${local}?unitGroup=metric&include=current&key=HHNF9556E5WY85E6PSWCL6QFR&contentType=json`)
    const data = await response.json()
    return data
}

const renderWeather = async (local) =>{
    const moondata = await fetchMoonAPI(local)
    const fasesdata = await fetchFasesAPI(local)
    const data = await fetchAPI(local)

    if(data){
        info.style.display = "block"
        clima.innerHTML = data["current"]["condition"]["text"]
        temp.innerHTML = data["current"]["temp_c"] + "°c"
        umidade.innerHTML = data.current.humidity
        vento.innerHTML = data["current"]["wind_kph"] + "km/h" 
        raios.innerHTML = data["current"]["uv"]
        lat.innerHTML = data["location"]["lat"]
        long.innerHTML = data["location"]["lon"]
        preci.innerHTML = data["current"]["precip_mm"]
        senter.innerHTML = data["current"]["feelslike_c"] + "°c"
        const moonphase = moondata["currentConditions"]["moonphase"]
            if (moonphase === 0) {
                lua.src = "assets/IMGS/lua-nova.svg"
               return fases.innerHTML = 'Lua Nova'
            } else if (moonphase > 0 && moonphase < 0.25) {
                lua.src = "assets/IMGS/crescente.svg"
               return fases.innerHTML = 'Crescente Inicial';
            } else if (moonphase === 0.25) {
                lua.src = "assets/IMGS/crescente.svg"
               return fases.innerHTML = 'Quarto Crescente';
            } else if (moonphase > 0.25 && moonphase < 0.5) {
                lua.src = "assets/IMGS/crescente.svg"
              return fases.innerHTML = 'Crescente Gibosa';
            } else if (moonphase === 0.5) {
                lua.src = "assets/IMGS/luacheia.svg"
              return fases.innerHTML = 'Lua Cheia';
            } else if (moonphase > 0.5 && moonphase < 0.75) {
                lua.src = "assets/IMGS/minguante.svg"
              return fases.innerHTML = 'Minguante Gibosa';
            } else if (moonphase === 0.75) {
                lua.src = "assets/IMGS/minguante.svg"
              return fases.innerHTML = 'Quarto Minguante';
            } else {
                lua.src = "assets/IMGS/minguante.svg"
              return fases.innerHTML = 'Minguante Inicial';
            }
    }else{
        info.style.display = "none"
    }
}

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    renderWeather(search.value.toLowerCase())
    
})