import React from 'react';
import {Redirect} from 'react-router-dom';

import {guardHome} from 'services/guards/guard-home';
import {guardLogin} from 'services/guards/guard-login';

import Home from 'pages/home/home';
import Login from 'pages/login/login';
import Intro from 'pages/intro/intro';
import Guide from 'pages/guide/guide';
import Contact from 'pages/contact/contact';

export const APP_ROUTES = [
  {
    path: '/home',
    exact: false,
    component: guardHome(Home),
  }, {
    path: '/login',
    exact: false,
    component: guardLogin(Login),
  }, {
    path: '/intro',
    exact: false,
    component: Intro,
  }, {
    path: '/guide',
    exact: false,
    component: Guide,
  }, {
    path: '/contact',
    exact: false,
    component: Contact,
  }, {
    path: '/',
    exact: false,
    component: () => <Redirect to="/home" />,
  }
];
