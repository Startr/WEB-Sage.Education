#!/bin/bash

# Check if OUR_HOST is already set, if not, set it to the IP address of the default interface
if [ -z "$OUR_HOST" ]; then
  echo "OUR_HOST is not set, determining the IP address of the default interface..."
  OUR_HOST=$(ipconfig getifaddr "$(route get default | grep interface | awk '{print $2}')")
  if [ -z "$OUR_HOST" ]; then
    echo "Error: Could not determine the IP address."
    exit 1
  fi
  echo "OUR_HOST is set to the IP address of the default interface: ${OUR_HOST}"
fi

echo "Attempting to update src/admin/config.yml with OUR_HOST: ${OUR_HOST}..."
# Perform the substitution in the config.yml file
sed -i '' "s|127\.0\.0\.1|${OUR_HOST}|g" src/admin/config.yml

echo "Updated src/admin/config.yml with OUR_HOST: ${OUR_HOST}"
