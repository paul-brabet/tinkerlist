OAuth.initialize('your_app_public_key')

OAuth.popup('spotify', { cache: true })
    .done(function(result) {
        // use result.access_token in API request
    })
    .fail(function(err) {
        //handle error
    })