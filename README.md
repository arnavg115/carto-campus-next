# Carto-Campus-Next

Next gen carto-campus powered by nextjs and deployed on vercel.

## Uses the following technologies
- SSR for fast page loads
- Firebase for secure auth and user data storage
- mongodb for school data
- mapbox for maps and navigation
- graphql for easy api fetching
- apollo server/client

## Todo
- [X] Finish gql api
- [X] add navigation
- [X] finish user profile fetching
- [X] implement multiple schools
- [ ] add br/wf support
- [X] optimize for mobile
- [ ] add club discovery feature
- [ ] figure out evac sys

## Run code locally
1. Clone the repo and cd into the folder
```shell
git clone https://github.com/arnavg115/carto-campus-next.git
cd carto-campus-next
```
2.  Open the `env.example` and set all of the environment variables
- make a firebase project
- make a mongodb db
4.  Install all of the dependencies

**Yarn**
```
yarn
```
**NPM**
```
npm install
```

5. Run the project

**Yarn**
```
yarn dev
```
**NPM**
```
npm run dev
```
