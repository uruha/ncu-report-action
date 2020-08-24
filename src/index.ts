import * as core from '@actions/core';
import * as github from '@actions/github';
import * as ncu from 'npm-check-updates';

const exec = async () => {
  const pr = github.context.payload.pull_request;
  if (!pr) {
    console.log('github.context.payload.pull_request not exist');
    return;
  }

  const token = process.env['GITHUB_TOKEN'];
  if (!token) {
    console.log('GITHUB_TOKEN not exist');
    return;
  }

  const octokit = github.getOctokit(token);
  const repoWithOwner = process.env['GITHUB_REPOSITORY'];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [owner, repo] = repoWithOwner.split('/');

  try {
    const packageManager = core.getInput('package-manager');
    const upgraded = await ncu.run({
      packageManager: `${packageManager ? packageManager : 'npm'}`
    });
    console.info(upgraded);

    let bodyMessage: string;
    if (Object.keys(upgraded).length > 0) {
      bodyMessage = `⚠️ Check dependencies to upgrade: ${JSON.stringify(
        upgraded
      )}`;
    } else {
      bodyMessage = '👍 All the latest modules 🙆‍♀️';
    }

    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pr.number,
      body: bodyMessage
    });
    console.log(`created comment URL: ${response.data.html_url}`);

    core.setOutput('commentUrl', response.data.html_url);
  } catch (error) {
    core.setFailed(error.message);
  }
};

exec();
