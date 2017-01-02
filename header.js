function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/html");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("header.html", function(text){
  document.getElementById("navMenu").innerHTML = text;
});

readTextFile("footer.html", function(text){
  document.getElementById("footer").innerHTML = text;
});
