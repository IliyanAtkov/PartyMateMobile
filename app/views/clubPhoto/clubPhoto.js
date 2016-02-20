'use strict';

let services = require('../../services');

let vm = require('./clubPhoto-view-model')
  .create(services);

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = vm;
}

module.exports  = {
	pageLoaded
};