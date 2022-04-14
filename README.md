# Flash Card PWA [![Build Status](https://travis-ci.org/Flash-Card/fc-pwa.svg?branch=master)](https://travis-ci.org/Flash-Card/fc-pwa)

## About Project
First of all, this is my pet project where I check some technology stack I want to use on a production-ready project.
If you want to try the project as is go to the [main page](https://cards-mem.web.app/)

## Set remote repo with different ssh key

```bash
# nano ~/.ssh/config
```

```
Host github.com-fishbone
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa-fish
```

```bash
# git remote set-url origin github.com-fishbone:Flash-Card/fc-pwa.git
```