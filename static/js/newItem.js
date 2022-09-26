
$( function(){
    $('#submit-button').click(function(e){
        e.preventDefault();

        var task = $('#task').val();
        var url_string = window.location.href
        var url = new URL(url_string);
        var list_id = url.searchParams.get("list_id");
        $.ajax({
            type: 'POST',
            url: '/new-task',
            data:{
                'list_id': list_id,
                'task': task
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));

                if(res.added == true){
                    $("#list-items").append("<p>"+res.task+"</p>");
                }
                else{
                    console.log(res.message);
                }
            }
        })
    })
})