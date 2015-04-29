function fillTable() {
    $.ajax({
        type: "GET",
        url: "/students"
    }).done(function(data){
        console.log(data);
    })
}

function addRecord() {

    var id = $("#student-id").val(),
        name = $("#student-name").val(),
        email = $("#student-email").val(),
        classes = $("#student-classes").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:1337/students",
        data: {
            "id": id,
            "name": name,
            "email": email,
            "classes": classes
        }
    }).done(function(result){
        console.log(result);
        fillTable();
    });

}

$(document).ready(function() {

    fillTable();

    $("#input-info").submit(function(event) {
        addRecord();
        event.preventDefault();
    });


});
