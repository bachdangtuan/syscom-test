import {Component} from 'react';
import {AuthenSubject} from 'services/authentication/authentication';

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isAuthenticated: null,
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    this.loadAuthenticationState();
    this.subscriptions.push(
      AuthenSubject.subscribe(() => {
        this.loadAuthenticationState();
      }),
    );
  }

  componentWillUnmount() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async loadAuthenticationState() {
    try {
      const isLoggedIn = await AuthenSubject.isLoggedIn();
      this.setState({isAuthenticated: isLoggedIn});
    } catch (err) {
      console.error(err);
      this.setState({isAuthenticated: false});
    }
  }

  handleSearchChange(newSearch) {
    this.props.history.push(`/home/results/${newSearch}`);
  }

  render() {
    return null;
  }
}
