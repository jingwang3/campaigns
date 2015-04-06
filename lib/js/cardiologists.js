function postContactToGoogle() {
    var uName = $('#userName').val();
    var uPhone = $('#userPhone').val();
    var uZipcode = $('#userZipcode').val();

    $.ajax({
        cache:false,
        url: "https://docs.google.com/forms/d/1pf_-jg-bMcKUJ44xU6Tqr_juF1L-4VwgNseiX9MQZG0/formResponse",
        data: { 
            "entry_916599135": uName, 
            "entry_354822211": uPhone, 
            "entry_272965353": uZipcode
        },
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

function validate() {
    if ($('#userName').val().length == 0) {
        $('#userName').parent().addClass('has-error');
        return false;
    };

    if ($('#userPhone').val().length == 0) {
        $('#userPhone').parent().addClass('has-error');
        return false;
    };

    if ($('#userZipcode').val().length == 0) {
        $('#userZipcode').parent().addClass('has-error');
        return false;
    };

    return true;
}

function validateIE() {
    if ($('#userNameIE').val().length == 0) {
        $('#userNameIE').parent().addClass('has-error');
        return false;
    };

    if ($('#userPhoneIE').val().length == 0) {
        $('#userPhoneIE').parent().addClass('has-error');
        return false;
    };

    if ($('#userZipcodeIE').val().length == 0) {
        $('#userZipcodeIE').parent().addClass('has-error');
        return false;
    };

    return true;
}


$( "#ss-form" ).on('submit', function( event ) {
    $('.has-error').removeClass('has-error');
    event.preventDefault();
    if(validate()){
        postContactToGoogle();
        $('#ss-form').addClass('hidden');
        $('#formConfirmationBox').removeClass('hidden');
    }
});

$( "#submitBtnIE" ).on('click', function( event ) {
    $('.has-error').removeClass('has-error');
    event.preventDefault();
    if(validateIE()){
        $('#ss-form-IE').submit();
    }
});

$('.scrollToMap').on('click', function(){
    $('html, body').animate({
        scrollTop: $("#docSec").offset().top - $('nav.navbar-fixed-top').outerHeight()
    }, 1000);
});

$('.loc-pin').on('click', function(){
    $('.loc-pin.active').removeClass('active');
    $(this).addClass('active');
});

$('#closeBtn').on('click', function(){
    $('.loc-pin.active').removeClass('active');
});