### Create HTML Skeleton Template

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
  
</body>
</html>
```

### Add h1 Element

Add `<h1>Hello World</h1>` between the `<body></body>` HTML tags.

### Commit Changes to Public Github Repository

### Deploy to `helloworld.yourdomain.com`

#### Set up Hosting with Digital Ocean

1. Sign Up / Login
![](/static/img/digitalocean-1.png)
1. Click New Project
![](/static/img/digitalocean-2.png)
1. Create New Project `Learn`
![](/static/img/digitalocean-3.png)
1. Click "Skip for now"
![](/static/img/digitalocean-4.png)
1. Click "Get Started with a Droplet"
![](/static/img/digitalocean-5.png)
1. Leave Default Distribution (Ubuntu) and Plan (Basic) Selected
![](/static/img/digitalocean-6.png)
1. Select Cheapest CPU Option for $5 / mo
![](/static/img/digitalocean-7.png)
1. Select a datacenter region near your physical location
![](/static/img/digitalocean-8.png)

3. Click "New SSH Key"
![](/static/img/digitalocean-9.png)

4. Follow Modal instructions to generate SSH Key if you don't already have one
![](/static/img/digitalocean-10.png)

1. Choose a hostname
![](/static/img/digitalocean-11.png)

1. Click "Create Droplet"
![](/static/img/digitalocean-12.png)

1. Wait for Droplet to Come Online
![](/static/img/digitalocean-13.png)

1. Copy IP Address of New Server
![](/static/img/digitalocean-14.png)

1. SSH into new server `ssh root@###.###.###.###`
![](/static/img/digitalocean-15.png)

1. Confirm SSH Succeeds
![](/static/img/digitalocean-16.png)



#### Confirm SSH Access

1. `ssh root@143.198.32.125`
2. Type `yes` to add yourself to list of known hosts
3. 

#### Register Your Domain at [namecheap.com](https://www.namecheap.com/)

1. Search for the domain you would like to purchase
2. Click Add to Cart
3. Click Checkout
4. Click Confirm Order
5. Create Account or Log In
6. Complete Payment Form & Click Continue
7. Review Order & Click Pay Now

#### Set up Your DNS

1. Head to [namecheap Dashboard](https://ap.www.namecheap.com/)
2. Click Manage Button on New Domain
3. Click Advanced DNS
4. Add A Record with Host `helloworld` and Value to the IP Address of the server you created earlier