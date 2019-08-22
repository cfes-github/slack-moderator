exports.default = {
    rules: "rules",
    server: {
        host: "0.0.0.0",
        port: 3000
    },
    slack: {
        verificationToken: "bot verification token",
    },
    logging: {
        appName: "moderator",
        stdoutLevel: "info",
        errorPath: "/var/tmp/moderator-error.log",
        requestLevels: {
            default: "info",
            500: "error",
            404: "warn"
        },
        color: true
    },
};
