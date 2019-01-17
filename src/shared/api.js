import fetch from 'isomorphic-fetch';

export function fetchPopularRepos(language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  console.log("encodedURI :: ", encodedURI)
  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.log("Error :: ", error);
      return null
    })
}
