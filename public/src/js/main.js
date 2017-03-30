console.log('Document ready')

if (typeof document.querySelectorAll === 'undefined' || typeof document.querySelector('body').classList === 'undefined') {
    return;
} else {
    //add css dragging
    document.querySelector('body').classList.add('drag')
}

// console.log('draggable' in document.createElement('span'))

var dragSrcEl = null;

function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', this.innerHTML);
    // e.dataTransfer.setData('text/html', this.innerHTML);
}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
});

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
});

function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text');
        // this.innerHTML = e.dataTransfer.getData('text/html');
    }

    var reagange = [];

    $('#columns').element.querySelectorAll('li').forEach(function(el,i){
        var todoList = $(el).querySelector('.order-control')
        reagange.push($(todoList).attr('data-id'))
        
    })

    $().ajax({
        requestType: 'POST',
        url: '/reorder',
        jsonData: {
            changedOrder: reagange
        },
        cb: function(err, data) {
            if (err) {
                console.log(err)
                return;
            }
            console.log(data)
        }
    })

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.style.opacity = '1';

    [].forEach.call(cols, function(col) {
        col.classList.remove('over');
    });
}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});
$(document).ready(function() {

})
