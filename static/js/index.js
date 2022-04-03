//headers for API Request to fetch images
let myHeaders = new Headers();
let requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
//input search box element
const inputSearch = document.getElementById("search");
//event listener to track search input changes
inputSearch.addEventListener("change", (e) => fetchData(e));

//fetch function to fetch images and adds to DOM
const fetchData = (e) => {
  const container = document.getElementById("container");
  container.innerHTML = "";
  const term = e.target.value;
  fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=31d3b5c501c79e5ee5bcdd3fcd1c8ed0&text=${term}&format=json&nojsoncallback=1`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const photosArry = result.photos.photo;
      photosArry.map((photo) => {
        const { id, server, secret } = photo;
        let imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
        const content = `<img class="card" src=${imageUrl} />`;
        container.innerHTML += content;
      });
    })
    .catch((error) => console.log("error", error));
};
