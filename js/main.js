
const place_stuff = (data) => {
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("bio").innerHTML = data.bio;
    document.getElementById("picture").src = data.picture;
    links = [];
    links.push({link:data.phone,importance:data.phone_importance,social:"phone" });
    links.push({link:data.facebook,importance:data.facebook_importance,social:"facebook" });
    links.push({link:data.instagram,importance:data.instagram_importance,social:"instagram" });
    links.push({link:data.linkedin,importance:data.linkedin_importance,social:"linkedin" });
    links.sort(function(a,b) {
        return b.importance - a.importance
    });
    console.log(links);
    html = `<a
    class="c-main__links-big"
    href="${links[0].link}"
    ><img class="c-pic" src="./images/${links[0].social}.svg" alt="facebook logo"
  /></a>`
  for(i = 1; i < links.length; i++){
      html += `<a
      class="c-main__links-small"
      href="${links[i].link}"
      ><img class="c-pic" src="./images/${links[i].social}.svg" alt="facebook logo"
    /></a>`
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
