[![GitHub version](https://badge.fury.io/gh/inProgress-team%2Freact-native-meteor-router-flux.svg)](https://badge.fury.io/gh/inProgress-team%2Freact-native-meteor-router-flux)
[![npm version](https://badge.fury.io/js/react-native-meteor-router-flux.svg)](http://badge.fury.io/js/react-native-meteor-router-flux)
[![Dependency Status](https://david-dm.org/inProgress-team/react-native-meteor-router-flux.svg)](https://david-dm.org/inProgress-team/react-native-meteor-router-flux)
[![devDependency Status](https://david-dm.org/inProgress-team/react-native-meteor-router-flux/dev-status.svg)](https://david-dm.org/inProgress-team/react-native-meteor-router-flux#info=devDependencies)
[![MIT][license-badge]][license]
[![bitHound Score][bithound-badge]][bithound]

[bithound-badge]: https://www.bithound.io/github/inProgress-Team/react-native-meteor-router-flux/badges/score.svg
[bithound]: https://www.bithound.io/github/inProgress-Team/react-native-meteor-router-flux
[license-badge]: https://img.shields.io/dub/l/vibe-d.svg
[license]: https://github.com/inProgress-team/react-native-meteor-router-flux/blob/master/LICENSE

# react-native-meteor-router-flux

[Custom scene renderer](https://github.com/aksonov/react-native-router-flux#switch-new-feature) which allows to select tab scene to show depending from app state. It could be useful for authentication, restricted scenes, etc.

## Install

    npm i --save react-native-meteor-router-flux@latest


## Example usage

```javascript

'use strict';

import React, { Component } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';
import { meteorSwitch } from 'react-native-meteor-router-flux';

export default class RouterContainer extends Component {
  render () {

    const getMeteorData = ()=>{
      return {
        connected: Meteor.status().connected,
        user: Meteor.user(),
        loggingIn: Meteor.loggingIn()
      }
    };

    const selector = (data, props) => {
      if(!data.connected || data.loggingIn) {
        return "loading";
      } else if (!data.user) {
        return "login";
      } else {
        return "loggedIn";
      }

    };

    const scenes = Actions.create(
      <Scene key="root" component={meteorSwitch(getMeteorData)} selector={selector} tabs={true}>
        <Scene key="loading" component={Loading} />
        <Scene key="login" component={Login} />

        <Scene key="loggedIn">
          <Scene key="home" component={Home} />
          <Scene key="settings" component={Settings} />
        </Scene>
      </Scene>
    );


    return (
      <Router scenes={scenes} />
    );
  }
}

```

Pull Requests are welcome ! :)
