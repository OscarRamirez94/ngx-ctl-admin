import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Registros',
    icon: 'book-open-outline',

    children: [
      {
        title: 'Entradas',
        icon: 'person-done-outline',
        link: '/pages/checklist/checklist',
      },
      {
        title: 'Salidas',
        icon: 'person-done-outline',
        link: '/pages/checkout/checkout',
      },
    ],
  },

  {
    title: 'Cotizaciones',
    icon: 'book-open-outline',

    children: [
      {
        title: 'Cotizaciones',
        icon: 'person-done-outline',
        link: '/pages/cotizaciones/cotizaciones',
      }
    ],
  },

  {
    title: 'Inventario',
    icon: 'book-open-outline',

    children: [
      {
        title: 'Disponible',
        icon: 'person-done-outline',
        link: '/pages/inventory/inventory-in',
      },
      {
        title: 'Liberado',
        icon: 'person-done-outline',
        link: '/pages/inventory/inventory-out',
      },
    ],
  },


  {
    title: 'Reportes',
    icon: 'book-open-outline',

    children: [
      {
        title: 'Excel',
        icon: 'person-done-outline',
        link: '/pages/report/report-excel',
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

  {
    title: 'Tablero',
    icon: 'book-open-outline',
    link: '/pages/tablero/tablero-main',

  },
];
