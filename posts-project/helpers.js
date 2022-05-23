import { BASE_URL } from "./constants.js";

export const fetchData = async (url, params = {}) => {

  const newUrl = url.startsWith("/") ? url.slice(1) : url;
console.log(params)
    console.log(`${BASE_URL}${newUrl}`)
  try {
    const response = await fetch(`${BASE_URL}${newUrl}`, params);
    console.log(response)
    return response.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const showComments = ({target}) => {
    const c = document.querySelector(`div[data-post-id="${target.dataset.postId}"]`);
    if (c.innerHTML != "") {
        c.innerHTML = "";
        return;
    }
  fetchData(`posts/${target.dataset.postId}/comments`)
      .then((res) => {
        console.log(res)
        const df = new DocumentFragment();
        res.forEach(({name}) => {
          const commentP = document.createElement('p');

          commentP.innerText = name;
          df.append(commentP);
        });
          c.innerHTML = "";
          c.append(df);
      })
}