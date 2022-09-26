$( function(){
    $('.list-submit-button').click(function(e){
        e.preventDefault();

        $('#error-msg-task').html("");

        var list_id = $(this).attr('list_id');
        var task_id = '#desc'+list_id;
        var task_desc = $(task_id).val();
        console.log(task_desc);

        if(task_desc.length == 0){
            alert('Task cannot be empty')
            return false;
        }

        $.ajax({
            type: 'POST',
            url: '/new-task',
            data:{
                'list_id': list_id,
                'task_desc': task_desc,
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));
                var markup = `
                        <div class="list-item" id="`+ res.task_id +`">
                            <div class="row">
                                <div class="col-sm-8" id="`+ res.task_id +`-comp-status">
                                    <div class="task-desc-incomp">`
                                        + task_desc +
                                    `
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="list-actions">
                                        <button class="task-complete-button" data-task_id="`+ res.task_id +`">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                            </svg>
                                        </button>
                                        <button class="task-delete-button" data-task_id="`+ res.task_id +`">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="cool-seperator"></div>
                        </div>
                    `;
                

                if(res.task_added == true){
                    const list_selector = '#list'+list_id+'-contents';
                    $(list_selector).append(markup);
                    console.log(list_selector);
                }
                else{
                    console.log('Task not added');
                }
            }
        })
    });

    $('body').on('click', '.task-complete-button', function(){
        const task_id = $(this).data('task_id');
        $.ajax({
            type: 'POST',
            url: '/comp-bttn-clicked',
            data:{
                'task_id': task_id,
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));
                const task_selector = '#' + task_id + '-comp-status';
                console.log('task selector: ' + task_selector);
                if(res.new_status == 'completed'){
                    console.log("im here 1")
                    $(task_selector).children('div').removeClass('task-desc-incomp');
                    $(task_selector).children('div').addClass('task-desc-comp');
                }
                else{
                    console.log("im here 2")
                    $(task_selector).children('div').removeClass('task-desc-comp');
                    $(task_selector).children('div').addClass('task-desc-incomp');
                }
            }
        })
    });

    $('body').on('click', '.task-delete-button', function(){
        const task_id = $(this).data('task_id');

        $.ajax({
            type: 'POST',
            url: '/del-bttn-clicked',
            data: {
                'task_id': task_id,
            },
            success: function(data){
                const res = JSON.parse(JSON.stringify(data));
                console.log(res.deleted);
                const task_selector = '#' + task_id;
                if(res.deleted == true){
                    $(task_selector).remove();
                }
            }
        })
    });
})