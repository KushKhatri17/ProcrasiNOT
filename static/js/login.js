$( function(){
    $('#submit-button').click(function(e){

        e.preventDefault();

        $('.error-msg-email').html("");
        $('.error-msg-password').html("");
        $('.error-msg-no-login').html("");

        $('#email').focusin(function(){
            $(this).css('background-color', 'white');
        });

        $('#password').focusin(function(){
            $(this).css('background-color', 'white');
        });

        var email = $('#email').val();
        var password = $('#password').val();

        if(email.length == 0){
            $('.error-msg-email').html("Email field is empty");
            $('#email').css('border-color','#D8000C');
            $('#email').css('background-color','#FFBABA');
            return false;
        }

        if(password.length == 0){
            $('.error-msg-password').html("Password field is empty");
            $('#password').css('border-color','#D8000C');
            $('#password').css('background-color','#FFBABA');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: '/verify-login',
            data:{
                'email': email,
                'password': password
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));
    
                if(res.logged_in == true){
                    window.location.replace(res.dashboard_url);
                }
                else{
                    $('.error-msg-no-login').html("Invalid username or password");
                }
            }
        })
    })
})