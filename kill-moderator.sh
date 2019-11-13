#!/bin/bash
tmux kill-session -t slackmoderator
kill $(lsof -t -i:8000)
