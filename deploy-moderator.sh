cd /usr/local/lib/node_modules/slacddk-moderator
./kill-moderator.sh
rm -rf ./*

# pull cfes repo and copy code to the slack moderator directory
git clone https://github.com/cfes-github/slack-moderator.git
cp /root/slack-moderator-config/* .
chmod 744 *-moderator.sh
./run-moderator.sh
