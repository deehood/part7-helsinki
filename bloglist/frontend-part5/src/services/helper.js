const handleLogout = () => {
  window.localStorage.removeItem("loggedUser");
  window.location.reload();
};

const sortBlogs = (blogsToSort) => {
  const blogsCopy = [...blogsToSort];

  return blogsCopy.sort((a, b) => b.likes - a.likes);
};

export default { sortBlogs, handleLogout };
