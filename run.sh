#/bin/sh

# this fixes if your cron job can't resolve node
# check & adapt your path(s)
#PATH=$PATH:/usr/local/bin

# functions
loop() {
  while :
  do
    $1 >> $2 2>&1
    sleep 1
  done
}

# fix the paths
#loop /opt/lanGameMon/index.js /tmp/lanGameMon.log  &
