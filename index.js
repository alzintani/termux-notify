const { existsSync } = require('fs');
const { escape } = require('shellwords');
const { exec } = require('child_process');
const os = require('os');

'use strict';

const getTitle = function(args) {
  return escape(
    typeof args.title === 'string' ? args.title : 'Termux Notify'
  ).substring(0, 50);
}

const getMessage = function(args) {
  let message = typeof args === 'string' ? args : 'Termux notify message';
  return escape(
    typeof args.message === 'string' ? args.message : message
  ).substring(0, 400);
}

const imageFromStatus = function(args) {
  let statuses = ['success', 'info', 'warning', 'danger'];
  if (typeof args.status === 'string' && statuses.includes(args.status) ) {
    return  __dirname + '/assets/' + args.status + '.png';
  }
}

const getImage = function(args) {
  return escape(
    typeof args.image === 'string' && existsSync(args.image) ? args.image : imageFromStatus(args)
  );
}

const setParams = function(args) {
  let image = getImage(args);
  let params = [
    '-t', getTitle(args),
    '-c', getMessage(args)
  ];

  if (image && !Buffer.isBuffer(image)) {
    params = ['--image-path', image, ...params ]
  }

  return params;
}

module.exports = TermuxNotify = function (args, callback = null) {
  const cb = typeof callback === 'function' ? callback : (err, log) => {
    return [err, log];
  }

  if (os.platform() != 'android') {
    return cb(
      true,
      'Termux Notify only works on Android environment.'
    );
  }

  if (typeof args != 'string' && typeof args != 'object') {
    return cb(
      true,
      'Termux Notify function only accepts strings or objects as arguments.'
    );
  }

  let command = 'termux-notification';
  let params = [];
  
  if (typeof args.toast != 'undefined' && args.toast) {
    command = 'termux-toast';
    params = [getMessage(args)];
  } else {
    params = setParams(args);

    if (typeof args.overwrite != 'undefined' && args.overwrite) {
      params = ['--id', 'TermuxNotify', ...params];
    }
  }

  return exec(command + ' ' + params.join(' '), function (error, stdout, stderr) {
    return cb(
      !!error,
      error ? error : {stdout, stderr}
    );
  });
}
