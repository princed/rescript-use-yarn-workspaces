__DEPRECATED, use [DISABLE_ESLINT_PLUGIN](https://github.com/facebook/create-react-app/pull/10170)__

# [rescript](https://github.com/harrysolovay/rescripts)-use-yarn-workspaces

This plugin will allow using CRA inside a Yarn Workspace configuration,
it will allow to transpile other code in the same workspace.

## How to use
1. Install the package by running:
```sh
  yarn add -D rescript-use-yarn-workspaces
```

2. [On your rescripts configuration](https://github.com/harrysolovay/rescripts#advanced-usage)

```diff
"rescripts": [
+  "use-yarn-workspaces"
]
```

3. Run your app, external code should be transpiled.
