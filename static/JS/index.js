class Lecture{
    constructor(lecture_id, subject_id, room, start_time, end_time, week){
        this.lecture_id = lecture_id;
        this.subject_id = subject_id;
        this.room = room;
        console.log(week);
        this.position_facs = {
            x_factor : `x_${this.make_x_factor(week)}`,
            y_factor : `y_${this.make_y_factor(start_time)}`,
            length_factor : `length_${this.make_length_factor(start_time, end_time)}`
        };
    }

    make_length_factor(start_time, end_time){
        const length_factor = ((parseInt(end_time.split("_")[0])-parseInt(start_time.split("_")[0]))*2 + (parseInt(end_time.split("_")[1])-parseInt(start_time.split("_")[1])));
        return length_factor;
    }
    
    make_y_factor(start_time){
        console.log(start_time)
        const y_factor = (parseInt(start_time.split("_")[0])-9)*2 + (parseInt(start_time.split("_")[1])-0);
        return y_factor;
    }

    make_x_factor(week){
        return week;
    }
}

class Subject{
    constructor(subject_id, name, color){
        this.subject_id = final_subject_list.new_subject_id();
        this.name = name;
        this.color = color;
        this.lecture_list = [];
    }
    new_lecture_id(){
        return `lecture_${this.lecture_list.length + 1}`;
    }
    append_lecture(lecture){
        this.lecture_list.push(lecture);
    }
    idx_of(lecture_id){
        if (this.is_empty) return -1;
        for(let i = 0; i<this.lecture_list.length;i++){
            if(this.lecture_list[i].lecture_id == lecture_id){
                return i;
            }
        }
        return -1;
    }
    is_empty(){
        if(this.lecture_list.length == 0) return true;
        else return false;
    }
    remove_lecture(lecture_id){
        if(this.is_empty()) return -1;
        this.lecture_list.erase(this.idx_of(lecture_id));
    }
    append_me_to_table(){
        for(let target in this.lecture_list){
            target = this.lecture_list[target];
            const lecture_block = $(
                `<div onclick='if(confirm("${this.name} 과목을 삭제합니다.")) {remove_subject(this)}' 
                data-name="${this.name}" 
                data-start="${target.position_facs.y_factor}" 
                data-end="${target.position_facs.y_factor + target.position_facs.length_factor}" 
                class="${this.subject_id} lecture ${this.color} ${target.position_facs.x_factor} ${target.position_facs.y_factor} ${target.position_facs.length_factor}">
                    <div class="subject">${this.name}</div>
                    <div class="room">${target.room}</div>
                </div>`
            );
            $(".lecture_container .tmp_container").prepend(lecture_block);
        }
    }

}

class Subjects{
    constructor(){
        this.times = {
            mon:[], tue:[], wed:[], thr:[], fri:[]
        }
        this.subject_list = [];
    }
    append_subject(Subject){
        this.subject_list.push(Subject);
    }
    new_subject_id(){
        return `subject_${this.subject_list.length + 1}`;
    }
    print(){
        console.log(this.subject_list);
    }
    get_subject(subject_id){
        for(let i;i<this.subject_list.length;i++){
            if(this.subject_list[i].subject_id == subject_id){
                return this.subject_list[i];
            }
        }
        return -1;
    }
    is_colision(subject){
        if(this.subject_list.length == 0) return false;
        let is_colision_happend = false;
        for(let i=0;i< subject.lecture_list.length;i++){
            let target = subject.lecture_list[i];
            console.log(subject.lecture_list[i])
            let week = target.x_factor.split("_")[1];
            let start = parseInt(`${target.y_factor.split("_")[0]}${target.y_factor.split("_")[1]}`);
            let end = start + parseInt(`${target.length_factor.split("_")[0]}${target.length_factor.split("_")[1]}`);

            for(gogo_time in this.times[week]){
                if(gogo_time.start<=start<=gogo_time.end){
                    is_colision = true;
                    return is_colision;
                }
                if(gogo_time.start<=end<=gogo_time.end){
                    is_colision = true;
                    return is_colision;
                }
            }
        }
        return is_colision_happend;
    }
}

let final_subject_list = new Subjects();

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
    remove_gray_lecture($(self).parent().data("lecture_id"));
    $(self).parent().remove();
    if($(".cards_container .card").length == 0){
        append_card();
    }
}
    function append_card(){
        const lecture_id = new_lecture_id();
        const card = $(`<div class="card" data-lecture_id='${lecture_id}'>
        <input  style="display: none;"  data-week="mon" data-start_time="9_0" data-end_time="10_0" data-room=" " data-lecture_id='lecture_1' class="data_input_${lecture_id}">
        <img onclick="clicked_card_x(this)" class="btn_x" src="../static/img/icons/icon_x.svg">
        <div class="time_room_pack">
            <div class="sect_time">
            <select onchange="changed_card_week(this)" data-lecture_id='${lecture_id}' class="week">
                                        
                                        
            <option value="mon">월요일</option>
        
            <option value="tue">화요일</option>
        
            <option value="wed">수요일</option>
        
            <option value="thr">목요일</option>
        
            <option value="fri">금요일</option>
        
    </select>

    <select onchange="changed_card_start_time(this)" data-lecture_id='${lecture_id}' class="start_time">
        
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
    </select>
    <span>부터</span>
    <select onchange="changed_card_end_time(this)" data-lecture_id='${lecture_id}' class="end_time">
        
            <option value="9_0">9:00</option>
            <option value="9_1">9:30</option>
        
            <option selected value="10_0">10:00</option>
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
    </select>
                <span>까지</span>
                <div>
                    <input onchange="changed_card_room(this)" class="room" data-lecture_id=${lecture_id} placeholder="장소를 입력하세요.">
                </div>
            </div>
        </div>
    </div>`);
    $(".cards_container").append(card);
    append_gray_lecture(lecture_id, "x_mon", `y_${make_y_factor("9_0")}`, `length_${make_length_factor("9_0","10_0")}`);
    }

function new_lecture_id(){
    const card_cnt = $(".card").length;
    return `lecture_${card_cnt + 1}`;
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
        alert("시작 시간을 종료시간 이후로 입력해 주세요.");
        $(".start_time").val("9_0");
        change_data_input(lecture_id, "start_time", "9_0");
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
    if(!is_valid_time(start_time, end_time)){
        alert("시작 시간을 종료시간 이후로 입력해 주세요.");
        $(".end_time").val("10_0");
        change_data_input(lecture_id, "end_time", "10_0");
        return;
    }
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
    append_gray_lecture(lecture_id, x_factor, y_factor, length_factor);
}

function is_valid_time(start_time, end_time){
    const length_factor  = make_length_factor(start_time, end_time);
    console.log(length_factor);
    if(length_factor>1) return true;
    else return false;
}

function changed_card_room(self){
    const room = self.value;
    change_data_input($(self).data("lecture_id"), "room", room);
}

function append_gray_lecture(lecture_id, x_factor, y_factor, length_factor){
    const gray_lecture = `<div class="lecture_gray ${length_factor} ${y_factor} ${x_factor} gray_${lecture_id}"></div>`;
    $(".lecture_gray_container").append(gray_lecture);
}

function remove_gray_lecture(lecture_id){
    $(document).ready(function(){$(`.gray_${lecture_id}`).remove();});
}

function clicked_submit_btn(self){
    const subject_name = $(".subject").val();
    const color = $(".color_selected").val();
    const new_subject = new Subject(final_subject_list.new_subject_id(), subject_name, color);
    for(let i = 0;i<$(".card").length;i++){
        let lecture_id = $($(".card")[i]).data("lecture_id");
        let week = get_lecture_data(lecture_id, "week");
        let start_time = get_lecture_data(lecture_id, "start_time");
        let end_time = get_lecture_data(lecture_id, "end_time");
        let room = get_lecture_data(lecture_id, "room");
        const new_lecture = new Lecture(new_subject.new_lecture_id(), new_subject.subject_id, room, start_time, end_time, week);
        new_subject.append_lecture(new_lecture);
        if(final_subject_list.is_colision(new_subject) == false){

            final_subject_list.append_subject(new_subject);
            console.log(final_subject_list)
            new_subject.append_me_to_table();
        }
    }

}

function get_lecture_data(lecture_id, key){
    const data_input = $(`.data_input_${lecture_id}`);
    const value = data_input.data(key);
    return value;
}