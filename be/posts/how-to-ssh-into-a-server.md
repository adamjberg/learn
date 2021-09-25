# Background

SSH is short for [Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell). It is a protocol for connecting a client to a server to execute commands on the server.  This article will go over using an ssh client to gain remote access to your server.

# Pre-Requisites

## [Set Up Hosting With Digital Ocean](/posts/how-to-set-up-hosting-with-digitalocean)

# Opening up a Terminal or Command Prompt

Nowadays all major operating systems come with an ssh client pre-installed.

## Linux

You can access the Linux ssh client by opening the "Terminal" program.  On Ubuntu you can open with ctrl + alt + T or press the Super key and type Terminal to open from the launcher.

## MacOS

You can access the MacOS ssh client by opening the "Terminal" program.  Press ⌘ + Space to open Spotlight Search. Then type "Terminal" and hit enter when the application is found.

## Windows

You can access the Windows ssh client by opening the "Command Prompt" program.  Press the Windows key and then type "Command Prompt" and hit enter when the application is found.

# SSH into Your Server

The final step is to run the ssh program to connect to your server.  You can do so by first typing `ssh`, then the user you would like to connect as (for now this should be the `root` user), followed by an `@` symbol and finally the IP address of the server you are trying to connect to (This should be the server you created from the ## [Set Up Hosting With Digital Ocean](/posts/how-to-set-up-hosting-with-digitalocean) article).

```bash
ssh root@###.###.###.###
```

Type `yes` to add yourself to list of known hosts
![](/static/img/digitalocean-15.png)

If you have successfully connected you should see something like below indicating that you are now interacting with the remote server.  In the example below the remote server is called `ubuntu-s-1vcpu-1gb-tor1-01`
![](/static/img/digitalocean-16.png)