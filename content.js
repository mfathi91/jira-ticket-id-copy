"use strict";

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function() {
    console.log('Jira ticket ID Copy: Clipboard successfully updated: ' + newClip);
  }, function() {
    console.log('Jira ticket ID Copy: failed to write to clipboard');
  });
}


browser.runtime.onMessage.addListener(request => {
  try {
    var url = window.location.href;
    var re = new RegExp("&selectedIssue=([0-9a-zA-Z-_]{1,15}).*");
    if (re.test(url)) {
      var match = re.exec(url);
      updateClipboard(match[1]);
    } else {
      console.log('Jira ticket ID Copy: URL containing ticket format not found');
    }
  } catch (error) {
    console.log(error);
  }
});