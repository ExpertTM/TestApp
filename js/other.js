request.addEventListener('readystatechange', function() {
		if(request.readyState !== 4) {
			movie.innerHTML = 'Загрузка';
			return;
		}			
		if(request.status !== 200){
			movie.innerHTML = 'Упс, что-то пошло не так';
			console.log('error: ' + request.status);
			return;
		}

		const output = JSON.parse(request.responseText);
		let inner = '';
		output.results.forEach(function(item){
			let nameItem = item.name || item.title;
			// inner += '<div class="col-5">' + nameItem + '</div>';
			inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`;
		});

		movie.innerHTML = inner;

		// movie.innerHTML = '<div class="col-3">Helow</div>';

	});