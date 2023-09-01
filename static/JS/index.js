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
        if (new_height >= 50 && new_height<=500) { // You can adjust this minimum height
            table.height(new_height);
        }
    }

    function resize(e) {
        const newHeight = e.originalEvent.touches[0].clientY - initialHeight;
        if (newHeight >= 50 && newHeight<=500) { // You can adjust this minimum height
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