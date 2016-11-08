# stage.sh

> Realtime staging environments.

This is the app that powers [stage.sh](https://stage.sh).

## Development

Install and run the [stage-deploy](https://github.com/zpnk/stage-deploy) service.

Install project dependencies:

```bash
$ yarn
```
Set the DEPLOY_SERVICE environment variable:

```bash
$ export DEPLOY_SERVICE=http://localhost:3001
```

Run the dev server

```bash
$ yarn run dev
```
