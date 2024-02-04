import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice() // Clone the array to avoid modifying the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i] as T, shuffled[j] as T] = [shuffled[j] as T, shuffled[i] as T] // Swap elements
  }
  return shuffled
}

export function sampleSize<T>(array: T[], n: number): T[] {
  const sample = array.slice()
  const length = sample.length
  const sampleSize = Math.max(0, Math.min(n, length)) // Ensure sample size is within bounds

  for (let i = 0; i < sampleSize; i++) {
    const randomIndex = i + Math.floor(Math.random() * (length - i))
    ;[sample[i] as T, sample[randomIndex] as T] = [
      sample[randomIndex] as T,
      sample[i] as T
    ] // Swap elements
  }

  return sample.slice(0, sampleSize)
}
