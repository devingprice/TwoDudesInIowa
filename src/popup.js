
// Saves options to chrome.storage
function save_options() {
    let toggleIncludeArticles = document.getElementById('toggleIncludeArticles').checked;
    chrome.storage.sync.set({
        toggleIncludeArticles: toggleIncludeArticles
    }, function() {
        console.log('saved : '+toggleIncludeArticles);
    });
}

// Restores checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        toggleIncludeArticles: false
    }, function(items) {
        document.getElementById('toggleIncludeArticles').checked = items.toggleIncludeArticles;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('toggleIncludeArticles').addEventListener('click',
    save_options);