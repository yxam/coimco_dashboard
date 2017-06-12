export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Home',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'charts',
        data: {
          menu: {
            title: 'general.menu.charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'general.menu.chartist_client',
              }
            }
          },
          {
            path: 'chartist-js2',
            data: {
              menu: {
                title: 'general.menu.chartist_provider',
              }
            }
          },
          {
            path: 'chartist-js3',
            data: {
              menu: {
                title: 'general.menu.chartist_product',
              }
            }
          }                    
        ]
      }        
    ]
  }
]
