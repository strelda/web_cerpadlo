
function setValue(value_element) {
    var id;
    var decimals = 0;
    if (typeof(value_element) == "string") {
        id = value_element;
    } else {
        id = value_element.id;
        decimals = value_element.decimals ? value_element.decimals : decimals;
    }
    var value = parseFloat(data[id]).toFixed(decimals);

    var e = $('#' + id);

    if (e.is('input')) {
        $(e).attr('value', value);
    } else {
        $(e).text(value);
    }
}

function setState(state_element) {
    var run = data[state_element.run_id];
    var e = $('#' + state_element.id);
    if (!run) {
        e.text('');
    } else {
        if (state_element.load2_id) {
            if (data[state_element.load2_id]) {
                e.text('run/load 100%');
            } else if (data[state_element.load_id]) {
                e.text('run/load 50%');
            } else {
                e.text('run');
            }
        } else {
            if (data[state_element.load_id]) {
                e.text('run/load')
            } else {
                e.text('run');
            }
        }
    }
}

function setAlarm(alarm_element) {
    var alarm = data[alarm_element.id];
    alarm = alarm_element.reversed ? !alarm : alarm;
    var e = $('#' + alarm_element.id);
    if (alarm) {
        e.text(alarm_element.text);
        if (alarm_element.color) {
            $(e).css('color', alarm_element.color);
        }
    } else {
        e.text(alarm_element.off_text ? alarm_element.off_text : '');
        if (alarm_element.off_color) {
            $(e).css('color', alarm_element.off_color);
        }
    }
}

function refreshValueElements() {
    for (var i = 0; i < value_elements.length; i++) {
        var id = value_elements[i];
        setValue(id);
    }
}

function refreshStateElements() {
    for (var i = 0; i < state_elements.length; i++) {
        var se = state_elements[i];
        setState(se);
    }
}

function refreshAlarmElements() {
    for (var i = 0; i < alarm_elements.length; i++) {
        var reversed = false;
        var ae = alarm_elements[i];
        if (ae.reversed)
            reversed = true;
        setAlarm(ae);
    }
}

function refresh() {
    refreshValueElements();
    refreshStateElements();
    refreshAlarmElements();
}

// function for loading data
function loadData() {
    $.getJSON(data_file, null, function(d) {
        data = d;
        refresh();
    });
}

$(function() {
    loadData();
    // refresh every 5 sec
    setInterval(loadData, 5000);
});