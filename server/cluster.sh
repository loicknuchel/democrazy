#!/bin/sh

cd $(dirname $0)
_action=$1 # start/stop/restart

_p="8081"
_u="http"
_n="1"
_cmd="thin -P pids/thin.pid -s $_n -t 30 -p $_p -e production -l log/thin.log -R config.ru $_action"
sudo -EHu $_u bash -c "$_cmd"

