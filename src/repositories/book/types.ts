import { BaseUserReturn } from 'repositories/user/userRepository'

export interface PublisherProps {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface VolumeProps {
  id: string
  number: string
  price: string
  releaseDate: string
  coverUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  checked?: boolean
}

export interface BookProps {
  id: string
  name: string
  url: string
  author: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  liked: BaseUserReturn[]
  publisher: PublisherProps
  volumes: VolumeProps[]
  numberOfVolumes: number
}
