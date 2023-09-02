function remove_subject(self){
    const name = $(self).data("name");
    let targets_to_remove = $(`.${name}`)
    targets_to_remove.each(function(index, item){
        $(item).remove();
    })
}

$(document).ready(function() {
    const resizer = $('#resizer');
    const table = $('.sect_table');
    let initialHeight = 0;

    resizer.on('mousedown', function(e) {
        initialHeight = e.clientY - table.height();

        $(document).on('mousemove', resize_by_mouse);
        $(document).on('mouseup', stopResize);
    });

    resizer.on('touchstart', function(e) {
        initialHeight = e.originalEvent.touches[0].clientY - table.height();

        $(document).on('touchmove', resize);
        $(document).on('touchend', stopResize);
    });

    function resize_by_mouse(e){
        const new_height = e.clientY;
        if (new_height >= 50 && new_height<=500) {
            table.height(new_height);
        }
    }

    function resize(e) {
        const newHeight = e.originalEvent.touches[0].clientY - initialHeight;
        if (newHeight >= 20 && newHeight<=450) {
            table.height(newHeight);
        }
    }

    function stopResize() {
        $(document).off('mousemove', resize_by_mouse);
        $(document).off('mouseup', stopResize);
        $(document).off('touchmove', resize);
        $(document).off('touchend', stopResize);
    }
});

function clicked_color(self){
    $(".color_select").removeClass("selected");
    $(self).addClass("selected");
    $(".color_selected").val($(self).data("color"));
}

function clicked_card_x(self){
    $(self).parent().remove();
    if($(".cards_container .card").length == 0){
        append_card();
    }
}
    function append_card(){
        const card = $(`<div class="card">
        <img onclick="clicked_card_x(this)" class="btn_x" src="../static/img/icons/icon_x.svg">
        <div class="time_room_pack">
            <div class="sect_time">
                <select class="week">
                    
                    
                        <option value="mon">월요일</option>
                    
                        <option value="tue">화요일</option>
                    
                        <option value="wed">수요일</option>
                    
                        <option value="thr">목요일</option>
                    
                        <option value="fri">금요일</option>
                    
                </select>

                <select class="start_time">
                    
                        <option value="9_0">9:00</option>
                        <option value="9_1">9:30</option>
                    
                        <option value="10_0">10:00</option>
                        <option value="10_1">10:30</option>
                    
                        <option value="11_0">11:00</option>
                        <option value="11_1">11:30</option>
                    
                        <option value="12_0">12:00</option>
                        <option value="12_1">12:30</option>
                    
                        <option value="13_0">13:00</option>
                        <option value="13_1">13:30</option>
                    
                        <option value="14_0">14:00</option>
                        <option value="14_1">14:30</option>
                    
                        <option value="15_0">15:00</option>
                        <option value="15_1">15:30</option>
                    
                        <option value="16_0">16:00</option>
                        <option value="16_1">16:30</option>
                    
                        <option value="17_0">17:00</option>
                        <option value="17_1">17:30</option>
                    
                        <option value="18_0">18:00</option>
                        <option value="18_1">18:30</option>
                    

                </select>
                <span>부터</span>
                <select class="end_time">
                    
                        <option value="9_0">9:00</option>
                        <option value="9_1">9:30</option>
                    
                        <option value="10_0">10:00</option>
                        <option value="10_1">10:30</option>
                    
                        <option value="11_0">11:00</option>
                        <option value="11_1">11:30</option>
                    
                        <option value="12_0">12:00</option>
                        <option value="12_1">12:30</option>
                    
                        <option value="13_0">13:00</option>
                        <option value="13_1">13:30</option>
                    
                        <option value="14_0">14:00</option>
                        <option value="14_1">14:30</option>
                    
                        <option value="15_0">15:00</option>
                        <option value="15_1">15:30</option>
                    
                        <option value="16_0">16:00</option>
                        <option value="16_1">16:30</option>
                    
                        <option value="17_0">17:00</option>
                        <option value="17_1">17:30</option>
                    
                        <option value="18_0">18:00</option>
                        <option value="18_1">18:30</option>
                    
                </select>
                <span>까지</span>
                <div>
                    <input class="room" placeholder="장소를 입력하세요.">
                </div>
            </div>
        </div>
    </div>`);
    $(".cards_container").append(card);
    }

function clicked_plus_btn(self){
    append_card();
}

function changed_card_week(self){
    const week = $(self).val();
    const lecture_id = $(self).data("lecture_id");
    const data_input = $(`.data_input_${lecture_id}`);
    const start_time = data_input.data("start_time");
    const end_time = data_input.data("end_time");

    change_data_input(lecture_id, data_key = "week", data_value = week);
    move_gray_lecture( lecture_id, `length_${make_length_factor(start_time, end_time)}`, `y_${make_y_factor(start_time)}`, `x_${week}`);
}

function changed_card_start_time(self){
    const lecture_id = $(self).data("lecture_id");
    const data_input = $(`.data_input_${lecture_id}`);
    change_data_input(lecture_id, "start_time", $(self).val());
    const week = data_input.data("week");
    const start_time = data_input.data("start_time");
    const end_time = data_input.data("end_time");
    if(!is_valid_time(start_time, end_time)){
        alert("1시간 이상만 입력 가능");
        $(self).val("9_0");
        change_data_input(lecture_id, "start_time", "9_0");
        $(".end_time").val("10_0");
        change_data_input(lecture_id, "end_time", "10_0");
        return;
    }
    move_gray_lecture( lecture_id, `length_${make_length_factor(start_time, end_time)}`, `y_${make_y_factor(start_time)}`, `x_${week}`);
}

function changed_card_end_time(self){
    const lecture_id = $(self).data("lecture_id");
    const data_input = $(`.data_input_${lecture_id}`);
    change_data_input(lecture_id, "end_time", $(self).val());
    const week = data_input.data("week");
    const start_time = data_input.data("start_time");
    const end_time = data_input.data("end_time");
    move_gray_lecture( lecture_id, `length_${make_length_factor(start_time, end_time)}`, `y_${make_y_factor(start_time)}`, `x_${week}`);
}

function change_data_input(lecture_id, data_key, data_value){
    const data_input = $(`.data_input_${lecture_id}`);
    console.log(data_value)
    $(document).ready(function() {
        data_input.data(data_key, data_value);
        });
    $(document).on("ready", function(){    data_input.data(data_key, data_value);})

}

function make_length_factor(start_time, end_time){
    const length_factor = ((parseInt(end_time.split("_")[0])-parseInt(start_time.split("_")[0]))*2 + (parseInt(end_time.split("_")[1])-parseInt(start_time.split("_")[1])));
    return length_factor;
}

function make_y_factor(start_time){
    console.log(start_time)
    const y_factor = (parseInt(start_time.split("_")[0])-9)*2 + (parseInt(start_time.split("_")[1])-0);
    console.log(y_factor)
    return y_factor;
}

function move_gray_lecture(lecture_id, x_factor, y_factor, length_factor){
    $(`.gray_${lecture_id}`).remove();
    const gray_lecture = `<div class="lecture_gray ${length_factor} ${y_factor} ${x_factor} gray_${lecture_id}"></div>`;
    $(".lecture_gray_container").append(gray_lecture);
}

function is_valid_time(start_time, end_time){
    const length_factor  = make_length_factor(start_time, end_time);
    console.log(length_factor);
    // const time_length = parseInt(length_factor.split("_")[1]);
    if(length_factor>1) return true;
    else return false;
}