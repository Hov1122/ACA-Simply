import { fetchData } from "../helpers.js";
import { Posts } from "./Posts.js";
import { Input } from "./Input.js";
import { BASE_URL } from "../constants.js";

export const App = () => {
  const state = {
    posts: [],
    filteredPosts: [],
    inputValue: "",
    post: {
      userId: "",
      id: "",
      title: "",
      body: ""
    }
  };

  const filterPosts = (ev) => {
    const temp = state.posts.filter((item) => {
      return item.title.includes(ev.target.value);
    });

    state.inputValue = ev.target.value;
    setFilteredPosts(temp);
  };

  window.state = state;

  let popUp = '';
  document.querySelector('.pop-up').addEventListener('click', (e) => {
    e.stopPropagation();
    popUp = document.querySelector('.add-post-pop--up');
    popUp.style.display = 'flex';
    document.body.classList.add('background');
  })

  document.addEventListener('click', (e) => {
    if (e.target === popUp || popUp.contains(e.target)) {
      return;
    }
    popUp.style.display = 'none';
    document.body.classList.remove('background');
    state.post = {title: "", body: ""};
    const inputs = document.querySelectorAll('.add-post-pop--up > input');
    inputs.forEach(input => input.value = '');
  })

  const inputs = document.querySelectorAll('.add-post-pop--up > input')
  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {

      if (e.target.dataset.val === 'title')
        state.post.title = e.target.value;
      else
        state.post.body = e.target.value;
      if (state.post.body.length && state.post.title.length)
        document.querySelector('.post-btn').disabled = false;
      else
        document.querySelector('.post-btn').disabled = true;
    })
  })

  document.querySelector('.post-btn').addEventListener('click', (e) => {

    // fetch('http://localhost:8000/api/v1/posts', {
    //   method: 'POST',
    //   headers: {
    //         'Content-Type': 'application/json'
    //       },
    //   body: JSON.stringify({})
    // })

    fetchData('/posts', {
      method: 'POST',
      body: JSON.stringify(state.post)
    })
  })

  const container = document.createElement("div");
  container.classList.add("main-container");
  container.setAttribute("component-name", "App");

  const render = () => {
    fetch('http://localhost:8000/api/v1/posts').then((data) => data.json())
        .then(console.log)

    container.innerHTML = "";
    container.append(Input(filterPosts, state.inputValue));
    container.append(
      Posts(
        state.inputValue ? state.filteredPosts : state.posts,
        state.inputValue
      )
    );
  };

  const setPosts = (posts) => {
    state.posts = posts;
    render();
  };

  const setFilteredPosts = (filtered) => {
    state.filteredPosts = filtered;
    render();
  };

  fetchData("/posts")
    .then((posts) => {
      state.posts = posts;
      const usersIds = Array.from(new Set(posts.map((post) => post.userId)));
      const promises = usersIds.map((userId) => fetchData(`users/${userId}`));

      return Promise.all(promises);
    })
    .then((users) => {
      const posts = state.posts.map((post) => {
        return {
          ...post,
          creator: users.find((user) => post.userId === user.id),
        };
      });
      setPosts(posts);
    });

  render();

  return container;
};