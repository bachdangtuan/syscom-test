import Guard from './guard';

import {AuthenSubject} from 'services/authentication/authentication';

class GuardHome extends Guard {
  constructor(props) {
    super(props);
    this.state.redirectTo = '/login';
  }

  async doGuard() {
    const loggedIn = await AuthenSubject.isLoggedIn();
    this.setState({shouldRender: loggedIn});
  }
}

GuardHome.propTypes = Guard.propTypes;

export function guardHome(component, props) {
  return (propsFromRoute) => (
    <GuardHome component={component} props={{...propsFromRoute, ...props}} /> 
  );
}
