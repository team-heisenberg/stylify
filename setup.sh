#!/bin/bash

M1=$1

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

\

nvm install 16 \
nvm use 16 \

if [ $M1 == "m1" ]
then
  echo "Setting up MySQL M1"
  cd api && npm i  && npm run start:db:m1
else
  echo "Setting up MySQL Intel"
  cd api && npm i  && npm run start:db
fi

cd ../app && npm i \

echo "=== DONE ==="