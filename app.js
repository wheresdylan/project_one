$("#getStarted").on("click", function () {
    showUserForm();
})

$("#submit").on("click", function () {
    showUserDecision();
})

function showUserForm() {
    $('#welcomePage').hide();
    $('#userChoiceForm').show();

}


function showUserDecision() {
    event.preventDefault();
    $('#welcomePage').hide();
    $('#userChoiceForm').hide();
    $('#userResult').show();
}