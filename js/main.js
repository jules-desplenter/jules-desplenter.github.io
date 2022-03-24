function addcontact(data) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    let name = data.name.split(' ')
    console.log(name)
    let surname = name[0];
    let behindname = "";
    let number = data.phone + "";
    for (let i = 1; i < name.length; i++) {
        behindname += name[i] + " ";
    }
    // %3A = dubbelpunt %0A = enter %3B = ; %3D = =
    var data = `BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3A${behindname}%3B${surname}%0AFN%3A${behindname}%20${surname}%0ATEL%3Btype%3DCELL%3Btype%3DVOICE%3Btype%3Dpref%3A${data.phone}%0ANOTE%3A${data.bio}%0AEND%3AVCARD`;
    console.log(data)
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("data:text/x-vcard;urlencoded," + data);
    } else {
        if (/android/i.test(userAgent)) {
            window.open("../images/info.vcf");
        } else {
            window.alert("this function is not available on computer but here is the phone number: " + number)
        }
    }

}


const place_stuff = (data) => {
    console.log(data.function);
    if (data) {
        if (data.directlink) {
            window.location.href = data.directlink;
        }
        document.getElementById("Name").innerHTML = data.name;
        document.getElementById("Bio").innerHTML = data.bio;
        document.getElementById("Link").href = data.link;
        document.getElementById("Function").innerHTML = data.function;
        document.getElementById("Location").innerHTML = data.location;
        document.getElementById("Picture").src = data.picture;
        document.getElementById("Companypicture").src = data.companypicture;
        document.getElementById("Contact").addEventListener("click", () => addcontact(data));
        links = [];
        links.push({ link: data.facebook, importance: data.facebook_importance, social: "Facebook" });
        links.push({ link: data.instagram, importance: data.instagram_importance, social: "Instagram" });
        links.push({ link: data.linkedin, importance: data.linkedin_importance, social: "Linkedin" });
        links.push({ link: data.mail, importance: data.mail_importance, social: "Mail" });
        links.push({ link: data.whatsapp, importance: data.whatsapp_importance, social: "Whatsapp" });
        links.sort(function(a, b) {
            return b.importance - a.importance
        });


        html = `<a
    class="c-main__links-items c-main__links-items-first"
    href="${links[0].link}"
    ><div class="c-first"><img class="c-pic c-pic-first" src="./images/iconmonstr-${links[0].social}.svg" alt="facebook logo"
  /><div><div class="c-main__links-text-first">${links[0].social}</div><div class="c-main__links-text">Make sure to take a look here it's my favorite!</div></div></div></a>`
        for (i = 1; i < links.length; i++) {
            if (links[i].importance) {
                html += `<a
      class="c-main__links-items"
      href="${links[i].link}"
      ><img class="c-pic" src="./images/iconmonstr-${links[i].social}.svg" alt="facebook logo"
    /><div class="c-main__links-text">${links[i].social}</div></a>`
            }
        }
        document.getElementById("links").innerHTML = html;
    }

}


const init = async() => {
    const splash = document.querySelectorAll('.down');
    setTimeout(() => {
            splash[0].classList.add("display-none");
            splash[1].classList.add("display-none");
        }, 2000)
        // online
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    url = `https://dotdbelgium.azurewebsites.net/api/getuser?code=XJ312iaiqxMTfwLqPCyzPNU6MJkPMIhTDVCiiMWihcmOQ01cPxUi5g==&id=${params.id}`
    data = {}
    fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then((response) => {
            return response.json();
        })
        .then((data) => { place_stuff(data) })
        // test
        // fetch("/js/test.json")
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => place_stuff(data));
};

document.addEventListener("DOMContentLoaded", init);