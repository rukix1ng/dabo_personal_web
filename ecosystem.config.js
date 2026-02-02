// 检测是否使用 standalone 模式
const fs = require('fs');
const path = require('path');

const isStandalone = fs.existsSync(path.join(__dirname, '.next/standalone/server.js'));

module.exports = {
    apps: [{
        name: 'dabo-personal',
        // standalone 模式：使用 standalone/server.js
        // 标准模式：使用 node_modules/next/dist/bin/next
        script: isStandalone 
            ? '.next/standalone/server.js'
            : 'node_modules/next/dist/bin/next',
        args: isStandalone ? '' : 'start',
        cwd: '/var/www/dabo_personal',
        instances: 1,
        exec_mode: 'fork', // 使用 fork 模式而不是 cluster（单实例）
        autorestart: true,
        watch: false,
        max_memory_restart: '512M', // 降低内存限制，避免频繁重启
        min_uptime: '10s', // 至少运行10秒才认为是正常启动
        max_restarts: 10, // 最多重启10次，避免无限重启
        restart_delay: 4000, // 重启延迟4秒
        kill_timeout: 5000, // 5秒超时
        wait_ready: true, // 等待应用就绪
        listen_timeout: 10000, // 10秒超时
        env: {
            NODE_ENV: 'production',
            PORT: 3000,
            NEXT_PUBLIC_BASE_URL: 'http://47.110.87.81:3000',
            // 限制 Node.js 内存使用
            NODE_OPTIONS: '--max-old-space-size=512'
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true,
        merge_logs: true, // 合并日志
    }]
}
