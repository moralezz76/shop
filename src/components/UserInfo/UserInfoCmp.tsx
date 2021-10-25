import { If, SocialLogin } from '..';
import './UserInfoCmp.scss';

const UserInfoCmp = (props: any) => {
  const guessUser = 'Invitado';
  const { onSocialLoginResponse, session } = props;

  const {
    name = guessUser,
    imageUrl = 'https://scontent.fmid3-1.fna.fbcdn.net/v/t1.30497-1/cp0/p32x32/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeFUBHhLRdX2gXoPBwivBdeRso2H55p0AlGyjYfnmnQCUdNh1oVBTq2ADBdsdMwNeYtEdvF7d18r6U7zgelQHETw&_nc_ohc=8eywajsP12oAX9DW19P&tn=_9AguTjdZMUDSg_q&_nc_ht=scontent.fmid3-1.fna&oh=2d39e382f608a8bc1c388c9663cb346d&oe=615622CF',
  } = session || {};

  const [firstName, lastName] = name.split(' ');
  const realName = firstName + (lastName && firstName.length < 3 ? ` ${lastName}` : '');

  return (
    <div className="user-info">
      <div className="user-data">
        <div className="img-profile">
          <img src={imageUrl} alt="profile" />
        </div>
        <div style={{ marginTop: -15 }}>
          <div className="welcome">Bienvenido</div>
          <div>{realName}</div>
        </div>
      </div>
      <If value={name} is={guessUser}>
        <SocialLogin onSocialLoginResponse={onSocialLoginResponse} />
      </If>
    </div>
  );
};

export default UserInfoCmp;
