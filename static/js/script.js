const MEET_LINK = "https://meet.google.com/gnn-fnkr-agn";

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function ListLines(array) {
    let html = [];
    for (let i = 0; i < array.length; i++) {
        let data = array[i];
        let link = "#";
        let slides = "#";
        let author = "?";
        let title = "?";
        let date = "00/00";
        if (data.link !== undefined) {
            link = data.link;
        }
        if (data.slides !== undefined) {
            slides = data.slides;
        }
        if (data.author !== undefined) {
            author = data.author;
        }
        if (data.title !== undefined) {
            title = data.title;
        }
        if (data.date !== undefined) {
            date = data.date;
        }
        html.push(`<li> \
            ${date} \
            [<a href="${link}">link</a>] \
            [<a href="${slides}">slides</a>] \
            <span>${author}</span> \
            ${title} \
            </li>
            `)
    }
    return html.join('\n')
}

function zfill(s, n = 2) {
    while(s.length < n) s = `0${s}`;
    return s; 
}

function NextLine(array) {
    var d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    let day = zfill(String(d.getDate()), 2);
    let mon = zfill(String(d.getMonth() + 1), 2);

    let date = `${day}/${mon}`

    for (let i = 0; i < array.length; i++) {
        let data = array[i];
        if (data.date !== undefined && data.date === date) {
            return ""
        }
    }
    return `<li> ${date} [<a href="${MEET_LINK}">meet</a>] <span>?</span> ?</li>`
}

function ListPowers(path) {
    loadJSON(path, function (array) {
        document.getElementById('powerpoints').innerHTML = `
            <ul>
                ${ListLines(array)}
                ${NextLine(array)}
            </ul>
        `;
    }, function (error) {
        console.log(error)
    });
}
