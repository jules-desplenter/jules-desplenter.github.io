
function addcontact(data) {
  let name = data.name.split(' ')[0]
  let surname = name[0];
  let behindname = "";
  for(let i = 1; i < name.length; i++){
    behindname += name[i] + " ";
  }
  // %3A = dubbelpunt %0A = enter %3B = ; %3D = =
  // var data = `BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3A${behindname}%3B${surname}%3B%3B%3B%0AFN%3A${data.name}%0ATEL%3Btype%3DCELL%3Btype%3DVOICE%3Btype%3Dpref%3A${data.phone}%0ANOTE%3A${data.bio}%OAEND%3AVCARD`;
  var data = "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
  window.open("data:text/x-vcard;urlencoded," + data);
}


const place_stuff = (data) => {
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("bio").innerHTML = data.bio;
  document.getElementById("picture").src = data.picture;
  document.getElementById("contact").addEventListener("click",() => addcontact(data));
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
  fetch("/js/test.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => place_stuff(data));
};

document.addEventListener("DOMContentLoaded", init);
