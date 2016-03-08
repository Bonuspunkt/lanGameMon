# lanGameMon
monitoring lan games

## supported protocols
- QuakeWorld
- Quake 3 Arena
- Teeworlds
- Value Query Protocol
- UT2004

## still fiddling with
- Blur
- Flatout 2
- Grid
- Trackmania
- ...

# setup
this is how i setup my server, adapt as needed

## setup node
```shell
wget https://raw.githubusercontent.com/isaacs/nave/master/nave.sh
chmod +x nave.sh
./nave.sh usemain latest

```

## clone repo
```
cd /opt
git clone <pathToLanGameMon>
cd lanGameMon
npm i
```
## generated script & stylesheet
```
npm run pack
```

## setup autostart

usually i create a user with
``` shell
adduser --no-create-home --system lanGameMon
```
and add a cron job for him with
``` shell
crontab -u lanGameMon -e
```
which goes like
``` crontab
@reboot /opt/lanGameMon/run.sh
```
adapt `run.sh` as needed

## setup nginx as reverse proxy with caching and gzip
merge the following config in the nginx site config (usually `/etc/nginx/sites-enabled/default`)
``` conf
proxy_cache_path /tmp/nginx levels=1:2 keys_zone=lanGameMon:10m max_size=10g inactive=60m;

server {
    # ...

    location / {
        # caching
        proxy_cache lanGameMon;
        proxy_cache_min_uses 1;
        proxy_cache_lock on;
        # websocket connection should not be handled by the cache
        proxy_cache_bypass $http_upgrade;
        # debug cache
        #add_header X-Cache-Status $upstream_cache_status;

        # proxy config
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # gzip
        gzip on;
        gzip_min_length 1024;
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        gzip_http_version 1.1;
        gzip_types text/* application/javascript;
    }
}
```
