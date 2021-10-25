import ReactFacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { requestAction } from '../../redux/global/actions';
import './SocialLoginCmp.scss';

const SocialLoginCmp = (props: any) => {
  const { request, onSocialLoginResponse = () => {} } = props;

  const onSuccess = (r: any) => {
    const { session, roles } = r;
    onSocialLoginResponse(session, roles);
  };

  const loginWithSocialData = (fields: any) => {
    request({ name: 'social.post', fields }, { onSuccess });
  };

  const responseGoogle = (responseData: any) => {
    const {
      profileObj: { name, imageUrl, email },
      accessToken,
      googleId: socialId,
    } = responseData;
    loginWithSocialData({ socialName: 'google', accessToken, email, name, socialId, imageUrl });
  };

  const responseFacebook = (responseData: any) => {
    if (responseData.status === 'unknown') return;
    const {
      accessToken,
      email,
      name,
      id: socialId,
      picture: {
        data: { url: imageUrl },
      },
    } = responseData;

    loginWithSocialData({ socialName: 'facebook', accessToken, email, name, socialId, imageUrl });
  };
  return (
    <div className="social-login">
      <div className="title">Login de Usuario</div>
      <div className="social-button">
        <GoogleLogin
          className="social-button"
          clientId="959363960551-hl4va31erts81kjuutpie3h818dj0q6k.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          buttonText="With Google"
        />
      </div>
      <div className="social-button">
        <ReactFacebookLogin
          appId="1675372092658785"
          fields="name,email,picture"
          textButton="With Facebook"
          callback={responseFacebook}
        />
      </div>
    </div>
  );
};

//export default SocialLoginCmp;

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      request: requestAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginCmp);
