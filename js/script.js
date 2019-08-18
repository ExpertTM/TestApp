const searchForm = document.querySelector('#search-form'); 
const movie = document.querySelector('#movies');
const urlPoster = 'http://image.tmdb.org/t/p/w500';

function apiSearch(e){
	e.preventDefault();
	const searchText = document.querySelector('.form-control').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=a979151b9fede39e0de185d781274189&language=ru&query=' + searchText;
	movie.innerHTML = 'Загрузка';

	fetch(server)
		.then(function(value){
			return value.json();
		})
		.then(function(output){
			let inner = '';
			output.results.forEach(function(item){
				let nameItem = item.name || item.title;
				inner += `
					<div class="col-12 col-md-4 col-xl-3 item">
						<img src ="${urlPoster + item.poster_path}" alt="${nameItem}">
						<h5>${nameItem}</h5>
					</div>
				`;
			}); 
			movie.innerHTML = inner;
		})
		.catch(function(reason){
			movie.innerHTML = 'Упс, что то пошло не так';
			console.log('error' + reason.status);
		});
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url){
	return new Promise(function(resolve, reject){
		const request = new XMLHttpRequest();	
		request.open('GET', url);	
		request.addEventListener('load', function(){
			if (request.status !== 200) {
				reject({
					status: request.status
				});
				return;
			}
			resolve(request.responce);
		});
	
		request.addEventListener('error', function(){
			reject({
				status: request.status
			});
		});
		request.send();
	});

}