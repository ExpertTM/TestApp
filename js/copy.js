const searchForm = document.querySelector('#search-form'); 
const movie = document.querySelector('#movies');

function apiSearch(e){
	e.preventDefault();
	const searchText = document.querySelector('.form-control').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=a979151b9fede39e0de185d781274189&language=ru&query=' + searchText;
	requestApi(server)
		.then(function (result) {
			const output = JSON.parse(result);
			let inner = '';
			output.results.forEach(function(item){
				let nameItem = item.name || item.title;
				inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`;
			}); 
			movie.innerHTML = inner;

		console.log(1);	

		})


		.catch()
	;

	// console.log(requestApi(server));
	// console.log(searchText.value)
	/*console.log("Привет мир");*/
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

/*apiSearch('Привет Мир!');*/
/*console.log(searchForm);*/