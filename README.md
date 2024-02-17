# Termux Notify
Sending notifications from your project to Android notification center.

-----

## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quickstart](#quickstart)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

-----

## Description
Nodejs module for Sending notifications from your project to Android notification center by using `termux-notification`and `termux-toast` packges.

-----

## Requirements

- Android Device.
- Termux & Termux:API Apps.

-----

## Installation
- Install Termux:API app from [F-Droid](https://f-droid.org/ar/) app or from [GitHub repository](https://github.com/termux/termux-api/releases).
- Make sure that Termux:API app have a permission to send notifications.

- Install `termux-notification` and `termux-toast` packges from Termux;-
```BASH
pkg install termux-api
```

- Install TermuxNotify into your project:-

-  With npm
```BASH
npm i termux-notify
```

- With yarn
```BASH
yarn add termux-notify
```

- Add TermuxNotify to your project
```javascript
const termux = require('termux-notify');
```

-----

## Quickstart

TermuxNotify exports only one function.

Simple way
```javascript
termux('Notification Message');
```

Advanced way
```javascript
termux({
  title: 'Notification Title',
  message: 'Notification message',
  image: 'assets/image.png', // You can use full path for image
}, function(err, log) {
  err && console.log(log);
});
```

You can use status instead of image to show simple colored icons
- Status exampe:-
```javascript
termux({
  title: 'Notification Title',
  message: 'Notification message',
  status: 'success', // accepted values:- 'success', 'info', 'warning', 'danger'
}, function(err, log) {
  err && console.log(log);
});
```

Toast messages:-
```javascript
termux({
  message: 'Notification message',
  toast: true,
});
```

-----

## Contributing
Want to get involved with Termux Notify? Here's how you can help.

[Fork](https://help.github.com/fork-a-repo/) TermuxNotify, clone your fork, and configure the remotes:

```BASH
# Get code from repostery
git clone https://github.com/<your-username>/termux-notify.git

# Change your way to cloned directory
cd termux-notify

# Configure the remotes
git remote add upstream https://github.com/alzintani/termux-notify.git
```

-----

## Copyright and license
TermuxNotify 2024 Alzintani. Code released under the MIT license.
