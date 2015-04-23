var scrolled25 = false;
var scrolled50 = false;
var scrolled75 = false;
var scrolledAll = false;

function postContactToGoogle() {
    var uFname = $('#firstName').val();
    var uLname = $('#lastName').val();
    var uStreet = $('#street').val();
    var uCity = $('#city').val();
    var uState = $('#state').val();
    var uZipcode = $('#zip').val();
    var uEmail = $('#email').val();


    $.ajax({
        cache:false,
        url: "https://docs.google.com/forms/d/1lTB1pPqBGN2-Xl__tGzX-PJ2tDNPYpEDMt3ybQzGDgY/formResponse",
        data: { 
            "entry_1701233357": uFname, 
            "entry_166784206": uLname, 
            "entry_2053488114": uStreet,
            "entry_123623823": uCity, 
            "entry_672759851": uState, 
            "entry_1363473429": uZipcode,
            "entry_1206235931": uEmail
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
      //$('#ss-form').addClass('hidden');
  });
}

function validate() {
    var readyToPost = true;
    $('#formErrprMsg').addClass('hidden');
    $('input.required').each(function(i, ele){
        if($(ele).val().length == 0){
            $(ele).parent().addClass('has-error');
            $('#formErrprMsg').removeClass('hidden');
            $('#formErrprMsg').text(('Please enter your '+$(ele).attr('title')).toUpperCase());
            if(readyToPost){
                readyToPost = false;
                return false;
            }
        }
    });
    return readyToPost;
}

$( "#submitBtn" ).on('click', function( e ) {
    $('.has-error').removeClass('has-error');
    //e.preventDefault();
    if(validate()){
        if($('.gt-ie9').length != 0){
            postContactToGoogle();
        }else if($('.lt-ie9').length != 0){
            $('#ss-form').submit();
        }
        //ga('send', 'event', 'Form Event', 'ACT=Form Complete', 'LABEL='+$(this).attr('trackingLabel')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
        //$('#ss-form').addClass('hidden');
        //$('#formConfirmationBox').removeClass('hidden');
    }
});

$('form.campaign').one('click', function(e){
    //ga('send', 'event', 'Form Event', 'ACT=Form Start', 'LABEL='+$(this).attr('trackingLabel')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
});

$(document).scroll(function() {
    if(!scrolled25 || !scrolled50 || !scrolled75 || !scrolledAll){
        var maxHeight = ($(document).height() - $( window ).height());
        if(!scrolled25 && $('body').scrollTop() >= maxHeight / 4 ){
            scrolled25 = true;
            //ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 25%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
        if(!scrolled50 && $('body').scrollTop() >= maxHeight / 2 ){
            scrolled50 = true;
            //ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 50%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
        if(!scrolled75 && $('body').scrollTop() >= (maxHeight / 4 + maxHeight / 2) ){
            scrolled75 = true;
            //ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 75%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
        if(!scrolledAll && $('body').scrollTop() >= maxHeight - 5){
            scrolledAll = true;
            //ga('send', 'event', 'Page Scroll Event', 'SCROLL DEPTH = 100%', 'PAGE HEIGHT='+$(document).height()+' | WINDOW HEIGHT='+$(window).height());
        }
    }
});

//event tracking for link clicks
$('a').on('click', function(e){
    //ga('send', 'event', 'General Link Click', 'ACT=Click TAG='+$(e.target).prop("tagName"), 'LABEL='+$(this).attr('trackingLabel')+' LINK='+$(this).attr('href')+' COPY='+$(this).text()+' ALT='+$(e.target).attr('alt')+' SRC='+$(e.target).attr('src')+' ID='+$(this).attr('id')+' WIDTH='+$(e.target).width()+' HEIGHT='+$(e.target).height());
});