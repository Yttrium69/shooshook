class Lecture{
    constructor(lecture_id, subject_id, room = "None", start_time = "9_0", end_time = "10_0", week = "mon"){
        this.lecture_id = lecture_id;
        this.subject_id = subject_id;
        this.room = room;
        this.end_time = end_time;
        this.start_time = start_time;
        this.week = week;
        this.position_facs = {
            "x_factor" : this.make_x_factor(week),
            "y_factor" : this.make_y_factor(start_time),
            "length_factor" : this.make_length_factor(start_time, end_time)
        };
    }

    move_gray(){
        this.remove_me_from_table_gray();
        this.post_me_in_table_gray();
    }

    update_week(_week){
        this.week = _week;
        this.position_facs.x_factor = this.make_x_factor(_week);
        this.move_gray();
    }
    update_start_time(_start_time){
        this.start_time = _start_time;
        this.position_facs.y_factor = this.make_y_factor(_start_time);
        this.position_facs.length_factor = this.make_length_factor(_start_time, this.end_time);
        console.log((this.position_facs))
        this.move_gray();
    }
    update_end_time(_end_time){
        this.end_time = _end_time;
        this.position_facs.length_factor = this.make_length_factor(this.start_time, _end_time);
        this.move_gray();
    }


    make_length_factor(start_time, end_time){
        console.log(start_time);
        const length_factor = ((parseInt(end_time.split("_")[0])-parseInt(start_time.split("_")[0]))*2 + (parseInt(end_time.split("_")[1])-parseInt(start_time.split("_")[1])));
        return "length_"+length_factor;
    }
    
    make_y_factor(start_time){
        const y_factor = (parseInt(start_time.split("_")[0])-9)*2 + (parseInt(start_time.split("_")[1])-0);
        return "y_"+y_factor;
    }

    make_x_factor(week){
        return "x_"+week;
    }
    post_me_in_table_gray(){
        console.log(this.position_facs)
        const gray_block = $(`<div class="${this.position_facs['length_factor']} lecture_gray ${this.position_facs['y_factor']} ${this.position_facs['x_factor']} gray_${this.lecture_id}"></div>`);
        $(".lecture_gray_container").append(gray_block);
    }
    remove_me_from_table_gray(){
        $(`.gray_${this.lecture_id}`).remove();
    }
    remove(){
        remove_me_from_table_gray();
    }
    append_card(){
        const lecture_id = this.lecture_id;
        const card = $(`<div class="card ${lecture_id}" data-lecture_id='${lecture_id}'>
        <input  style="display: none;"  data-week="mon" data-start_time="9_0" data-end_time="10_0" data-room=" " data-lecture_id='${lecture_id}' class="data_input_${lecture_id}">
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

    $(`.cards_container`).append(card);
}   
}
class Subject{
    constructor(subject_id, name = "None", color = "None"){
        this.subject_id = final_subject_list.new_subject_id();
        this.name = name;
        this.color = color;
        this.lecture_list = [];
    }
    update_name(_name){
        this.name = _name;
    }
    update_color(_color){
        this.color = _color;
    }
    new_lecture_id(){
        return `lecture_${this.lecture_list.length + 1}`;
    }
    append_lecture(lecture){
        this.lecture_list.push(lecture);
        lecture.post_me_in_table_gray();
        lecture.append_card();
    }
    idx_of(lecture_id){
        if (this.is_empty()) return -1;
        for(let i = 0; i<this.lecture_list.length;i++){

            if(this.lecture_list[i].lecture_id == lecture_id){
                return i;
            }
        }
        return -1;
    }
    get_lecture(lecture_id){
        if(!lecture_id){
            console.log("lecture id is undefined");
            return;
        }
        return this.lecture_list[this.idx_of(lecture_id)];
    }
    is_empty(){
        if(this.lecture_list.length == 0) return true;
        else return false;
    }
    remove_lecture(lecture_id){
        if(this.is_empty()) return -1;
        $(`.${lecture_id}`).remove();
        (this.get_lecture(lecture_id)).remove_me_from_table_gray();
        this.lecture_list.splice(this.idx_of(lecture_id));

    }
    post_me_in_table(){
        let name = this.name;
        let color = this.color;
        let subject_id = this.subject_id;
        this.lecture_list.forEach(function(lecture){
            const lecture_block = $(
                `<div onclick='if(confirm("${name} 과목을 삭제합니다.")) {remove_subject(this)}' 
                data-subject_id ="${subject_id}"
                data-name="${name}" 
                data-start="${lecture.position_facs.y_factor}" 
                data-end="${lecture.position_facs.y_factor + lecture.position_facs.length_factor}" 
                class="${subject_id} lecture ${color} ${lecture.position_facs.x_factor} ${lecture.position_facs.y_factor} ${lecture.position_facs.length_factor}">
                    <div class="subject">${name}</div>
                    <div class="room">${lecture.room}</div>
                </div>`
            );
            $(".lecture_container .tmp_container").prepend(lecture_block);
            lecture.remove_me_from_table_gray();
        })
    }
    remove_me_from_table(){
        let subject_id = this.subject_id;
        $(`.${subject_id}`).remove();
    }
}

class Subjects{
    constructor(){
        this.times = {
            mon:[], tue:[], wed:[], thr:[], fri:[]
        }
        this.subject_list = [];
    }
    push_to_times_arr(Subject){
        let times = this.times;
        Subject.lecture_list.forEach(function(lecture){
            let week = lecture.position_facs.x_factor.split("_")[1];
            let start_time = parseInt(`${lecture.position_facs.y_factor.split("_")[1]}`);
            let end_time = start_time + parseInt(`${lecture.position_facs.length_factor.split("_")[1]}`)-1;
            times[week].push({"lecture_id":lecture.lecture_id,"start":start_time, "end":end_time});
        })
    }
    remove_from_times_arr(_subject_id){
        let Subject = get_subject(_subject_id);
        let times = this.times;
        Subject.lecture_list.forEach(function(lecture){
            let week = lecture.position_facs.x_factor.split("_")[1];
            for(let i = 0; i<times[week].length;i++){
                if(times[week][i]['lecture_id'] == lecture.lecture_id){
                    times[week].splice(i);
                    console.log(`removed ${lecture} from ${times[week][i]}`);
                }
            }
        })
    }
    remove_from_subject_list(_subject_id){
        for(let i = 0; i<this.subject_list.length;i++){
            if(this.subject_list[i].subject_id == _subject_id){
                this.subject_list.splice(i);
            }
        }
    }

    remove_subject_from_table(_subject_id){
        $(`.${_subject_id}`).remove();
    }

    remove_subject(_subject_id){
        this.remove_subject_from_table(_subject_id);
        this.remove_from_times_arr(_subject_id);
        this.remove_from_subject_list(_subject_id);
    }
    append_subject(Subject){
        console.log(Subject)
        Subject.post_me_in_table();
        this.subject_list.push(Subject);
        this.push_to_times_arr(Subject);
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
        let times = this.times;

        subject.lecture_list.forEach(function(lecture){
            let week = lecture.position_facs.x_factor.split("_")[1];
            let start = parseInt(`${lecture.position_facs.y_factor.split("_")[1]}`);
            let end = start + parseInt(`${lecture.position_facs.length_factor.split("_")[1]}`);

            times[week].forEach(function(time_pack){
                if(time_pack.start<=start&&start<=time_pack.end){
                    console.log(`${start}`);
                    console.log(`${time_pack.start}`);
                    console.log(`${time_pack.start}<=${start}<=${time_pack.end}`)
                    is_colision_happend = true;
                    return is_colision_happend;
                }
                if(time_pack.start<=end&&end<=time_pack.end){
                    console.log("latter")
                    console.log(`${time_pack.start}<=${end}<=${time_pack.end}`)
                    is_colision_happend = true;
                    return is_colision_happend;
                }
            })

        })
        return is_colision_happend;
    }
}

let final_subject_list = new Subjects();
let subject_node;

function initiate(){
    // reset_form();
    subject_node = new Subject(final_subject_list.new_subject_id());
}

function remove_subject(self){
    // const name = $(self).data("name");
    // let targets_to_remove = $(`.${name}`)
    // targets_to_remove.each(function(index, item){
    //     $(item).remove();
    // })
    const subject_id = $(self).data("subject_id");
    final_subject_list.remove_subject(subject_id);
}

$(document).ready(function() {
    initiate();
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

    append_lecture();
});

function clicked_color(self){
    $(".color_select").removeClass("selected");
    $(self).addClass("selected");
    $(".color_selected").val($(self).data("color"));
}

function clicked_card_x(self){
    // remove_gray_lecture($(self).parent().data("lecture_id"));
    // $(self).parent().remove();
    // if($(".cards_container .card").length == 0){
    //     append_lecture();
    // }
    subject_node.remove_lecture($(self).parent().data("lecture_id"));
    if($(".cards_container .card").length == 0){
        append_lecture();
    }
}
function append_lecture(){

    let lecture_node = new Lecture(subject_node.new_lecture_id(), subject_node.subject_id);
    const lecture_id = lecture_node.lecture_id;
    subject_node.append_lecture(lecture_node);
}

function new_lecture_id(){
    const card_cnt = $(".card").length;
    return `lecture_${card_cnt + 1}`;
}

function clicked_plus_btn(self){
    append_lecture();
}

function changed_card_week(self){
    const week = $(self).val();
    const lecture_id = $(self).data("lecture_id");
    subject_node.get_lecture(lecture_id).update_week(week);
}

function changed_card_start_time(self){
    const lecture_id = $(self).data("lecture_id");
    const start_time = $(`.start_time`).val();
    const end_time = $(`.end_time`).val();
    if(!is_valid_time(start_time, end_time)){
        alert("시작 시간을 종료시간 이후로 입력해 주세요.");
        $(".start_time").val("9_0");
        change_data_input(lecture_id, "start_time", "9_0");
        return;
    }
    subject_node.get_lecture(lecture_id).update_start_time(start_time);
}

function changed_card_end_time(self){

    const lecture_id = $(self).data("lecture_id");
    const start_time = $(`.start_time`).val();
    const end_time = $(`.end_time`).val();
    if(!is_valid_time(start_time, end_time)){
        alert("시작 시간을 종료시간 이후로 입력해 주세요.");
        $(".end_time").val("10_0");
        change_data_input(lecture_id, "end_time", "10_0");
        return;
    }
    subject_node.get_lecture(lecture_id).update_end_time(end_time);
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
    if($(".subject_name").val() == false){
        console.log(document.getElementsByClassName("subject_name"));
        alert("수업 이름을 입력하세요.");
        return;
    }
    else{
        console.log("GOGOGO")
        // const subject_name = $(".subject_name").val();
        // const color = $(".color_selected").val();
        // const new_subject = new Subject(final_subject_list.new_subject_id(), subject_name, color);
        // $(".card").each(function(card){
        //     let card_obj = $(this);
        //     console.log(card_obj)
        //     let lecture_id = card_obj.data("lecture_id");
        //     let week = get_lecture_data(lecture_id, "week");
        //     let start_time = get_lecture_data(lecture_id, "start_time");
        //     let end_time = get_lecture_data(lecture_id, "end_time");
        //     let room = get_lecture_data(lecture_id, "room");

        //     new_subject.append_lecture(new Lecture(new_subject.new_lecture_id(), new_subject.subject_id, room, start_time, end_time, week));
        // });
        if(final_subject_list.is_colision(subject_node)){

            alert("수업시간이 서로 겹칩니다.");
            return;
        }
        else{
            console.log("GOGOGOGOGOGO")
            subject_node.update_name($(".subject_name").val());
            subject_node.update_color($(".color_selected").val());
            final_subject_list.append_subject(subject_node);
            reset_form();

            return;
        }
    }
}

function reset_form(){
    $('form').each(function() {
        this.reset();
    });
    $(".color_select").removeClass("selected");
    $(".color_select.blue").addClass("selected");
    $(".color_selected").val("blue");
    // initiate();
}

function get_lecture_data(lecture_id, key){
    const data_input = $(`.data_input_${lecture_id}`);
    const value = data_input.data(key);
    return value;
}

function remove_all_cards(){
    $(".cards_container").empty();
}