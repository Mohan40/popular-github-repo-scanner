import axios from "axios";
import { response } from "./reponseFormatter.js";

async function main(req, res) {
  try {
    const organizationName = req.query.organization;
    const numberOfPopularRepos = req.query.numberOfPopularRepos;
    const numberOfPopularCommittiees = req.query.numberOfPopularCommittiees;

    const repoData = await fetchRepos(organizationName);
    let [result, finalDataPromises] = await getTopRepos(
      repoData.data,
      numberOfPopularRepos
    );
    await finalizeResult(
      res,
      result,
      finalDataPromises,
      numberOfPopularCommittiees
    );
  } catch (error) {
    console.log("Error: ", error);
    response(res, 400, error);
  }
}

// Fetch all GitHub repos for an orginzation
async function fetchRepos(organizationName) {
  const config = {
    method: "get",
    url: `https://api.github.com/orgs/${organizationName}/repos`,
    headers: {},
  };
  return axios(config);
}

// Fetch all contributors of a GitHub repo
async function fetchContributors(repoFullName) {
  const config = {
    method: "get",
    url: `https://api.github.com/repos/${repoFullName}/contributors`,
    headers: {},
  };
  return axios(config);
}

// Get top GitHub repos based on number of forks
async function getTopRepos(allRepos, numberOfPopularRepos) {
  if (allRepos.length !== 0) {
    const popularRepos = allRepos.sort(
      (repo1, repo2) => repo2.forks - repo1.forks
    );
    const topPopularRepos = popularRepos.slice(0, numberOfPopularRepos);
    let finalDataPromises = [];

    let result = [];
    topPopularRepos.forEach((eachRepo) => {
      result.push({
        repoName: eachRepo.name,
        owner: eachRepo.owner.login,
        repoUrl: eachRepo.html_url,
        numberOfForks: eachRepo.forks,
      });
      finalDataPromises.push(fetchContributors(eachRepo.full_name));
    });
    return [result, finalDataPromises];
  }
}

// Get top contributors based on number of commits
function getTopContributors(allContributors, numberOfPopularCommittiees) {
  if (allContributors.length !== 0) {
    const popularContributors = allContributors.sort(
      (contributors1, contributors2) =>
        contributors2.contributions - contributors1.contributions
    );
    const topPopularContributors = popularContributors.slice(
      0,
      numberOfPopularCommittiees
    );
    let result = [];
    topPopularContributors.forEach((eachContributor) => {
      result.push({
        userLoginId: eachContributor.login,
        userProfileUrl: eachContributor.html_url,
        numberOfContributions: eachContributor.contributions,
      });
    });
    return result;
  }
}

// Attach top contributors to their respective repos
async function finalizeResult(
  res,
  result,
  finalDataPromises,
  numberOfPopularCommittiees
) {
  let topCommittees = [];
  Promise.all(finalDataPromises)
    .then((allPromises) => {
      allPromises.map((eachPromise) => {
        const allContributors = eachPromise.data;
        topCommittees.push(
          getTopContributors(allContributors, numberOfPopularCommittiees)
        );
      });

      for (let i = 0; i < topCommittees.length; i++) {
        result[i]["topCommittees"] = topCommittees[i];
      }

      response(res, 200, result);
    })
    .catch((error) => response(res, 400, error));
}

export default main;
