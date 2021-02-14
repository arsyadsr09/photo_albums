export interface User {
  id: number | string
  username: string
  name: string
  email: string
  address: any
  phone: string
  website: string
  company: any
}

export interface PhotoComment {
  photoId: number
  value: Array<string>
}

export interface Favourite {
  photoId: number | string
  value: boolean
}

export interface Album {
  userId: number
  id: number
  title: string
  thumbnailUrl: string
}

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
  favourite?: boolean
}

export interface BgStyledComponent {
  image: string
}
