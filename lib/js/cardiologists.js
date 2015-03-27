        function postContactToGoogle() {
            var uName = $('#userName').val();
            var uPhone = $('#userPhone').val();
            var uZipcode = $('#userZipcode').val();

                $.ajax({
                    url: "https://docs.google.com/forms/d/1pf_-jg-bMcKUJ44xU6Tqr_juF1L-4VwgNseiX9MQZG0/formResponse",
                    data: { "entry_916599135": uName, 
                    "entry_354822211": uPhone, "entry_272965353": 
                    uZipcode},
                    type: "POST",
                    dataType: "xml",
                    statusCode: {
                        0: function () {
                            
                        },
                        200: function () {
                            
                        }
                    }
                }).done(function() {
                  $('#ss-form').addClass('hidden');
                });
        }

$( "#ss-form" ).submit(function( event ) {
    event.preventDefault();
    if ($('#userName').val().length == 0) {
        $('#userName').parent().addClass('has-error');
        return;
    };

    if ($('#userPhone').val().length == 0) {
        $('#userPhone').parent().addClass('has-error');
        return;
    };

    if ($('#userZipcode').val().length == 0) {
        $('#userZipcode').parent().addClass('has-error');
        return;
    };
    postContactToGoogle();
    $('#ss-form').addClass('hidden');
    $('#formConfirmationBox').removeClass('hidden');
});

$('#scrollToMap').on('click', function(e){
$('html, body').animate({
        scrollTop: $("#docSec").offset().top - 110
    }, 1000);
});

$('.loc-pin').on('click', function(e){
    $('.loc-pin.active').removeClass('active');
    $(this).addClass('active');
});