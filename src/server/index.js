import express from 'express';
import cors from 'cors';
import { renderToString } from "react-dom/server"
import serialize from "serialize-javascript"

import App from '../shared/App'
import React from 'react'
import { StaticRouter, matchPath } from "react-router-dom"
import routes from '../shared/routes'


const app = express()

app.use(cors())

app.use(express.static('public'));
/* use the react app here */
/* app.get("*", (req, res, next) => {
   var markup;
  var datas;
  fetchPopularRepos()
    .then((data)=> {
      console.log("fetchPopularRepos :: ",data);
      data = data;
      markup = renderToString(
        <App data={data}/>
      )

 // const datas="Amresh"
  //const markup = renderToString(
   // <App data={datas}/>
 // )
  res.send(`
  <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `)
  })
  // fetchPopularRepos then is closing here
}) */

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App data={data}/>
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, ()=> {
  console.log("server running at 3000")
})
