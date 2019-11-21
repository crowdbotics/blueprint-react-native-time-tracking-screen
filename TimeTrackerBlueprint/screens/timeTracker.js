import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import {
  Modal,
  withStyles,
  Text,
  Input,
  Avatar,
  Button,
} from 'react-native-ui-kitten';
import {trackings} from '../data';
import NavigationType from '../../../config/navigation/propTypes';
import {secondsToHms} from '../utils/index';
import timer from 'react-native-timer';

let dm = Dimensions.get('screen');

class _TimeTracker extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Time Tracker'.toUpperCase(),
  };

  state = {
    title: '',
    showPopup: false,
    interval: 0,
    timerStarted: false,
  };

  timerStart = () => {
    if (!this.state.timerStarted) {
      this.setState({timerStarted: true});
      timer.setInterval(
        this,
        'timer',
        () => {
          this.setState({interval: this.state.interval + 1});
        },
        1000,
      );
    } else {
      this.setState({timerStarted: false});
      timer.clearInterval(this);
    }
  };

  timerEnd = () => {
    timer.clearInterval(this);
    this.setState({
      timerStarted: false,
      interval: 0,
    });
  };

  renderTimeTracker = () => {
    return (
      <View style={this.props.themedStyle.modalContainer}>
        <Avatar
          source={require('../assets/001.png')}
          size="giant"
          style={{width: 100, height: 100, marginVertical: 10}}
        />
        <View style={{marginVertical: 20}}>
          <Text category="h1">{secondsToHms(this.state.interval)}</Text>
        </View>
        <View style={this.props.themedStyle.buttonWrapper}>
          <Button
            style={this.props.themedStyle.button}
            onPress={this.timerEnd}
            status="danger">
            STOP
          </Button>

          <Button
            style={this.props.themedStyle.button}
            onPress={this.timerStart}
            status="danger">
            {this.state.timerStarted ? 'PAUSE' : 'START'}
          </Button>
        </View>
      </View>
    );
  };


  render = () => (
    <View style={this.props.themedStyle.root}>
      {this.renderTimeTracker()}
    </View>
  );
}

export default TimeTracker = withStyles(_TimeTracker, theme => ({
  root: {
    backgroundColor: theme['color-basic-100'],
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20
  },
  searchContainer: {
    backgroundColor: theme['color-basic-400'],
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme['color-basic-400'],
  },
  text: {
    color: theme['color-basic-1000'],
  },
  Input: {
    borderColor: theme['color-basic-400'],
    borderRadius: 25,
    backgroundColor: theme['color-basic-100'],
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 5,
  },
  textTime: {
    color: theme['color-basic-600'],
    marginTop: 5,
  },

  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#333c66',
    borderRadius: 8,
    padding: 10,
    width: dm.width * 0.8,
    margin: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 10,
    width: 120,
  },
}));
