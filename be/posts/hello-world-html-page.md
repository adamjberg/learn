## Introduction

This is the first project in a series of projects to teach web development through building applications.  Deploying a website is often the last step presented (if even mentioned) in web development tutorials.  This series will instead focus on deployable projects running on your own domain. 

Unfortunately deploying code can be a bit of a process. In order to not overwhelm beginners, this post intentionally doesn't go into deep detail about what things are and how they work.  Future projects will go into much greater detail.

One of the neat advantages to deploying your code is that automated checks can confirm your project works as expected.  At the end of this post is a "Submit Project" section.  This one should be fairly easy to check on your own, but future projects may have more complicated behaviour that will be assessed.

## [Set Up Hosting With Digital Ocean](/posts/how-to-set-up-hosting-with-digitalocean)
## [Register a Domain With namecheap](/posts/how-to-register-domain-with-namecheap)

## [Configure DNS to Point to Digital Ocean Server](/posts/how-to-configure-namecheap-dns-to-point-domain-to-digitalocean-server)

## Deploy to `helloworld.yourdomain.com`

### Install nginx

The following command should be run on the server you just created on Digital Ocean.  Make sure to [SSH into your server](/posts/how-to-ssh-into-a-server) and then run within that terminal.  [`nginx`](https://www.nginx.com/resources/wiki/) is an HTTP server that will be responsible for responding with the HTML file we have created.

```bash
sudo apt-get install nginx
```

Once successfully installed, nginx will automatically start serving files out of the `/var/www/html/` folder on your remote server.  You should be able to open a browser at this point and type in the IP Address of your server.  It should display the default nginx page.

### Create HTML Skeleton Template

To keep things simple, we will create a file directly on the server.  To do so, we will use the [`nano`](https://www.nano-editor.org/) editor.

Delete the existing default `index.html` file.  nginx adds this when first installed, we will be replacing it with our own in the next step.

Create a new `index.html` file using nano.

```bash
nano /var/www/html/index.html
```

Paste the following in by right clicking and selecting paste in the terminal.

```html
// index.html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

#### Save and Exit nano

Press `Ctrl + x` to exit nano

This will trigger a prompt at the bottom that says `Save modified buffer?`.  Here you press `y` for "Yes".

It will then confirm `File Name to Write: index.html` and you must press enter to finally save the file.

## Confirm the Hello World Message Appears

Navigate to `https://helloworld.yourdomain.com` in your browser and confirm you can see the "Hello World" message.