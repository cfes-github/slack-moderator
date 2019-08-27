exports.default = {
    users: {
        "admin-user": {
            //users it@cfes.ca token to be able to delete messages
            "token": "xoxp token for it@cfes.ca"
        },
        "admin-bot-user": {
            "token": "xoxb token for bot (in oauth permissions)"
        }
    },
    actions: {
        "delete-current-message": {
            type: "delete-message",
            user: "admin-user"
        },
        "notify-admin-channel-no-intervene": {
            type: "notify",
            channel: "admins",
            message: "User <@{user}> wrote a concerning message in <#${channel}>. No action was taken.",
            user: "admin-bot-user"
        },
        "warn-user-use-thread": {
            type: "warn-user",
            user: "admin-bot-user",
            message: "That message probably belongs in a thread response!"
        }
    },
    rules: {
        "remove-bad-text": {
            "description": "Removes the message if an inappropriate word is used'",
            if: {
                type: "or",
                rules: [
                    {
                        field: "text",
                        type: "tokens-in",
                        list: "en-bad-words"
                    },
                    {
                        field: "text",
                        type: "tokens-in",
                        list: "fr-bad-words"
                    },
                ]
            },
            actions: [
                "delete-current-message"
            ]
        },
        "tell-user-use-thread": {
            "description": "Tells a user that their message probably belongs in a thread.",
            if: {
                type: "or",
                rules: [
                    {
                        field: "text",
                        type: "includes",
                        value: "okay"
                    },
                    {
                        field: "text",
                        type: "includes",
                        value: "thank"
                    }
                ]
            },
            actions: [
                "warn-user-use-thread"
            ]
        },

        "warn-admins": {
            "description": "Warns an admin when an action happens, but doesn't intervene.",
            if: {
                type: "or",
                rules: [
                    {
                        field: "text",
                        type: "includes",
                        value: "fuck cfes"
                    }
                ]
            },
            actions: [
                "notify-admin-channel-no-intervene"
            ]
        }
    }
};

