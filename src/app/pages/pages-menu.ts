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
    title: 'Check List',
    icon: 'book-open-outline',

    children: [
      {
        title: 'Check Lists',
        icon: 'person-done-outline',
        link: '/pages/checklist/checklist',
      },
      {
        title: 'Agregar',

        icon: 'car-outline',
        link: '/pages/checklist/checklist-create',
      },
      {
        title: 'Pallet',

        icon: 'car-outline',
        link: '/pages/checklist/pallet-main',
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
        title: 'Lineas de transporte',
        icon: 'car-outline',
        link: '/pages/transport-lines/transport-lines',
      },
      {
        title: 'Tipos de transporte',
        icon: 'car-outline',
        link: '/pages/transport-types/transport-types',
      },
      {
        title: 'Personal',
        icon: 'person-outline',
        link: '/pages/persons/persons',
      },
      {
        title: 'Puestos',
        icon: 'menu',
        link: '/pages/professions/professions',
      },
      {
        title: 'Usuarios',
        icon: 'menu',
        link: '/pages/users/users',
      },
      {
        title: 'Productos',
        icon: 'menu',
        link: '/pages/product/product',
      },
    ],
  },


];
