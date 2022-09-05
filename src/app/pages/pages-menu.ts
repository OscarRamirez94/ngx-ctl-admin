import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },

  {
    title: 'Forms',
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
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Clientes',
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
