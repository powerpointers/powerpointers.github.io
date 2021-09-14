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

function displayScores(scores) {
    let list = []
    for (let key in scores) {
        let score = scores[key];
        list.push([score, key])
    }

    list.sort((a, b) => {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    })

    for (let i=0; i<list.length; i++) {
        list[i] = `<li>${list[i][1]} <code>${list[i][0]}</code></li>`
    }

    return `
    <section class="style-seventeen">
        <div class="wordart">
            <h1 class="preview" data-content="Placar">Placar</h1>
        </div>
    </section>

    <ol>
        ${list.join('\n')}
    </ol>

    `
}

function displayAll(array) {
    let scores = {};
    let list = [];
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
            if (author in scores) {
                scores[author] += 1;
            } else {
                scores[author] = 1;
            }
        }
        if (data.title !== undefined) {
            title = data.title;
        }
        if (data.date !== undefined) {
            date = data.date;
        }
        list.push(`<li> \
            ${date} \
            [<a href="${link}">link</a>] \
            [<a href="${slides}">slides</a>] \
            <span>${author}</span> \
            ${title} \
            </li>
            `)
    }

    return `\
    <ul>
        ${list.join('\n')}
        ${NextLine(array)}
    </ul>

    ${displayScores(scores)}`
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
    return `<li> ${date} [<a href="./meet">meet</a>] <span>?</span> ?</li>`
}

function ListPowers(path) {
    loadJSON(path, function (array) {
        document.getElementById('powerpoints').innerHTML = displayAll(array)
    }, function (error) {
        console.log(error)
    });
}
