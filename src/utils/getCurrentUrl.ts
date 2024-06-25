import { Routes } from "@/enums/routes"

export const getCurrentUrl = (id: string) => {
    const baseUrl = `http://localhost:3000${Routes.JOIN}/${id}`
    return baseUrl
}