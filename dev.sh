GULPPID=`ps aux | grep [g]ulp | awk '{ print $2 }'`
if [ "`echo $GULPPID`" != "" ]; then
	echo kill gulp $GULPPID
	kill -TERM `echo $GULPPID`
else
	echo gulp stopped
fi

if [ ! -d ./tmp ];then
  mkdir tmp
fi

if [ "$1" = "" -o "$1" = "start" ];then
	PATH=${PATH}:$(npm bin)
	echo start gulp
	gulp > tmp/gulp.log 2>&1 &
	echo $! > tmp/gulp.pid
fi
