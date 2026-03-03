#!/bin/bash

# 性能监控脚本
# 用于在服务器上监控应用性能

echo "📊 性能监控报告"
echo "================="
echo ""

# 1. PM2状态
echo "🔹 PM2进程状态："
pm2 list

echo ""
echo "🔹 内存和CPU使用："
pm2 describe dabo-personal | grep -E "memory|cpu|restart"

echo ""
echo "🔹 最近的日志（最后20行）："
pm2 logs dabo-personal --lines 20 --nostream

echo ""
echo "🔹 数据库连接池状态："
echo "请在MySQL中运行: SHOW PROCESSLIST;"

echo ""
echo "🔹 系统资源："
echo "CPU使用率："
top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}'

echo ""
echo "内存使用："
free -h

echo ""
echo "磁盘使用："
df -h /var/www

echo ""
echo "📈 监控建议："
echo "  - 持续观察CPU使用率，应该比优化前降低40-60%"
echo "  - 内存使用应该更稳定，减少频繁的GC"
echo "  - 检查PM2重启次数，应该显著减少"
echo "  - 使用 'pm2 monit' 实时监控"
