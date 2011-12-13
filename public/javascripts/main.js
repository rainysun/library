$(document).ready(function(){
    $("#base_search").submit(function(){
	if ($('#title').val()+$('#category').val()+$('#press').val()+$('#year0').val()+$('#year1').val()+$('#author').val() != ''){
	    return true;
	}else{
	    $('#error_msg').text('You must forget sth~').show().fadeOut(3000);
	    return false;
	};
    });
});
