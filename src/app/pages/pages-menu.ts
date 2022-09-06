import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Modulos',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },

  {
    title: 'Modulos',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },

    ],
  },

  {
    title: 'Catalogos',
    icon: 'book-open-outline',
    children: [
      {
        title: 'Clientes',
        icon: 'person-done-outline',
        link: '/pages/clients/clientes',
      },
      {
        title: 'Update',
        link: '/pages/clients/update',
      },
      {
        title: 'Address',
        link: '/pages/address/address',
      },
      {
        title: 'Address Update',
        link: '/pages/address/address-update',
      },

    ],
  },


];
