#! /bin/bash
mkdir logs
mkdir /root/.forever/logs/
#apt-get update
#apt-get install GraphicsMagick
#-y
#npm install -g cnpm --registry=https://registry.npm.taobao.org
#cnpm install
npm install forever -g
forever start -l ./logs/forever.log -o logs/forever_out.log -e logs/forever_err.log -a ./bin/www
bash