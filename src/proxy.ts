import { NextRequest, NextResponse } from "next/server";

export type IRole = 'admin' | 'user'
export interface IUser {
    name : string
    role: IRole,
} 

export function proxy (request: NextRequest) {
    const userCookie = request.cookies.get("user")?.value;

    const { pathname } = request.nextUrl;
    console.log(pathname)
    const toUserPage = pathname.startsWith("/user")
    const toAdminPage = pathname.startsWith("/admin")
    const isNeedSession = toUserPage || toAdminPage

    if (isNeedSession) {
        if (!userCookie) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    const user = JSON.parse(userCookie || "{}") as IUser

    if (toAdminPage && user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
    }
    if (toUserPage && user.role !== "user") {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}