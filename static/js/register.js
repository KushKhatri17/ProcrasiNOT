$( function(){
    $('#submit-button').click(function(e){

        e.preventDefault();

        $('.error-msg-email').html("");
        $('.error-msg-password').html("");
        $('.error-msg-firstname').html("");
        $('.error-msg-lastname').html("");
        $('.error-msg-password-con').html("");
        $('.error-msg-register').html("");

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var password_con = $('#password-con').val();

        if(first_name.length == 0){
            $('.error-msg-firstname').html("No firstname entered");
            $('#first_name').css('border-color','#D8000C');
            $('#first_name').css('background-color','#FFBABA');
            return false;
        }

        if(last_name.length == 0){
            $('.error-msg-lastname').html("No lastname entered");
            $('#last_name').css('border-color','#D8000C');
            $('#last_name').css('background-color','#FFBABA');
            return false;
        }

        if(email.length == 0){
            $('.error-msg-email').html("No email entered");
            $('#email').css('border-color','#D8000C');
            $('#email').css('background-color','#FFBABA');
            return false;
        }

        if(password.length == 0){
            $('.error-msg-password').html("No password entered");
            $('#password').css('border-color','#D8000C');
            $('#password').css('background-color','#FFBABA');
            return false;
        }

        if(password_con.length == 0){
            $('.error-msg-password-con').html("Please confirm your password");
            $('#password-con').css('border-color','#D8000C');
            $('#password-con').css('background-color','#FFBABA');
            return false;
        }

        if(password !== password_con){
            $('.error-msg-password-con').html("Passwords don't match");
            $('#password-con').css('border-color','#D8000C');
            $('#password-con').css('background-color','#FFBABA');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: '/verify-registration',
            data:{
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password,
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));
    
                if(res.registered == true){
                    window.location.replace(res.dashboard_url);
                }
                else{
                    console.log(res);
                    $('.error-msg-register').html("Account could not be created");
                }
            }
        })
    })
})