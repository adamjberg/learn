### Create app directory

`mkdir app`
### Initialize as Git Repository

`cd app`

`git init`

`git branch -m main`

### Use [Create React App](https://create-react-app.dev/docs/getting-started/#creating-a-typescript-app) to Generate Typescript Template

`npx create-react-app fe --template typescript`

`cd fe`

`rm -rf .git`

`git add -A`

`git commit -m "Create React App"`

`yarn start`

`git commit -am "Create react app"`

### Initialize Typescript in Backend Code

`mkdir be`

`yarn init`

`yarn add typescript`

`yarn tsc --init`

Edit `outDir` to `./built`

```jsx
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "outDir": "./built",                              /* Redirect output structure to the directory. */
    "strict": true,                                 /* Enable all strict type-checking options. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}
```
Visit [https://aka.ms/tsconfig.json](https://aka.ms/tsconfig.json) to read more about this file

### Add [Hello World Express Code]([https://expressjs.com/en/starter/hello-world.html](https://expressjs.com/en/starter/hello-world.html))

`touch index.ts`

`yarn add express @types/express`

```jsx
// index.ts
import express from "express"

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### Add Scripts to package.json

```jsx
// package.json
{
  "name": "api",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "start" "node built/index.js"
  },
  "dependencies": {
    "@types/express": "^4.17.13",
    "express": "^4.17.1",
    "typescript": "^4.3.5"
  }
}
```

### Create .gitignore File

```jsx
// .gitignore
built/
node_modules/
```

### Commit Backend Code to Git

`git add -A`

`git commit -m "Add express Hello World"`