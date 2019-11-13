#!/bin/bash
/bin/sleep 5
/usr/bin/tmux new-session -s slackmoderator slack-moderator --config ./general-config.js --rules-config ./rules-config.js --port 8000 -v
