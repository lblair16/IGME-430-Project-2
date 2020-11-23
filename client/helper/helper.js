//redirect the window to the appropriate page
const redirect = (response) => {
    window.location = response.redirect;
};

//default error handler if one isn't provided
const handleError = (message) => {
    console.log(message);
};

//handle an ajax request
const sendAjax = (type, action, data, success, userError) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function (xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            userError ? userError(messageObj.error) : handleError(messageObj.error);
        }
    })
}