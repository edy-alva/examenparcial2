export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  
  {
    id: 'Componentes',
    title: 'Componentes',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'talleres',
        title: 'Talleres',
        type: 'item',
        classes: 'nav-item',
        url: '/talleres',
        icon: 'ant-design'
      }, 
      {
        id: 'participantes',
        title: 'Participantes',
        type: 'item',
        classes: 'nav-item',
        url: '/participantes',
        icon: 'ant-design'
      },
      {
        id: 'inscripciones',
        title: 'Inscripciones',
        type: 'item',
        classes: 'nav-item',
        url: '/inscripciones',
        icon: 'ant-design'
      },
     
    ]
  }

];
