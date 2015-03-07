/* @flow */
require('babel/register');
import React from 'react';
import ApplicationView from './views/application';

React.render(
	<ApplicationView/>,
	document.body
);