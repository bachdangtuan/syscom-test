import Guard from './guard';

import {AuthenSubject} from 'services/authentication/authentication';

class GuardLogin extends Guard {
  constructor(props) {
    super(props);
    this.state.redirectTo = '/home';
  }

  async doGuard() {
    const loggedIn = await AuthenSubject.isLoggedIn();
    this.setState({shouldRender: !loggedIn});
  }
}

GuardLogin.propTypes = Guard.propTypes;

export function guardLogin(component, props) {
  return (propsFromRoute) => (
    <GuardLogin component={component} props={{...propsFromRoute, ...props}} /> 
  );
}
