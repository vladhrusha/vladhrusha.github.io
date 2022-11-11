export interface Job {
  address: string
  benefits: string[]
  // createdAt: Date
  createdAt: string

  description: string
  email: string
  employment_type: string[]
  id: string
  location: {
    lat: number
    long: number
  }
  name: string
  phone: string
  pictures: string[]
  salary: string
  title: string
  // updatedAt: Date
  updatedAt: string
}
