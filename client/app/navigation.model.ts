export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id'      : 'pages',
                'title'   : 'PAGES',
                'type'    : 'group',
                'icon'    : 'pages',
                'children': [
                    {
                        'id'   : 'profile',
                        'title': 'profile',
                        'type' : 'item',
                        'icon' : 'person',
                        'url'  : '/admin/profile',
                    },
                    {
                        'id'   : 'categories',
                        'title': 'categories',
                        'type' : 'item',
                        'icon' : 'dashboard',
                        'url'  : '/admin/categories',
                    },
                    {
                        'id'   : 'subCategories',
                        'title': 'subCategories',
                        'type' : 'item',
                        'icon' : 'view_quilt',
                        'url'  : '/admin/subCategories',
                    },
                    {
                        'id'   : 'products',
                        'title': 'products',
                        'type' : 'item',
                        'icon' : 'view_comfy',
                        'url'  : '/admin/products',
                    },
                ],
            },
        ];
    }
}
