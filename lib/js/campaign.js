$('select').on('change', function(e){
		setTimeout(function() {
			window.location = e.target.value;
     	}, 500);
});

