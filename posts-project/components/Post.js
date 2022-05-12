import { Creator } from "./Creator.js";
import {fetchData, showComments} from "../helpers.js";

export const Post = ({ title, id : postId, body, creator: user }, inputValue) => {
  const clone = document
    .querySelector("#post-template")
    .content.cloneNode(true);

  clone.querySelector(".title").innerHTML = title.replaceAll(
    inputValue,
    `<mark>${inputValue}</mark>`
  );

  clone.querySelector("p").innerHTML = body;
  clone
    .querySelector(".post")
    .prepend(Creator(user))

  const comments = clone.querySelector('.comment-links');
  clone.querySelector('.comments-container').setAttribute('data-post-id', postId);

  comments.setAttribute('data-post-id', postId);

  comments.addEventListener('click', showComments);

  return clone;
};