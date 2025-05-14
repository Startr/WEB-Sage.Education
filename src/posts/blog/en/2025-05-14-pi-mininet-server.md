---
layout: layouts/blog.njk
title: Pi MiniNet Server
tags:
  - education
date: 2025-04-25T15:28:00.000Z
rating: 5
summary: 🚀 Transform your Raspberry Pi 4 into a powerful self-hosted web server
  and Wi-Fi access point! 🌐✨ Set up Nginx for serving files and hostapd for
  creating a secure Wi-Fi hotspot. Perfect for DIY enthusiasts and makers! 💻📡
eleventyNavigation:
  parent: Blog
---
Setting up a Pi as a mini private internet! Let's break this down into steps. We'll need to:

1. Set up the Raspberry Pi 4 with Raspberry Pi OS
2. Configure Nginx as a web server
3. Set up Wi-Fi Access Point (AP) functionality
4. Configure file upload functionality

### Step 1: Set Up Raspberry Pi 4 with Raspberry Pi OS

1. Download and install the latest Raspberry Pi OS Lite (headless version) from the official Raspberry Pi website.
2. Flash the OS image to your microSD card using a tool like Rufus or BalenaEtcher.
3. Insert the microSD card into your Raspberry Pi 4 and boot it up.

### Step 2: Configure Nginx as a Web Server

1. Update the package list and upgrade the system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. Install Nginx:
   ```bash
   sudo apt install nginx -y
   ```
3. Start Nginx and enable it to start at boot:
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

### Step 3: Set Up Wi-Fi Access Point (AP)

1. Install the necessary packages for AP functionality:
   ```bash
   sudo apt install hostapd dnsmasq -y
   ```
2. Disable the default dnsmasq service:
   ```bash
   sudo systemctl stop dnsmasq
   sudo systemctl disable dnsmasq
   ```
3. Create a new dnsmasq configuration file:
   ```bash
   sudo nano /etc/dnsmasq.conf
   ```
   Add the following content:
   ```
   interface=wlan0
   dhcp-range=192.168.4,192.168.4.20,255.255.255.0,24h
   ```
4. Create a hostapd configuration file:
   ```bash
   sudo nano /etc/hostapd/hostapd.conf
   ```
   Add the following content:
   ```
   interface=wlan0
   driver=nl80211
   ssid=YourNetworkName
   wmm=0
   macaddr_acl=0
   auth_algs=1
   ignore_broadcast_ssid=0
   wpa=2
   wpa_passphrase=YourPassword
   wpa_key_mgmt=WPA-PSK
   wpa_pairwise=TKIP
   rsnl_pairwise=TKIP
   ```
5. Enable and start hostapd:
   ```bash
   sudo systemctl unmask hostapd
   sudo systemctl enable hostapd
   sudo systemctl start hostapd
   ```

### Step 4: Configure File Upload Functionality

1. Create a directory for uploaded files:
   ```bash
   sudo mkdir -p /var/www/uploads
   sudo chown -R www-data:www-data /var/www/uploads
   sudo chmod -R 755 /var/www/uploads
   ```
2. Configure Nginx to allow file uploads. Create a new configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/upload.conf
   ```
   Add the following content:
   ```
   server {
       listen 80;
       server_name your_server_ip;

       root /var/www/html;
       index index.html index.htm;

       location /upload {
           client_max_body_size 10m;
           client_body_in_file_only on;
           client_body_temp_path /tmp/;
           client_body_buffer_size 128k;

           dav_methods PUT;
           dav_ext_methods PROPPATCH MKCOL COPY MOVE;
           create_full_put_path on;
           dava_lock_db /var/www/uploads/lock.db;
           dav_safety_filename off;
           allow all;
       }
   }
   ```
3. Enable the new configuration:
   ```bash
   sudo ln -s /etc/nginx/sites-available/upload.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Step 5: Test the Setup

1. Connect to the Wi-Fi network you created using the SSID and password you specified in the hostapd configuration.
2. Access the web server by navigating to `http://your_server_ip` in your browser.
3. Test file uploads by sending files to the `/upload` endpoint using tools like `curl` or a web interface you can create.

### Notes:

- Make sure to set proper permissions and access controls for the upload directory to prevent unauthorized access.

This setup will allow users to connect to your Raspberry Pi 4 as a Wi-Fi access point and upload files to the server.
