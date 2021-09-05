## Create HTML Skeleton Template

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

## Add h1 Element

Add `<h1>Hello World</h1>` between the `<body></body>` HTML tags.

## [Set Up Hosting With Digital Ocean](/posts/how-to-set-up-hosting-with-digitalocean)
## [Register a Domain With namecheap](/posts/how-to-register-domain-with-namecheap)

## [Configure DNS to Point to Digital Ocean Server](/posts/how-to-configure-namecheap-dns-to-point-domain-to-digitalocean-server)

## Deploy to `helloworld.yourdomain.com`

### Install nginx

```bash
sudo apt-get install nginx
```

### Copy `index.html` to `/var/www`

```bash
scp index.html root@143.198.32.125:/var/www/html/
```

## Confirm `helloworld.yourdomain.com` Displays Hello World Message

Navigate to helloworld.yourdomain.com in your browser and confirm you can see the "Hello World" message.

## Submission

<form id="submit">
  <label for="url">URL</label><br>
  <input name="url" placeholder="http://helloworld.devtails.xyz"/>
  <input type="submit">
</form>

<script>
  console.log("Hello")
  const form = document.getElementById("submit");
  console.log(form)

  form.addEventListener("submit", submitProject)

  function submitProject(e) {
    e.preventDefault();
    console.log("submit")
  }
</script>