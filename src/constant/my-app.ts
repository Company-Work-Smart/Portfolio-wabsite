export interface UserBoxProps {
  userId?: string;
  username?: string;
  role?: string;
  accessToken?: string;
}

export const AppConfig = {
  url: 'https://api.jabjit.site',
  keys: {
    userId: 'userId',
    username: 'username',
    role: 'role',
    accessToken: 'accessToken'
  },
  role: ['SuperAdmin', 'Admin', 'User']
};

export class MyApp {
  static AppConfig: any;
  public static UserInfo(): UserBoxProps {
    return {
      userId: AppConfig.keys.userId,
      username: AppConfig.keys.username,
      role: AppConfig.keys.role,
      accessToken: AppConfig.keys.accessToken
    };
  }
}
