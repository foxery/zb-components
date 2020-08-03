
function inRange(array, index) {
    return index >= 0 && index < array.length;
}

function swap(array, index0, index1) {
    if (typeof index0 == 'function') {
        index0 = findIndex(array, index0);
    }

    if (typeof index1 == 'function') {
        index1 = findIndex(array, index1);
    }

    if (inRange(array, index0) && inRange(array, index1)) {
        const tmp = array[index0];
        array[index0] = array[index1];
        array[index1] = tmp;
    }
    return array;
}

function findIndex(array, predicate) {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i)) {
            index = i;
            break;
        }
    }
    return index;
}

function moveUp(array, index) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }

    if (inRange(array, index) && inRange(array, index - 1)) {
        return swap(array, index, index - 1);
    }
    return array;
}

function moveDown(array, index) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }

    if (inRange(array, index) && inRange(array, index + 1)) {
        return swap(array, index, index + 1);
    }
    return array;
}

function moveTop(array, index) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }

    if (inRange(array, index)) {
        while (index > 0) {
            swap(array, index, index - 1);
            index--;
        }
    }
    return array;
}

function moveBottom(array, index) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }

    if (inRange(array, index)) {
        while (index < array.length - 1) {
            swap(array, index, index + 1);
            index++;
        }
    }
    return array;
}

function move(array, from, to) {
    if (typeof from == 'function') {
        from = findIndex(array, from);
    }

    if (typeof to == 'function') {
        to = findIndex(array, to);
    }

    if (inRange(array, from) && inRange(array, to)) {
        if (from > to) {
            let index = from;
            while (index > to) {
                swap(array, index, index - 1);
                index--;
            }
        } else if (from < to - 1) {
            let index = from;
            while (index < to) {
                swap(array, index, index + 1);
                index++;
            }
        }
    }
    return array;
}

function clear(array) {
    while (array.length > 0) {
        array.pop();
    }
    return array;
}

function remove(array, index) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (index != i) {
            newArray.push(array[i]);
        }
    }
    clear(array);
    newArray.forEach(item => {
        array.push(item);
    });
    return array;
}

function insertAt(array, index, data) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }

    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i == index) {
            result.push(data, array[i]);
        } else {
            result.push(array[i]);
        }
    }
    clear(array);
    result.forEach(item => {
        array.push(item);
    });

    return array;
}

function insertBefore(array, index, data) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i == index) {
            result.push(data, array[i]);
        } else {
            result.push(array[i]);
        }
    }
    clear(array);
    result.forEach(item => {
        array.push(item);
    });

    return array;
}

function insertAfter(array, index, data) {
    if (typeof index == 'function') {
        index = findIndex(array, index);
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i == index) {
            result.push(array[i], data);
        } else {
            result.push(array[i]);
        }
    }
    clear(array);
    result.forEach(item => {
        array.push(item);
    });

    return array;
}

function moveBefore(array, from, to) {
    if (typeof from == 'function') {
        from = findIndex(array, from);
    }

    if (typeof to == 'function') {
        to = findIndex(array, to);
    }

    if (inRange(array, from) && inRange(array, to)) {
        if (from > to) {
            let index = from;
            while (index > to) {
                swap(array, index, index - 1);
                index--;
            }
        } else if (from < to) {
            let index = from;
            while (index < to - 1) {
                swap(array, index, index + 1);
                index++;
            }
        }
    }
    return array;
}

function moveAfter(array, from, to) {
    if (typeof from == 'function') {
        from = findIndex(array, from);
    }

    if (typeof to == 'function') {
        to = findIndex(array, to);
    }

    if (inRange(array, from) && inRange(array, to)) {
        if (from > to) {
            let index = from;
            while (index > to + 1) {
                swap(array, index, index - 1);
                index--;
            }
        } else if (from < to) {
            let index = from;
            while (index < to) {
                swap(array, index, index + 1);
                index++;
            }
        }
    }
    return array;
}

const ArrayUtils = { findIndex, swap, moveUp, moveDown, moveTop, moveBottom, move, remove, insertAt, insertBefore, insertAfter, moveBefore, moveAfter };

export default ArrayUtils;