import * as fs from 'fs';
import * as Octokit from '@octokit/rest';

const owner = 'microsoft';
const repo = 'vscode-vsce';

async function main() {
  const token = fs.readFileSync(`${__dirname}/../token`, 'utf8');
  const octokit = new Octokit({ auth: token });

  const options = octokit.issues.listForRepo.endpoint.merge({
    owner,
    repo,
    per_page: 100,
    state: 'open'
  });

  const iterator = octokit.paginate.iterator(options) as AsyncIterableIterator<Octokit.Response<Octokit.IssuesListForRepoResponse>>;

  for await (const response of iterator) {
    console.log(response.data.length);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});