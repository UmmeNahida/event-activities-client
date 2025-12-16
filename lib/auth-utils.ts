// user role base access control added here
export type UserRole = 'ADMIN' | 'HOST' | 'USER'; 

export type RouteConfig = {
    exact: string[];
    pattern: RegExp[];
}


export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings","/change-password","/reset-password","/events/:id"],
    pattern: []
}

export const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin/], // matches /admin and any sub routes /admin/*
    exact: []
}


export const hostProtectedRoutes: RouteConfig = {
    pattern: [/^\/host/], // matches /host and any sub routes /doctor/*
    exact: []
}


export const userProtectedRoutes: RouteConfig = {
    pattern: [/^\/user/], // matches /user and any sub routes /user/*
    exact: []
}


export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route) => route === pathname);
}


export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) { // example: /user/profile is exactly matched with /user/profile
        return true;
    }

    // example: /doctor/appointments is matched with /^\/doctor/
    return routes.pattern.some((pattern) => pattern.test(pathname))

}


export const getRouteOwnerRole = (pathname: string): "ADMIN" | "HOST" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) { // /admin/dashboard => "ADMIN" /user/profile 
        return "ADMIN";
    }

    if (isRouteMatches(pathname, hostProtectedRoutes)) {
        return "HOST"; 
    }

    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER"; 
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON"; // /my-profile => "COMMON"
    }

    return null;
}



export const getDefaultDashboardRoute = (role: UserRole | null) => {
    if (role === 'ADMIN') {
        return '/admin/dashboard';
    }

    if (role === 'HOST') {
        return '/host/dashboard';
    }

    if (role === 'USER') {
        return "/user/dashboard";
    }

    return '/';
}


export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwnerRole(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}
