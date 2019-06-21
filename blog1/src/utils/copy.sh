#!/bin/sh
cd /Users/xieyadong/adm/againNodeBlog/blog1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log