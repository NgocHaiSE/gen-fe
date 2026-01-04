declare namespace API {
    type CurrentUser = {
        name?: string;
        avatar?: string;
        userid?: string;
        email?: string;
        signature?: string;
        title?: string;
        group?: string;
        tags?: { key: string; label: string }[];
        notifyCount?: number;
        unreadCount?: number;
        country?: string;
        access?: string;
        geographic?: {
            province?: { label: string; key: string };
            city?: { label: string; key: string };
        };
        address?: string;
        phone?: string;
    };

    type UserInfo = {
        name: string;
        access: string;
        userid: string;
        email: string;
    };

    type LoginResult = {
        status?: string;
        type?: string;
        currentAuthority?: string;
        accessToken?: string;
        data?: UserInfo;
    };

    type LoginParams = {
        username?: string;
        password?: string;
        autoLogin?: boolean;
        type?: string;
    };
}
