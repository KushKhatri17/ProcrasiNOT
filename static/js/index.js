var counter = 1;
$( function(){

    $('#get-started-btn').click(function(){

        $.ajax({
            type: 'GET',
            url: 'login-status',
            success: function(data){
                const res = JSON.parse(JSON.stringify(data))
                if(res.logged_in == false){
                    window.location.href = 'signup';
                    return false;
                }
                else{
                    window.location.href = 'userDashboard.html?id='+res.user_id;
                    return false;
                }
            }
        })
    });

    $('#list-submit-button').click(function(e){
        e.preventDefault();
        var task = $('#task').val();
        var markup = `
            <div class="list-item" id="`+ counter +`">
                <div class="row">
                    <div class="col-sm-8">
                        <p class="task-desc">`+ task +`</p>
                    </div>
                    <div class="col-sm-3">
                        <div class="list-actions">
                            <button class="task-complete-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                            </button>
                            <button class="task-delete-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cool-seperator" id="sep-`+ counter +`"></div>
        `;
        $('#demo-list-contents').append(markup);
        counter++;
        console.log(counter);

        $('input[name="task"]').val("");
    });

    $('body').on('click', '.task-complete-button', function(){
        const itemId = $(this).parent().parent().parent().parent().attr('id');
        $('#'+itemId).css({
            'text-decoration' : 'line-through',
            'font-style': 'italic',
            'font-weight': 'lighter'
        });
    });

    $('body').on('click', '.task-delete-button', function(){
        const itemId = $(this).parent().parent().parent().parent().attr('id');
        $('#'+itemId).remove();
        $('#sep-'+itemId).remove();
        counter--;
    });
})