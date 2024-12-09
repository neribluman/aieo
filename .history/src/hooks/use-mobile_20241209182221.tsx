import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useMobileOptimization() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable animations on mobile for better performance
      if (window.innerWidth < 768) {
        document.body.classList.add('mobile-optimize')
      }
      
      // Lazy load images on mobile
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        if (window.innerWidth < 768) {
          img.loading = 'lazy'
        }
      })
    }
  }, [])
}
