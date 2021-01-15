import { User as UserHooks } from '@osu-wams/hooks';
import { User, Types } from '@osu-wams/lib';
import { navigate } from '@reach/router';

export const changeAffiliation = (affiliationType: string, user: Types.UserState) => {
  const settings = User.usersSettings(user.data);
  settings.primaryAffiliationOverride = affiliationType;

  UserHooks.postSettings({ primaryAffiliationOverride: settings.primaryAffiliationOverride }).then(
    (d) => {
      // This hook needs to reach into the UserState and call the underlying
      // setter on the user object rather than the `setUser` on the
      // recoil state itself.
      user.setUser!((prevUser) => ({ ...prevUser, data: { ...prevUser.data, ...settings } }));
      navigate(`/${affiliationType}`);
    }
  );
};
