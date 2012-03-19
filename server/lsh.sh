#!/bin/sh

_a="dcz"
_u="http"
cd $(dirname $0)

_cmd="irb -rrubygems -rpp -r'./$_a'"
sudo -EHu $_u bash -c "$_cmd"
