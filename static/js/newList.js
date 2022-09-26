function displayImg(){

    const bgImg = new Image();

    var listBgPreview = document.getElementById('list-bg-preview');
    var bgImgSelected = document.getElementById('list-bg');
    var val = bgImgSelected.value;
    switch(val){
        case 'bg-1':
            listBgPreview.removeChild(listBgPreview.firstChild);
            bgImg.src = '../static/images/bg.jpg';
            break;
        case 'bg-2':
            listBgPreview.removeChild(listBgPreview.firstChild);
            bgImg.src = '../static/images/bg-2.jpg';
            break;
        case 'bg-3':
            listBgPreview.removeChild(listBgPreview.firstChild);
            bgImg.src = '../static/images/bg-3.jpg';
            break;
        case 'bg-4':
            listBgPreview.removeChild(listBgPreview.firstChild);
            bgImg.src = '../static/images/bg-4.jpg';
            break;
        case 'bg-5':
            listBgPreview.removeChild(listBgPreview.firstChild);
            bgImg.src = '../static/images/bg-5.jpg';
    }

    listBgPreview.appendChild(bgImg);
}


$( function(){
    $('#submit-button').click(function(e){

        e.preventDefault();

        $('#error-msg-list-title').html("");
        $('#error-msg-no-img').html("")

        var title = $('#title').val();
        var bgImg = $('#list-bg').val();

        if(title.length == 0){
            $('#error-msg-list-title').html("No list title entered");
            $('#title').css('border-color','#D8000C');
            $('#title').css('background-color','#FFBABA');
            return false;
        }

        if(bgImg == null){
            $('#error-msg-no-img').html("No list background selected");
            $('#list-bg').css('border-color','#D8000C');
            $('#list-bg').css('background-color','#FFBABA');
            return false;
        }

        

        $.ajax({
            type: 'POST',
            url: '/create-new-list',
            data:{
                'title': title,
                'bgImg': bgImg,
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));
    
                if(res.created == true){
                    alert('Created');
                }
                else{
                    console.log(res.message);
                }
            }
        })
    })
})