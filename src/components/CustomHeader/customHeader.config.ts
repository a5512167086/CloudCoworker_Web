import { PAGE_PATHS } from '@routes/index';

export const ROUTES_WITHOUT_AUTH = [
  {
    title: 'header.page_title.features',
    link: PAGE_PATHS.FEATURES,
  },

  {
    title: 'header.page_title.about',
    link: PAGE_PATHS.ABOUT,
  },
  {
    title: 'header.page_title.login',
    link: PAGE_PATHS.LOGIN,
  },
];

export const ROUTES_WITH_AUTH = [
  {
    title: 'header.page_title.chatroom',
    link: PAGE_PATHS.CHAT_ROOM,
  },
  {
    title: 'header.page_title.manage',
    link: PAGE_PATHS.MANAGE,
  },
  {
    title: 'header.page_title.logout',
    link: '',
  },
];
