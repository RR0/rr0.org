style = null;

function setTitle(tit, u, s) {
    title = tit;
    url = u;
    style = s;
}
function getTitle() {
    if (!title) {
        title = time.getYear();
        if (title) {
            if (getTime().month) {
                title = time.monthName() + " " + title;
                var dayOfMonth = time.getDayOfMonth();
                if (dayOfMonth) {
                    title = org.rr0.time.dayOfWeekNam(time.getDayOfWeek()) + " " + dayOfMonth + " " + title;
                }
            }
            setTitle(title);
        } else {
            var p = getPeople();
            if (p) {
                title = p.toString();
            } else {
                var uri = getUri();
                var ls = uri.lastIndexOf("/");
                var htmlExt = uri.lastIndexOf(".html");
                if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) != "index") {
                    title = uri.substring(ls + 1, htmlExt);
                } else if (ls < uri.length - 1) {
                    var ps = ls - 1;
                    while (uri.charAt(ps) != '/') ps--;
                    title = uri.substring(ps + 1, ls).toUpperCase();  // Accronym assumed
                } else {
                    title = uri.substring(ls + 1);
                }
            }
        }
    }
    return title;
}
var titleTag;
function addTitle() {
    var headTitle = document.createElement("title");
    var titleText = getTitle();
    headTitle.innerHTML = titleText;
    org.addToHead(headTitle);

//    var h1 = document.createTextNode(titleText);
//    if (url) h1 = linkElement(url, h1);
//    if (style) h1 = spanElement(style, h1);
//    titleTag = newElement("h1", h1);
//    h1.className = constantClass;
//    var main = document.getElementById("main");
//    main.insertBefore(titleTag, main.firstChild);
    var titleHtml = "<h1 class='" + org.rr0.constantClass + "'>" + titleText + "</h1><ul>";
    titleHtml += "<li onclick=\"document.location=org.rr0.getUri()+'#top'\">⤒</li>";
    for (var i = 0; i < sections.length; i++) {
        var sec = sections[i];
        titleHtml += "<li class='" + org.rr0.constantClass + "' onclick=\"document.location=org.rr0.getUri()+'#section" + i + "'\">" + sec + "</li>";
    }
    titleHtml += "</ul>";
    setNavTitle(titleHtml);
}
function headResized() {
    var headerHeight = document.getElementById("head").offsetHeight;
    var main = document.getElementById("main");
    main.style.marginTop = headerHeight + "px";
    document.getElementById("contents").style.height = (main.offsetHeight - headerHeight) + "px";
}

if (window.addEventListener) {    // most non-IE browsers and IE9
    window.addEventListener("resize", headResized, false);
} else if (window.attachEvent) {  // Internet Explorer 5 or above
    window.attachEvent("onresize", headResized);
}
