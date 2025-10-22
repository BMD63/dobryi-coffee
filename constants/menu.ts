export type MenuItem = {
  title: string;
  to: string;
  icon: string;
  startsWith?: boolean }

export const MENU_ITEMS: MenuItem[] = [
  { title: 'Торговые точки',        to: '/shops',         icon: 'mdi-store' },
  { title: 'Кофемашины',            to: '/machines',      icon: 'mdi-coffee-maker' },
  { title: 'Партнёры',              to: '/partners',      icon: 'mdi-account-multiple-outline' },
  { title: 'Сотрудники',            to: '/staff',         icon: 'mdi-account-tie' },
  { title: 'Напитки',               to: '/drinks',        icon: 'mdi-coffee' },
  { title: 'Абонементы',            to: '/passes',        icon: 'mdi-card-bulleted' },
  { title: 'Активные абонементы',   to: '/passes/active', icon: 'mdi-card-bulleted-outline' },
  { title: 'Пользователи',          to: '/users',         icon: 'mdi-account-group', startsWith: true }
]
