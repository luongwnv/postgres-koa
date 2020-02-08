#To run Postgres cmd\
`pg_ctl -D /your/data/path start`

#To install node mudules:\
`npm install`

#To Migrate DB please run script:\
`npm run migrate`

#To Seed DB please run script:\
`npm run seed`

#To run project, run command:\
`npm start`

#To test project, run command:\
`npm test`

#Becuz server need redis-server so after that run app shoud be install redis-server\
#Toturial install link bellow at (on Windows, I didn't test on Linux and MacOS): \
on Windows:\
    Download from\
        ```
        https://github.com/MSOpenTech/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.zip
        ```
    then extract and run file `redis-server.exe`\
on Macs\
    install redis server\
    `brew install redis`\
    Launch Redis on computer starts.\
    `ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents`\
    Start Redis server via “launchctl”.\
    `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist`\
    Start Redis server using configuration file.\
    `redis-server /usr/local/etc/redis.conf`\
on Linux:\
    install redis server:\
    `sudo apt update`\
    `sudo apt install redis-server`\
    Start Redis server:\
    `sudo systemctl restart redis.service`

I will try to set up so that the server run perfect!\
Thanks!\
LuongNV