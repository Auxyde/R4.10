const fs = require("fs");
const FILENAME = "./db/data.json";

const defaultPosts = [
  { id: 1, title: "Jour 1", content: "Paragraphe 1" },
  { id: 2, title: "Jour 2", content: "Paragraphe 2" },
  { id: 3, title: "Jour 3", content: "Paragraphe 3" },
];

loadPosts = () => {
  try {
    const str = fs.readFileSync(FILENAME, { encoding: "utf-8" });
    return JSON.parse(str);
  } catch (error) {
    return defaultPosts;
  }
};
savePosts = (posts) => {
  fs.writeFileSync(FILENAME, JSON.stringify([...posts], undefined, 2));
};

post = (...queries) => {
  const posts = loadPosts();
  const newPost = {
    id: posts.length + 1,
    title: queries["title"] || `Jour ${posts.length + 1}`,
    content: queries["content"] || `Paragraphe ${posts.length + 1}`,
  };
  savePosts([...posts, newPost]);
  return newPost;
};

editPost = (id, ...queries) => {
  const posts = loadPosts();
  let post = posts.find((post) => post.id === +id);
  queries = queries[0];
  if (post) {
    post.title = queries.title || post.title;
    post.content = queries.content || post.content;
    savePosts(posts);
  } else {
    post = {
      id: id || posts.length + 1,
      title: queries.title || `Jour ${posts.length + 1}`,
      content: queries.content || `Paragraphe ${posts.length + 1}`,
    };
    savePosts([...posts, post]);
  }
};

getPost = (id) => {
  const posts = loadPosts();
  const post = posts.find((post) => post.id === +id);
  return post || {};
};

deletePost = (id) => {
  const posts = loadPosts();
  const post = posts.find((post) => post.id == +id);
  if (post) {
    const index = posts.indexOf(post);
    posts.splice(index, 1);
    savePosts(posts);
  }
  return post;
};

module.exports = {
  loadPosts,
  post,
  getPost,
  deletePost,
  editPost,
};
