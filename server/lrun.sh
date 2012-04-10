#!/bin/sh

cd $(dirname $0)

_p="8083"
_u="http"
_cmd="thin -t 30 -p $_p -e production -R config.ru start"
sudo -EHu $_u bash -c "$_cmd"

