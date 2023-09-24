# Server configuration for node SSR app with Umami on Ubuntu

## Installing nginx

Instructions can also be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04): 

``` bash
sudo apt-get update
sudo apt-get install nginx
sudo ufw allow 'Nginx Full'
```

FTP nginx.conf

### Setting up server-blocks

FTP vueai.tools & umami.vueai.tools

Delete default in /etc/nginx/sites-available/ & /etc/nginx/sites-enabled/

Create symlinks to sites-enabled
``` bash
ln -s /etc/nginx/sites-available/vueai.tools /etc/nginx/sites-enabled/vueai.tools
ln -s /etc/nginx/sites-available/umami.vueai.tools /etc/nginx/sites-enabled/umami.vueai.tools
sudo systemctl restart nginx
```

### Setting up SSL certifications

If files still accessible on the server, copy these in place:
- /etc/letsencrypt/live/vueai.tools/fullchain.pem
- /etc/letsencrypt/live/vueai.tools/privkey.pem
- /etc/letsencrypt/options-ssl-nginx.conf
- ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem

Otherwise, we need to create new certificates with certbot:

Replace vueai.tools content by:

``` bash
server {
	listen 80;
	listen [::]:80;

	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;

	server_name vueai.tools www.vueai.tools;

	location / {
		try_files $uri $uri/ =404;
	}
}
```

Install certbot:
Instructions are also [here](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)

``` bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```

Certbot should have modified the vueai.tools file content to look like the current repo. Just replace again the location block.

``` bash
sudo systemctl restart nginx
```

## Running a node server to serve the files

### Install nodejs
[Instructions are here](https://github.com/nodesource/distributions)

Do not use snap package manager or pm2 won't work

#### Install PM2 node process manager
FTP ecosystem.config.js
``` bash
sudo npm install -g pm2
cd /opt/vueai.tools
sudo pm2 start ecosystem.config.js
```

## Install umami
FTP docker-compose.yml

``` bash
docker compose up
```

Umami should be availabe at https://umami.vueai.tools

[Follow instructions here to setup](https://umami.is/docs/getting-started)