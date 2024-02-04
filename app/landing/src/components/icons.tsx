'use client'

import { cn } from '~/lib/utils'

function IconDiscord({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.14 96.36"
      role="img"
      fill="currentColor"
      className={cn('size-4', className)}
      {...props}
    >
      <g id="图层_2" data-name="图层 2">
        <g id="Discord_Logos" data-name="Discord Logos">
          <g
            id="Discord_Logo_-_Large_-_White"
            data-name="Discord Logo - Large - White"
          >
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

function IconGoogle({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      fill="currentColor"
      className={cn('size-4', className)}
      {...props}
    >
      <path
        fill="#fbc02d"
        d="M44,24c0-1.31-0.11-2.58-0.32-3.83H24v7.25h11.84c-0.48,2.54-1.94,4.71-3.94,6.17v5.13h6.37c3.73-3.44,5.88-8.51,5.88-14.72Z"
      />
      <path
        fill="#e53935"
        d="M24,48c6.48,0,11.93-2.14,15.91-5.8l-6.37-5.13c-2.15,1.44-4.89,2.3-7.89,2.3-6.07,0-11.21-4.11-13.05-9.64H4.18v6.07C8.17,43.95,15.46,48,24,48Z"
      />
      <path
        fill="#4caf50"
        d="M10.96,28.83c-0.25-0.75-0.38-1.55-0.38-2.38s0.13-1.63,0.38-2.38V17.99H4.18C3.42,19.64,3,21.48,3,23.45s0.42,3.81,1.18,5.46L10.96,28.83Z"
      />
      <path
        fill="#1565c0"
        d="M24,9.58c3.25,0,6.18,1.12,8.48,3.32l6.36-6.36C35.93,2.14,30.48,0,24,0C15.46,0,8.17,4.05,4.18,10.13l6.78,5.84C12.79,13.69,17.93,9.58,24,9.58Z"
      />
    </svg>
  )
}

function IconSpinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('size-4 animate-spin', className)}
      {...props}
    >
      <path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
    </svg>
  )
}

export { IconDiscord, IconGoogle, IconSpinner }
