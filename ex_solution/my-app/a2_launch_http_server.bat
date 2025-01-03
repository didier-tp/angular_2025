REM npm install -g http-server
REM ng build --ssr=false --prerender=false
echo http://localhost:8080/index.html
REM http-server --proxy https://www.d-defrance.fr -c-1 dist/my-app
http-server --proxy https://www.d-defrance.fr -c-1 dist/my-app/browser
pause