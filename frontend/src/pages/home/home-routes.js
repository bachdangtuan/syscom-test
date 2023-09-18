import React from 'react';
import {Redirect} from 'react-router-dom';

import Overview from './overview/overview';
import UploadReport from './upload-report/upload-report';
import UploadRule from './upload-rule/upload-rule';
import Search from './search/search';
import Results from './results/results';
import ChangePassword from './change-password/change-password';

export const HOME_ROUTES = [
  {
    path: '/home/overview',
    exact: false,
    component: Overview,
  }, {
    path: '/home/upload-report',
    exact: false,
    component: UploadReport,
  }, {
    path: '/home/upload-rule',
    exact: false,
    component: UploadRule,
  }, {
    path: '/home/search',
    exact: false,
    component: Search,
  }, {
    path: '/home/results/:id',
    exact: false,
    component: Results,
  }, {
    path: '/home/change-password',
    exact: false,
    component: ChangePassword,
  }, {
    path: '/home',
    exact: true,
    component: () => <Redirect to="/home/overview" />,
  }
];
