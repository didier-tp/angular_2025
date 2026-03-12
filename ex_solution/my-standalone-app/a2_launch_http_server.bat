REM npm install -g http-server
REM ng build --ssr=false --prerender=false
echo http://localhost:8080/index.html
http-server --proxy https://www.d-defrance.fr -c-1 dist/my-standalone-app/browser
pause