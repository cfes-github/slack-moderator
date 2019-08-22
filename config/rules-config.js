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
        "notify-admin-channel": {
            type: "notify",
            channel: "admins",
            message: "User <@{user}> wrote an illegal message on channel <#${channel}>. It was deleted.",
            user: "admin-bot-user"
        },
        "warn-user-use-thread": {
            type: "warn-user",
            user: "admin-bot-user",
            message: "That message probably belongs in a thread response!"
        }
    },
    rules: {
        "remove-text-potato": {
            "description": "Removes the message if a user writes 'potato'",
            if: {
                type: "and",
                rules: [
                    {
                        field: "type",
                        type: "equal",
                        value: "message"
                    },
                    {
                        field: "text",
                        type: "token-equals",
                        value: "potato"
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
        }
    }
};

