function replaceWord(inner, word){
    let replacement = "<span class='dudesInIowa'> Two Dudes In Iowa</span>";

    // if some/many in front: include it & replace it too
    let regexSomeMany = new RegExp("([some|many]+) " + word.toLowerCase(), "g");

    // if number in front: include it & replace it too
    // eg: 23 people doesnt become 23 Two Dudes in Iowa
    let regexWithNumCapitalized = new RegExp("([0-9]+) "+word, "g");
    let regexWithNumLower = new RegExp("([0-9]+) "+word.toLowerCase(), "g");

    //Have to exclude matches that start with - _ / to retain links
    let regex = new RegExp("(?<!-|_|\/)"+word, "g");
    let regexLower = new RegExp("(?<!-|_|\/)"+word.toLowerCase(), "g");

    return inner
        .replace(regexSomeMany,replacement)
        .replace(regexWithNumCapitalized,replacement) //capitalized with # in front
        .replace(regexWithNumLower,replacement) //lowercase with # in front
        .replace(regex,replacement) //capitalized
        .replace(regexLower,replacement) //lowercase

}

window.onload = function(){
    let wordsToReplace = [
        "Experts",
        "Doctors",
        "People",
        "Protestors",
        "Americans",
        "Investigators",
        "Protestors",
        "Doctors",
        "Dentists",
        "Politicians",
        "Witnesses",

        "Trump"//for testing headlines, since he's in all of them
    ];
    document.querySelectorAll('h1,h2,h3,h4,h5').forEach(function(header){
        let inner = header.innerHTML;
        wordsToReplace.forEach(function(word){
            inner = replaceWord(inner,word);
        });
        header.innerHTML = inner;

    });

    let toggleIncludeArticles = false;

    chrome.storage.sync.get("toggleIncludeArticles", function(items) {
        toggleIncludeArticles= items.toggleIncludeArticles;
        console.log('toggle found');

        if(toggleIncludeArticles){
            console.log('toggledOn');//p,.cnn-search__result-body,
            const containers = [
                "a",
                "p",
                "span",
                //CNN
                ".cnn-search__result-body",
                ".zn-body__paragraph",
                //huffington
                ".card__headline__text",
                //washington post
                ".blurb"
            ];
            document.querySelectorAll(containers.join(',')).forEach(function(para){
                let inner = para.innerHTML;
                wordsToReplace.forEach(function(word){
                    inner = replaceWord(inner,word);
                });
                para.innerHTML = inner;
            });
        }
    });

    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.dudesInIowa { color: red; }';
    document.getElementsByTagName('head')[0].appendChild(style);
};
