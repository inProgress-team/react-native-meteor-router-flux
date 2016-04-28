import React, {Component} from 'react-native';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';

module.exports = (getMeteorData) => {

  class RouterFluxSwitch extends Component {
      constructor(props){
          super(props);
          this.state = {};
      }
      componentWillMount() {
        this.onChange = (props)=>{

          const hasNewProps = !!props;

          props = props && props.name ? props : this.props;

          const navState = props.navigationState;
          const selector = props.selector || console.error("selector should be defined");
          const selectedKey = selector(getMeteorData(), props) || console.error("selector should return key");
          const selected = navState.children.filter(el=>el.sceneKey==selectedKey) || console.error("key="+selectedKey+" doesn't exist");
          const navigationState = selected[0] || console.error("Cannot find scene with key="+selectedKey);

          if (navigationState.key != navState.children[navState.index].key){
              Actions[selectedKey]();
          }

          if(hasNewProps) {
            this.setState({navigationState});
          }

        };

        this.onChange(this.props);
        Meteor.getData().onChange(()=>{
          this.onChange();
        });
      }
      componentWillReceiveProps(props) {
        this.onChange(props);
      }
      componentWillUnmount() {
        Meteor.getData().offChange(this.onChange);
      }
      render(){
          if (this.state.navigationState){
              return <DefaultRenderer navigationState={this.state.navigationState} />;
          } else {
              return null;
          }
      }
  }

  return RouterFluxSwitch;
}
