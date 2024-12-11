# Installation

1. Create OAuth application at Github
    Go to Settings -> Developer Settings and choose OAuth Apps. Create a new OAuth App. Name it anything you like. Homepage URL should be set to your site’s URL. Authorization callback URL is the important part; it, too, can be set to your homepage URL (like <https://example.com>). Other guides say to set this to the callback API endpoint, but the documented requirement is that the callback URL be a subdirectory of this URL, and using the callback URL itself didn’t work for me.

    Github will give you a Client ID, and you can generate a Client Secret at this time. You will need both.

2. Add Client ID and Secret to your Cloudflare project
    In your Cloudflare Pages project, go to Settings -> Environment variables. Add two environment variables, GITHUB_CLIENT_ID set to the client ID from above, and GITHUB_CLIENT_SECRET set to the secret.

3. Add the files to your project
    Take this functions directory from this repo and add it to your project at the top level. NOTE: This means the actual top-level of the project itself, not the top level of your output directory. 

    If you haven’t already installed the Decap CMS files, take the static/admin directory from this repo and add it to your static directory (for Hugo) or wherever you add files to be deployed as-is to your site. There are two files under admin, a stub HTML file that loads the CMS, and the CMS config file config.yml. You can change the name of the admin directory.

    The config file included here is a starter file only; you need to set this up for your site, which is beyond the scope of these instructions. However, you must set site_domain and base_url in this config to the URL of your site (like <https://example.com>). Setting auth_endpoint here is optional because the default path works for the way this repo is set up.

4. Profit!
    Publish your site and let Cloudflare build it. Go to /admin/ on your site, and you should see a Login with Github button, which should authenticate you to Github and launch the CMS.
