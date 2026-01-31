module.exports = {
    apps: [{
        name: 'dabo-personal',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        cwd: '/var/www/dabo_personal',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true
    }]
}
