import { Routes } from '@/enums/routes'

export const getCurrentUrl = (id: string) => {
  const tempUrl = window.location.href

  // Crear un objeto URL para descomponer la URL en sus partes
  const url = new URL(tempUrl)
  const baseUrl = `${url.origin}${Routes.JOIN}/${id}`
  return baseUrl
}
