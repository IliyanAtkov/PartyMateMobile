'use strict';

let services = require('../../services');

let vm = require('./reviewClub-view-model')
  .create(services);

function pageLoaded(args) {
  let page = args.object;
  page.bindingContext = vm;
}

module.exports  = {
	pageLoaded
};