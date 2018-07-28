# Vortech Frontend

This is the frontend for https://www.vortechmusic.com

## Stack

- **Framework:** React  
- **Styles:** Sass  
- **Library:** Bootstrap 4  
- **Language:** HTML5  
- **Package manager:** npm  
- **Bundling:** Webpack  

## The app

This will be a single page app that should work in most modern browsers. It should provide all the
features of the previous version hosted in a 3rd party VPS. Having more features is welcome :)

## Backend

The backend will run on the same server. It is a pure API that returns JSON
format data for the frontend to process. The repository for the backend is at:
https://github.com/Torniojaws/vortech-backend

## Install

1. Install ``npm``
1. Clone the repository
1. In the root, run ``npm run start``
1. Open http://localhost:8100 in a browser

NB: On some setups, there was a problem with pngquant:
`Error: pngquant failed to build, make sure that libpng-dev is installed`

To fix that, do: `sudo apt install libpng-dev` and then re-run `npm install`
