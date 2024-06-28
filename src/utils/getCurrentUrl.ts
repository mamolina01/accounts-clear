import { Routes } from '@/enums/routes'

export const getCurrentUrl = (id: string) => {
  const urlCompleta = window.location.href

  // Crear un objeto URL para descomponer la URL en sus partes
  const url = new URL(urlCompleta)
  const baseUrl = `${url.origin}${Routes.JOIN}/${id}`
  return baseUrl
}
