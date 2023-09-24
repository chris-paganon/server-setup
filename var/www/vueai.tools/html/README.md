To serve static files on vueai.tools, just put them here and replace the location block in vueai.tools sites-available by:

``` bash
location / {
  try_files $uri $uri/ =404;
}
```

and add these lines above the location block:

``` bash
root /var/www/vueai.tools/html;
index index.html;
```
