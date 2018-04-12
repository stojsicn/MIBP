document.getElementById("KLink").onclick = function(event) {
    window.location.href = "Kupus.html";
}
document.getElementById("SLink").onclick = function(event) {
    window.location.href = "Popov.html";
}
document.getElementById("VLink").onclick = function(event) {
    window.location.href = "Vidakovic.html";
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
  