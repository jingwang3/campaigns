var scrolled25 = false;
var scrolled50 = false;
var scrolled75 = false;
var scrolledAll = false;

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


$( "#ss-form" ).on('submit', function( e ) {
    $('.has-error').removeClass('has-error');
    e.preventDefault();
    if(validate()){
        postContactToGoogle();
        ga('send', 'event', 'Form Event', 'ACT=Form Complete', 'LABEL='+$(this).attr('trackingLabel')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
        $('#ss-form').addClass('hidden');
        $('#formConfirmationBox').removeClass('hidden');
    }
});

$( "#submitBtnIE" ).on('click', function( e ) {
    $('.has-error').removeClass('has-error');
    e.preventDefault();
    if(validateIE()){
        ga('send', 'event', 'Form Event', 'ACT=Form Complete', 'LABEL='+$(this).attr('trackingLabel')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
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

$('.loc-pin-mobile').on('click', function(){
    $('html, body').animate({
        scrollTop: $(".meet-doctors-mobile").offset().top + $('.meet-doctors-mobile').height() - $('nav.navbar-fixed-top').outerHeight()
    }, 1000);
});

$('#closeBtn').on('click', function(){
    $('.loc-pin.active').removeClass('active');
});

$('form.campaign').one('click', function(e){
    ga('send', 'event', 'Form Event', 'ACT=Form Start', 'LABEL='+$(this).attr('trackingLabel')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
});

$(document).scroll(function() {
    if(!scrolled25 || !scrolled50 || !scrolled75 || !scrolledAll){
        var maxHeight = ($(document).height() - $( window ).height());
        if(!scrolled25 && $('body').scrollTop() >= maxHeight / 4 ){
            scrolled25 = true;
            ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 25%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
        if(!scrolled50 && $('body').scrollTop() >= maxHeight / 2 ){
            scrolled50 = true;
            ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 50%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
        if(!scrolled75 && $('body').scrollTop() >= (maxHeight / 4 + maxHeight / 2) ){
            scrolled75 = true;
            ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 75%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
        if(!scrolledAll && $('body').scrollTop() >= maxHeight - 5){
            scrolledAll = true;
            ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 100%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
    }
});

//event tracking for link clicks
$('a').on('click', function(e){
    ga('send', 'event', 'General Link Click', 'ACT=Click TAG='+$(e.target).prop("tagName"), 'LABEL='+$(this).attr('trackingLabel')+' LINK='+$(this).attr('href')+' COPY='+$(this).text()+' ALT='+$(e.target).attr('alt')+' SRC='+$(e.target).attr('src')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
});