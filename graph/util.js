function debugOutput(msg) {
    var htmlElement = document.getElementById("debug");
    
    if (htmlElement === null) {
        console.log(text);
    }
    else
    {
        var text = htmlElement.textContent;
        text += msg + "\n";
        htmlElement.textContent = text;
        htmlElement.scrollTop = htmlElement.scrollHeight;
    }
}
