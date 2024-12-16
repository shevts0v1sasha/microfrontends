import React, { lazy } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ProfileSection = lazy(() => import('auth/ProfileSection').catch(() => {
  return { default: () => <div>Couldn't load profile section</div>}
}));
const ContentSection = lazy(() => import('cards/ContentSection').catch(() => {
  return { default: () => <div>Couldn't load content section</div>}
}));

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  console.log(currentUser);
  

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main className="content">
      <ProfileSection currentUser={currentUser}/>
      <ContentSection currentUser={currentUser}/>
    </main>
  );
}

export default Main;
