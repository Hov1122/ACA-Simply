(function () {
    const table = document.querySelectorAll('.slidable');

    window.location.href = document.querySelector('.focus').href;

    table.forEach(row => row.addEventListener('click', (e) => {
        e.stopPropagation();
        const toSlide = document.querySelector(`tbody[data-id=${e.target.parentElement.parentElement.dataset.id}]`)

        if (!toSlide) {
            return
        }
        console.log(toSlide)
        const arrow = toSlide.querySelector('div')

        if (toSlide.classList.contains('hide')) {
            console.log('asd')
            for (let i = 1; i < toSlide.childNodes.length; i++) {
                console.log(toSlide.children[i])
                if (toSlide.children[i])
                toSlide.children[i].style.display = 'none'
            }
            // toSlide.style.height = '100px';
            // console.log('a')
            // toSlide.style.display = 'table-row-group';
            toSlide.classList.remove("hide");
            arrow.classList.add('arrow-down');
            arrow.classList.remove('arrow-right')
        }
        else {
            console.log(toSlide.childNodes)
            for (let i = 1; i < toSlide.childNodes.length; i++) {
                // console.log(toSlide.children[i])
                if (toSlide.children[i])
                toSlide.children[i].style.display = 'table-row'
            }
            // toSlide.style.height = '0';
            // toSlide.style.display = 'none'
            toSlide.classList.add("hide");
            arrow.classList.add('arrow-right');
            arrow.classList.remove('arrow-down')
        }

    })
    )
}())

function fillHtml (data) {
    document.querySelector('.page_title').textContent = data.page_title;

    data.plans.forEach((logo) => {
        const l = document.querySelector(`.${logo.name.toLowerCase()}`);
        l.innerHTML = `<div class="center">${logo.name}</div>`;
        l.parentElement.href = logo.slug;
        if (!logo.active)
            l.classList.add('opacity');
    })

    const systems = document.querySelectorAll('.r-systems');

    data.tabs.forEach((tab, i) => {
        document.querySelector(`.tab${i+1}`).textContent = tab.title;
            tab.data.systems?.forEach((elem, i) => {
                const head = document.querySelector('.subs').content.cloneNode(true);
                const df = new DocumentFragment();
                for (let key in elem) {
                    const tmp = document.createElement('td');
                    if (key === 'system_name') {
                        // document.querySelector(`.${key+i}`).innerHTML = '<div class="arrow-down"></div>  James-Main-Macbook';
                        tmp.innerHTML = '<div class="arrow-down"></div>  James-Main-Macbook';
                        df.append(tmp);
                        continue;
                    }
                    if (key === 'id')
                        systems[i].dataset.id = 'i' + elem[key]
                    tmp.innerHTML = elem[key];
                    df.append(tmp);
                }

                systems[i].children[0].prepend(df);
                systems[i].append(head)
            })

            let subs = tab.data.subsystems;
            subs?.forEach((elem, i) => {
                let row = document.querySelector('.subrow').content.cloneNode(true);

                row = row.children[0];
                row.children[1].textContent = elem.licenses;
                row.children[2].textContent = elem.expires;
                row.style.display = 'none'
                document.querySelector(`tbody[data-id=${'i' + elem.system_id}]`).append(row)
            })
        // }
    })
    // console.log(document.querySelector(`tbody[data-id=${'i' + 91520}]`).children[0])
    document.querySelector(`tbody[data-id=${'i' + 91520}]`).children[0].children[0].click();
}

fetch("./text.json")
    .then(response => response.json())
    .then(fillHtml)

