console.log("this is background page");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.JsonMessageKey == "JsonMessageValue"){
        sendResponse(
            {ResponseJsonKey: "Backgrund js responses: ResponseJsonValue"}
        );
      }
      if(request.storeOriginStyle){
        console.log(request.wikiHeadOriginStyle);
        chrome.storage.sync.set({
          wikiHeadOriginStyle: [request.wikiHeadOriginStyle]
        }); 
        sendResponse({storageStatus: "data have been stored"});
      }  
    }
);

/*
        chrome.storage.sync.get(['wikiHeadOriginStyle'], function(result) {
          console.log(result.wikiHeadOriginStyle);
        });
*/