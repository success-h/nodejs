console.log("before");
// getUser(1, (user) => {
//   getRepositories(user.githubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

// getUser(1)
//   .then((user) => getRepositories(user.githubUsername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log("commits", commits))
//   .catch((error) => console.log("error:", error.message));
// console.log("after");

async function displayComment(user) {
  try {
    const githubuser = await getUser(user);
    const repos = await getRepositories(githubuser.githubUsername);
    const commits = await getCommits(repos[0]);
    console.log("connit:", commits);
  } catch (err) {
    console.log("err", err.message);
  }
}
displayComment(1);

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading database");
      resolve({ id: id, githubUsername: "success" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling github api");
      // resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("could not get the repos"));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, promise) => {
    setTimeout(() => {
      console.log("calling github api");
      resolve(["commits"]);
    }, 2000);
  });
}
