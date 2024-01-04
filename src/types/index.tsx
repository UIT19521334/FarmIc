export type IDrawer = {
    MenuGroup: string;
    SubMenu: ISubmenu[];
};

export type ISubmenu = {
    Username: string | null;
    MenuID: string;
    MenuName: string;
    MenuGroup: string | 'MASTER';
    MenuIcon: string;
    MenuLink: string;
    OrderIndex: string | null;
    CreatedTime: string | null;
};
