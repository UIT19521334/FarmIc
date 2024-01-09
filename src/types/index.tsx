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

export type ISubDivision = {
    SubDivisionID: string;
    SubDivisionShortName: string;
    SubDivisionDescription: string;
    Factories: IFactory[];
};

export type IFactory = {
    Username: string;
    FactoryID: string;
    FactoryName: string;
    ConnString: string | null;
    IsDefault: any; // data res = null so i don't know type
    Order: any; // data res = null so i don't know type
    SectionID: any; // data res = null so i don't know type
    BusinessUnitID: string;
    BusinessUnitShortName: string;
    SubDivisionID: string;
    SubDivisionShortName: string;
    SubDivisionDescription: string;
    IsCentralUnit: 'Y' | 'N';
    CentralUnitID: string;
    CentralUnitName: string;
    DecimalPlaces: number;
};

export type IUser = {
    acct: number;
    acr: number;
    aio: string;
    amr: any[];
    app_displayname: string;
    appid: string;
    appidacr: number;
    aud: string;
    enfpolids: any[];
    exp: string;
    family_name: string; // Ho
    given_name: string; // Ten
    iat: string;
    ipaddr: string;
    iss: string;
    login_hint: string;
    name: string;
    nbf: string;
    oid: string;
    puid: string;
    rh: string;
    scp: string;
    sid: string;
    sub: string;
    tid: string;
    unique_name: string; // email
    upn: string; // email
    uti: string;
    ver: number;
    wids: any[];
};
