# npm check updates PR reporter
This actions is `npm-check-updates` reporter when pull-request created on comment.

## Outputs
### commentUrl
Bot commnet URL

## Usage

```yaml
on:
  pull_request:
    type: [created]
jobs:
  ncu_report:
    runs-on: ubuntu-latest
    name: npm-check-updates report
    steps:
      - uses: actions/ncu-report-action@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          pacakge-manager: 'yarn'
```