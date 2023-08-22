# Auth OTP SMS with twilio
### Built With

<div style="display:flex; flex-direction: row: justify-items: center; align-items: center;"> 
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" style="width: 100px; margin-right: 20px;">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/200px-Laravel.svg.png" alt="Laravel Logo" style="width: 100px;">
</div>


## Project Installation
Start by cloning the app on your PC.
```bash
git clone https://github.com/SkyBLUE62/OTP-Authentification-Laravel-10-ReactJS.git
```
## Dependency Installation
### Vendor folder
First, install the dependencies in the ```composer.json``` file.
```bash
composer install
```
If you want to update the dependencies in the ```composer.json``` file, use update instead.
```bash
composer update
```
### Node modules
Secondly, install the node packages 
```bash
npm install
```
If you want to update the packages use update
```bash
npm update
```
⚠️ **Warning**
```npm update``` will not upgrade your version, but will install the most recent version of the package.

For example, if you are using react 17, ```npm update``` will not update you to react 18, so you will have to update the packages manually.

### Database
Link your database and execute the migrations
```php artisan migrate```


## App Configuration
### Copy the .env.example file
You need to copy the ```.env.example``` file to ```.env``` and modify it if necessary.
```bash
copy .env.example .env
```
### Generate a key app
Your Laravel application needs an ```APP_KEY``` variable in your ```.env file```.
```bash
php artisan key:generate
```
Once this comment has been executed, an ```APP_KEY``` will be added directly to your ```.env``` file.

## Running App
### Launch of the laravel server
```bash
php artisan serve
```
### Launch the server node 
```bash
npm run dev
```

### Twilio Config

Go to www.twilio.com , create a account, buy a phone number go to Account Info and set up your .env file with Account SID, Auth Token and Twilio phone number

### Project visualisation 

If you have not modified your Laravel configuration, you need to go to ```128.0.0.1:8000``` to see the web page



