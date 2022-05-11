function addcontact(data) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    let name = data.name.split(" ");
    console.log(name);
    let surname = name[0];
    let behindname = "";
    let number = data.phone + "";
    for (let i = 1; i < name.length; i++) {
        behindname += name[i] + " ";
    }
    // %3A = dubbelpunt %0A = enter %3B = ; %3D = =
    var data = `BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3A${behindname}%3B${surname}%0AFN%3A${behindname}%20${surname}%0ATEL%3Btype%3DCELL%3Btype%3DVOICE%3Btype%3Dpref%3A${data.phone}%0ANOTE%3A${data.bio}%0AEND%3AVCARD`;
    console.log(data);
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("data:text/x-vcard;urlencoded," + data);
    } else {
        if (/android/i.test(userAgent)) {
            window.open("tel:" + number)
        } else {
            window.alert(
                "this function is not available on computer but here is the phone number: " +
                number
            );
        }
    }
}

const place_stuff = (data) => {
  console.log(data.function);
  if (data) {
    if (data.directlink) {
      window.location.href = data.directlink;
    }
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("bio").innerHTML = data.bio;
    document.getElementById("link").href = data.link;
    document.getElementById("function").innerHTML = data.function;
    document.getElementById("location").innerHTML = data.location;
    document.getElementById("picture").src = data.picture;
    document.getElementById("companypicture").src = data.companypicture;
    if (data.coverpicture != "" && data.coverpicture) {
      document.getElementById("cover").src = data.coverpicture;
    }
    document
      .getElementById("contact")
      .addEventListener("click", () => addcontact(data));
    links = [];
    links.push({
      link: data.facebook,
      importance: data.facebook_importance,
      social: "Facebook",
    });
    links.push({
      link: data.instagram,
      importance: data.instagram_importance,
      social: "Instagram",
    });
    links.push({
      link: data.linkedin,
      importance: data.linkedin_importance,
      social: "Linkedin",
    });
    links.push({
      link: data.mail,
      importance: data.mail_importance,
      social: "Mail",
    });
    links.push({
      link: data.whatsapp,
      importance: data.whatsapp_importance,
      social: "Whatsapp",
    });
    links.push({
      link: data.appstore,
      importance: data.appstore_importance,
      social: "Appstore",
    });
    links.push({
      link: data.behance,
      importance: data.behance_importance,
      social: "Behance",
    });
    links.push({
      link: data.customlink,
      importance: data.customlink_importance,
      social: "Customlink",
    });
    links.push({
      link: data.drive,
      importance: data.drive_importance,
      social: "Drive",
    });
    links.push({
      link: data.dropbox,
      importance: data.dropbox_importance,
      social: "Dropbox",
    });
    links.push({
      link: data.flickr,
      importance: data.flickr_importance,
      social: "Flickr",
    });
    links.push({
      link: data.github,
      importance: data.github_importance,
      social: "Github",
    });
    links.push({
      link: data.snapchat,
      importance: data.snapchat_importance,
      social: "Snapchat",
    });
    links.push({
      link: data.stackoverflow,
      importance: data.stackoverflow_importance,
      social: "Stackoverflow",
    });
    links.push({
      link: data.tripadvisor,
      importance: data.tripadvisor_importance,
      social: "Tripadvisor",
    });
    links.push({
      link: data.twitter,
      importance: data.twitter_importance,
      social: "Twitter",
    });
    links.push({
      link: data.vimeo,
      importance: data.vimeo_importance,
      social: "Vimeo",
    });
    links.push({
      link: data.xing,
      importance: data.xing_importance,
      social: "Xing",
    });
    links.push({
      link: data.youtube,
      importance: data.youtube_importance,
      social: "Youtube",
    });
    links.push({
      link: data.yelp,
      importance: data.yelp_importance,
      social: "Yelp",
    });
    links.sort(function (a, b) {
        if (a.importance == null) {
            return 1;
          } else {
            return a.importance - b.importance;
          }
    });

        html = `<a
    class="c-main__links-items c-main__links-items-first"
    href="${links[0].link}"
    ><div class="c-first"><img class="c-pic c-pic-first" src="./images/logos/${links[0].social}.svg" alt="facebook logo"
  /><div><div class="c-main__links-text-first">${links[0].social}</div><div class="c-main__links-text">Make sure to take a look here it's my favorite!</div></div></div></a>`;
        for (i = 1; i < links.length; i++) {
            if (links[i].importance) {
                html += `<a
      class="c-main__links-items"
      href="${links[i].link}"
      ><img class="c-pic" src="./images/logos/${links[i].social}.svg" alt="facebook logo"
    /><div class="c-main__links-text">${links[i].social}</div></a>`;
            }
        }
        document.getElementById("links").innerHTML = html;
    }
};

const init = async () => {
  const splash = document.querySelectorAll(".down");
  setTimeout(() => {
    splash[0].classList.add("display-none");
    splash[1].classList.add("display-none");
  }, 2000);
  // online
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  url = `https://dotdbelgium.azurewebsites.net/api/getuser?code=XJ312iaiqxMTfwLqPCyzPNU6MJkPMIhTDVCiiMWihcmOQ01cPxUi5g==&id=${params.id}`;
  data = {};
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
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => place_stuff(data));
};

document.addEventListener("DOMContentLoaded", init);