async function getTemp(city) {
	const key = '9c25848f3812b690e4ddc7b5fad01783';
	let descri = document.querySelector('.descri-temp');
	try {
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${key}`
		);
		let dataResponse = await response.json();
		if (dataResponse.cod !== '404') {
			document.querySelector('.aviso').classList.remove('active');

			descri.querySelector('.temp-in h3 strong').innerText = dataResponse.name;
			descri.querySelector('.temp-atual span').innerHTML = `${dataResponse.main.temp} °C`;
			descri.querySelector('.max-min .max span').innerHTML = `${dataResponse.main.temp_max} °C`;
			descri.querySelector('.max-min .min span').innerHTML = `${dataResponse.main.temp_min} °C`;
			descri.querySelector(
				'.clouds-state .icon-cloud span'
			).innerHTML = `${dataResponse.weather[0].description}`;
			descri.querySelector(
				'.clouds-state .icon-cloud img'
			).src = ` http://openweathermap.org/img/wn/${dataResponse.weather[0].icon}.png`;
			descri.style.display = 'block';
			container.append(descri);
			document.querySelector(
				'body'
			).style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;
		} else {
			descri.style.display = 'none';
			document.querySelector('.aviso').classList.add('active');
		}
	} catch (e) {}
}

const searchInput = document.querySelector('#search'),
	container = document.querySelector('.content-container'),
	lupaSearch = document.querySelector('.input-camp a');

searchInput.addEventListener('keyup', event => {
	if (searchInput.value != '') {
		if (event.key == 'Enter') {
			getTemp(searchInput.value);
		}
	} else {
		document.querySelector('.descri-temp').style.display = 'none';
	}
});
searchInput.addEventListener('click', () => {
	if (searchInput.value == '') {
		document.querySelector('.descri-temp').style.display = 'none';
	}
});
lupaSearch.addEventListener('click', () => {
	getTemp(searchInput.value);
});
