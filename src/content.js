console.log("hi! this is from content.js")
function highlight(){
    var wikiHeadWord = document.getElementById("firstHeading");
    wikiHeadWord.style.fontSize = "5em";
    wikiHeadWord.style.backgroundColor = "#000000";
    wikiHeadWord.style.color = "#f4bc42";
}

chrome.runtime.onMessage.addListener(
    function( message,  sender, sendResponseFunction) {
        if(message.highlight){
            getHeaderStyle();highlight();
        }
        if(message.reset){
            console.log(message.style);
            var wikiHeadWord = document.getElementById("firstHeading");
            wikiHeadWord.style.fontSize = message.style[0].fontSize;
            wikiHeadWord.style.backgroundColor = message.style[0].backgroundColor;
            wikiHeadWord.style.color = message.style[0].color;
        }
    }
);
function getHeaderStyle(){  
    var wikiHeadWord = document.querySelector("#firstHeading");
    const style = getComputedStyle(wikiHeadWord);
    chrome.runtime.sendMessage(
        {
            storeOriginStyle:true,
            wikiHeadOriginStyle:{
                fontSize:style.fontSize,
                backgroundColor:style.backgroundColor,
                color:style.color
            }
        },
        function(response) {
            console.log("response(s) after sending the message");
            console.log(response);
        }
    );
}
