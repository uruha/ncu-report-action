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
  // @ts-ignore
  const [owner, repo] = repoWithOwner.split('/');

  try {
    const upgraded = await ncu.run({
      packageManager: 'npm'
    });
    console.log(upgraded);

    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pr.number,
      body: `dependencies to upgrade: ${JSON.stringify(upgraded)}`,
    });
    console.log(`created comment URL: ${response.data.html_url}`);

    core.setOutput('commentUrl', response.data.html_url);
  } catch (error) {
    core.setFailed(error.message);
  }
};

exec();