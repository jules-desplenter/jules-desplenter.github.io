
function addcontact() {
  console.log("done");
  let name = data.name.split(' ')[0]
  let surname = name[0];
  let behindname = "";
  for(let i = 1; i < name.length(); i++){
    behindname += name[i] + " ";
  }
  var data = `BEGIN:VCARD
  VERSION:3.0
  N:Desplenter;Jules;;;
  FN:Desplenter Jules
  ORG:Ugent;
  EMAIL;type=INTERNET;type=HOME;type=pref:jules.desplenter1@gmail.com
  TEL;type=CELL;type=VOICE;type=pref:+32477329979
  NOTE:Student industrieel ingenieur
  BDAY:2000-26-10
  END:VCARD`;
  window.open("data:text/x-vcard;urlencoded," + data);
}


const place_stuff = (data) => {
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("bio").innerHTML = data.bio;
  document.getElementById("picture").src = data.picture;
  links = [];
  links.push({ link: data.facebook, importance: data.facebook_importance, social: "facebook" });
  links.push({ link: data.instagram, importance: data.instagram_importance, social: "instagram" });
  links.push({ link: data.linkedin, importance: data.linkedin_importance, social: "linkedin" });
  links.sort(function (a, b) {
    return b.importance - a.importance
  });


  html = ''
  for (i = 0; i < links.length; i++) {
    html += `<a
      class="c-main__links-items"
      href="${links[i].link}"
      ><img class="c-pic" src="./images/icons8-${links[i].social}.svg" alt="facebook logo"
    /><div class="c-main__links-text">${links[i].social}</div></a>`
  }
  document.getElementById("links").innerHTML = html;
}


const init = async () => {
  document.getElementById("contact").addEventListener("click",addcontact);
  fetch("/js/test.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => place_stuff(data));
};

document.addEventListener("DOMContentLoaded", init);
