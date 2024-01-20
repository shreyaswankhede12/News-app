var cat;
var count;
var cc;
// document.querySelector("button").setAttribute("onclick","doSomething()");
// function getOption_cat() {
//     var a = document.getElementById("mycat");
//     cat = a.options[a.selectedIndex].text;
//     // News(count, cat, cc);
// }
// function getOption_cc() {
//     var a = document.getElementById("mycc");
//     cc = a.options[a.selectedIndex].text;
//     // News(count, cat, cc);
// }
// function getOption_co() {
//     var a = document.getElementById("myco");
//     count = a.options[a.selectedIndex].text;
//     News(count, cat, cc);
// }
function doSomething(){
    cat = document.querySelector('input[name="category"]:checked').id;
    cc = document.querySelector('input[name="cc"]:checked').id;
    count = document.getElementById('count').selectedIndex + 1 ;
    document.querySelector('form').remove();
    News(count,cat,cc);
    // var a = document.createElement('ol');

    // var tree = document.createDocumentFragment();
    // var link = document.createElement("p");
    // link.setAttribute("id", "id1");
    // link.appendChild(document.createTextNode(cat));
    // tree.appendChild(link);

    // // var tree = document.createDocumentFragment();
    // var link = document.createElement("p");
    // link.setAttribute("id", "id2");
    // link.appendChild(document.createTextNode(cc));
    // tree.appendChild(link);

    // // var tree = document.createDocumentFragment();
    // var link = document.createElement("p");
    // link.setAttribute("id", "id3");
    // link.appendChild(document.createTextNode(count));
    // tree.appendChild(link);

    // var div = document.createElement("div");
    // div.setAttribute("id", "id2");
    // div.appendChild(document.createTextNode("divText"));
    // tree.appendChild(div);

    // for (let i = 0; i < count; i++) {
    //     var link = document.createElement("p");
    //     link.setAttribute("id", "id1");
    //     link.appendChild(document.createTextNode(cat));
    //     tree.appendChild(link);
    // }
    // document.getElementById("main").appendChild(tree);

}
function News(count, cat, cc){
    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '3ea0fb695cmshcc44272fbd4c5acp14fc6cjsn7dc6bc61783e',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };
    var url = 'https://bing-news-search1.p.rapidapi.com/news?count=' + count + '&category=' + cat + '&cc=' + cc + '&safeSearch=Off&textFormat=Raw';
    // for (let k = 0; k < 3*count; k++) {
    //     var p = document.createElement("p");
    //     var a = document.createTextNode("loading...");
    //     p.appendChild(a);
    // }
    // var node_list = document.querySelectorAll("p");
    // console.log(node_list);
    // node_list[0].innerHTML = 'Hello';
    var tree = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        var link = document.createElement("h5");
        link.setAttribute("id", "id"+i);
        link.setAttribute("class", "heading");
        link.appendChild(document.createTextNode("loading"));
        tree.appendChild(link);

        var div = document.createElement("p");
        div.setAttribute("id", "des"+i);
        div.setAttribute("class", "description");
        div.appendChild(document.createTextNode("divText"));
        tree.appendChild(div);

        var link = document.createElement("a");
        link.setAttribute("id", "url"+i);
        link.setAttribute("class", "refurl");
        // link.setAttribute("href", "http://site.com");
        link.appendChild(document.createTextNode("loading"));
        tree.appendChild(link);

    }
    document.getElementById("main").appendChild(tree);
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < count; i++) {
                var j = i + 1;

                document.getElementById('id'+i).innerHTML ='<hr>' + '<br>' + j + '. Title: ' + data.value[i].name;
                document.getElementById('des'+i).innerHTML = 'Description:'.bold() + data.value[i].description;
                document.getElementById('url'+i).setAttribute("href",data.value[i].url);
                document.getElementById('url'+i).innerHTML = 'Reference URL:'.bold() + data.value[i].url;


                //+ '<br>Reference URL:' + data.value[i].url + '<br>' + data.value[i].description + "<br><br>";
                // i++;
                // document.getElementById('element'+i).innerHTML = 'url: ' + data.value[i-1].url;
                // i++;
                // document.getElementById('element'+i).innerHTML = 'description: ' + data.value[i-1].description;
                // i++;
            }

        })
        .catch(err => console.error(err));
}