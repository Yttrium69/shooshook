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

    // resizer.on('mousedown', function(e) {
    //     initialHeight = e.clientY - table.height();

    //     $(document).on('mousemove', resize);
    //     $(document).on('mouseup', stopResize);
    // });

    resizer.on('touchstart', function(e) {
        initialHeight = e.originalEvent.touches[0].clientY - table.height();

        $(document).on('touchmove', resize);
        $(document).on('touchend', stopResize);
    });

    function resize(e) {
        alert(Touch.clientX);
        const newHeight = e.clientY - initialHeight;
        if (newHeight >= 100) { // You can adjust this minimum height
            table.height(newHeight);
        }
    }

    function stopResize() {
        $(document).off('mousemove', resize);
        $(document).off('mouseup', stopResize);
    }
});