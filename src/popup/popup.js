console.log("this is popup.js");
var sendMessageBtn = document.getElementById("popupBtn");
function optionalCallBack(response) {
    console.log("Response Json Value: " + response.ResponseJsonKey);
}

function sendMessageToBackground(){
    console.log("send a message");
    chrome.runtime.sendMessage(
        {
          JsonMessageKey: "JsonMessageValue" 
        },
        optionalCallBack
      );
}

sendMessageBtn.onclick = sendMessageToBackground;

var sendMessageBtnContent = document.getElementById("popupBtnContent");

function sendMessageToContentJs(){
    // get the tab ID from current window 
    chrome.tabs.query({
        active:true, currentWindow:true
    }, function(tabs){
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                highlight: true
            }
        )
    })
}
sendMessageBtnContent.onclick = sendMessageToContentJs;

var resetWikiHeader = document.getElementById("resetWikiHeader");
resetWikiHeader.onclick = sendMessageToReset;

function sendMessageToReset(){
    // get the original style of the Wikipedia Header 
    chrome.storage.sync.get(["wikiHeadOriginStyle"],function (result){
        console.log(result.wikiHeadOriginStyle);
        chrome.tabs.query({
            active:true, currentWindow:true
        }, function(tabs){
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    reset: true,
                    style: result.wikiHeadOriginStyle
                }
            )
        });
    });
    
}

/*
$(function(){
    color = $('#fontColor').val();
    $("#fontColor").on("change paste keyup", function() {
        color = $(this).val(); 
    });
    
   $('#btnChange').click(function(){      
         chrome.tabs.query(
             {active:true,currentWindow: true}, 
             function(tabs){
                chrome.tabs.sendMessage(
                      tabs[0].id, 
                      {
                        todo: "changeColor", 
                        clickedColor: color 
                      }
                    );
             }
        );
   });
});

*/