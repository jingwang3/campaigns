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
                            //window.location.replace("http://childrensnational.org");
                        },
                        200: function () {
                            //window.location.replace("http://childrensnational.org");
                        }
                    }
                });
        }

$( "#ss-form" ).submit(function( event ) {
  postContactToGoogle();
  event.preventDefault();
});