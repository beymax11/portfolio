
'use client'

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'
import './DepthCarousel.css'

export interface DepthCarouselItem {
  image: string
  alt?: string
}

export type DepthCarouselInput = string | DepthCarouselItem
export type TiltDirection = 'left' | 'right'

export interface DepthCarouselProps {
  items?: DepthCarouselInput[]
  cardWidth?: number
  cardHeight?: number
  radius?: number
  tint?: string
  depth?: number
  spread?: number
  tilt?: number
  tiltDirection?: TiltDirection
  perspective?: number
  visibleCards?: number
  falloff?: number
  blur?: number
  duration?: number
  ease?: string
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  showControls?: boolean
  showIndicators?: boolean
  centerStack?: boolean
  captureWheel?: boolean | 'horizontal'
  onChange?: (index: number, item: DepthCarouselItem) => void
  onSelect?: (index: number, item: DepthCarouselItem) => void
  className?: string
}

interface ConfigState {
  count: number
  depth: number
  spread: number
  tilt: number
  tiltDirection: TiltDirection
  perspective: number
  visibleCards: number
  falloff: number
  blur: number
  duration: number
  ease: string
  loop: boolean
  cardWidth: number
  cardHeight: number
  autoplayDelay: number
  centerStack: boolean
  captureWheel: boolean | 'horizontal'
  showControls: boolean
}

interface DragState {
  x: number
  startPos: number
  lastX: number
  lastT: number
  v: number
  moved: boolean
  id: number
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  { image: 'https://picsum.photos/seed/depth1/800/1000', alt: 'Slide 1' },
  { image: 'https://picsum.photos/seed/depth2/800/1000', alt: 'Slide 2' },
  { image: 'https://picsum.photos/seed/depth3/800/1000', alt: 'Slide 3' },
  { image: 'https://picsum.photos/seed/depth4/800/1000', alt: 'Slide 4' },
  { image: 'https://picsum.photos/seed/depth5/800/1000', alt: 'Slide 5' },
  { image: 'https://picsum.photos/seed/depth6/800/1000', alt: 'Slide 6' },
]

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)

const normalizeItem = (it: DepthCarouselInput): DepthCarouselItem =>
  typeof it === 'string' ? { image: it, alt: '' } : it

const computeVisualBounds = (cfg: ConfigState) => {
  const halfW = cfg.cardWidth / 2
  if (cfg.count <= 1) {
    return { opticalShift: 0, span: cfg.cardWidth }
  }
  const maxVisibleD = cfg.loop
    ? Math.max(0, Math.min(cfg.visibleCards, cfg.count - 1) - 1)
    : Math.max(0, Math.min(cfg.visibleCards, cfg.count - 1))
  const rad = (Math.abs(cfg.tilt) * Math.PI) / 180
  const edgeX = cfg.spread * maxVisibleD + halfW * Math.cos(rad)
  const edgeZ = cfg.depth * maxVisibleD + halfW * Math.sin(rad)
  const p = Math.max(cfg.perspective, 200)
  const projectedFar = edgeX * (p / (p + edgeZ))
  const leftExtent = Math.min(-halfW, projectedFar)
  const rightExtent = Math.max(halfW, projectedFar)
  const opticalShift = cfg.centerStack ? 0.5 * (rightExtent + leftExtent) : 0
  const span = rightExtent - leftExtent
  return { opticalShift, span }
}

const DepthCarousel = ({
  items = DEFAULT_ITEMS,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = '#05060a',
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  centerStack = false,
  captureWheel = true,
  onChange,
  onSelect,
  className = '',
}: DepthCarouselProps) => {
  const data = useMemo(
    () => (Array.isArray(items) ? items : []).map(normalizeItem),
    [items]
  )
  const count = data.length

  const rootRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([])

  const posRef = useRef(0)
  const focusRef = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const scaleRef = useRef(1)
  const rootWidthRef = useRef(0)
  const rootHeightRef = useRef(0)
  const onChangeRef = useRef(onChange)
  const onSelectRef = useRef(onSelect)

  const dragRef = useRef<DragState | null>(null)
  const justDraggedRef = useRef(false)
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoTimerRef = useRef<number | null>(null)
  const reducedRef = useRef(false)

  const [active, setActive] = useState(0)

  onChangeRef.current = onChange
  onSelectRef.current = onSelect

  const cfgRef = useRef<ConfigState>({
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    perspective,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    cardHeight,
    autoplayDelay,
    centerStack,
    captureWheel,
    showControls,
  })

  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    perspective,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    cardHeight,
    autoplayDelay,
    centerStack,
    captureWheel,
    showControls,
  }

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current
    const n = cfg.count
    if (!n) return
    const dir = cfg.tiltDirection === 'left' ? -1 : 1
    const sc = scaleRef.current

    const { opticalShift } = computeVisualBounds(cfg)
    const shiftPx = -dir * opticalShift * sc
    if (rootRef.current) {
      rootRef.current.style.setProperty(
        '--dc-perspective',
        `${(cfg.perspective * sc).toFixed(1)}px`
      )
      rootRef.current.style.setProperty('--dc-shift-x', `${shiftPx.toFixed(2)}px`)
    }

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i]
      if (!el) continue

      let d = i - pos
      let opacity: number

      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n
        if (d > n - 1) d -= n

        if (n === 2) {
          opacity = d < 0 ? Math.max(0, 1 + d) : 1
        } else {
          const maxDepth = Math.min(cfg.visibleCards, n - 1)
          opacity = d < 0 ? Math.max(0, 1 + d) : clamp(maxDepth - d, 0, 1)
        }
      } else {
        const az = Math.abs(d)
        const shown = az <= cfg.visibleCards + 0.5
        opacity = d < 0 ? Math.max(0, 1 + d) : clamp(cfg.visibleCards + 0.5 - d, 0, 1)
        if (!shown) opacity = 0
      }

      const back = Math.max(0, d)
      const tz = -cfg.depth * d
      const tx = dir * cfg.spread * d
      const ry = dir * cfg.tilt * clamp(d, 0, 1)

      const brightness = Math.max(0.22, 1 - back * cfg.falloff)
      const blurPx =
        cfg.blur > 0
          ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur)
          : 0
      const zi = Math.round(2000 - d * 20)

      el.style.transform = `translate(-50%, -50%) scale3d(${sc.toFixed(4)}, ${sc.toFixed(4)}, ${sc.toFixed(4)}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`
      el.style.opacity = opacity.toFixed(3)
      el.style.zIndex = String(zi)
      el.style.pointerEvents = opacity > 0.05 ? 'auto' : 'none'

      const imgEl = imgRefs.current[i]
      if (imgEl) {
        const imgScale = blurPx > 0.1 ? 1 + blurPx * 0.008 : 1
        imgEl.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`
        imgEl.style.transform = imgScale > 1 ? `scale(${imgScale.toFixed(3)})` : ''
      }

      const ov = overlayRefs.current[i]
      if (ov) {
        ov.style.opacity = clamp(back * cfg.falloff * 1.1, 0, 0.78).toFixed(3)
      }
    }
  }, [])

  const updateScaleAndLayout = useCallback(() => {
    const w = rootWidthRef.current
    const h = rootHeightRef.current
    const cfg = cfgRef.current
    if (w > 0) {
      const isNarrow = w < 640
      let neededW: number
      if (cfg.centerStack) {
        const { span } = computeVisualBounds(cfg)
        const sidePad = isNarrow ? 32 : cfg.showControls ? 148 : 48
        neededW = span + sidePad
      } else {
        neededW = cfg.cardWidth + Math.abs(cfg.spread) * 2 + (isNarrow ? 48 : 120)
      }
      const scaleW = w / Math.max(neededW, 1)
      const bottomReserve = isNarrow ? 56 : 64
      const scaleH =
        h > 0 ? Math.max(h - bottomReserve, 120) / Math.max(cfg.cardHeight, 1) : 1
      scaleRef.current = clamp(Math.min(scaleW, scaleH), 0.36, 1)
    }
    layout(posRef.current)
  }, [layout])

  const notify = useCallback(
    (idx: number) => {
      setActive(idx)
      if (data[idx]) {
        onChangeRef.current?.(idx, data[idx])
      }
    },
    [data]
  )

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill()
      const cfg = cfgRef.current
      const proxy = { p: posRef.current }
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p
          layout(proxy.p)
        },
        onComplete: () => {
          const n = cfg.count
          if (cfg.loop && n > 0) {
            posRef.current = ((posRef.current % n) + n) % n
          }
          layout(posRef.current)
        },
      })
    },
    [layout]
  )

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current
      const n = cfg.count
      if (!n) return
      const idx = cfg.loop
        ? ((rawIndex % n) + n) % n
        : clamp(rawIndex, 0, n - 1)
      let delta = idx - posRef.current
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n
        if (delta > n / 2) delta -= n
      }
      tweenTo(posRef.current + delta, animate)
      if (idx !== focusRef.current) {
        focusRef.current = idx
        notify(idx)
      }
    },
    [tweenTo, notify]
  )

  const navigateBy = useCallback(
    (step: number) => setFocus(focusRef.current + step, true),
    [setFocus]
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    rootWidthRef.current = rect.width
    rootHeightRef.current = rect.height
    updateScaleAndLayout()

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (!cr) return
      rootWidthRef.current = cr.width
      rootHeightRef.current = cr.height
      updateScaleAndLayout()
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [updateScaleAndLayout])

  useEffect(() => {
    const el = rootRef.current
    if (!el || captureWheel === false) return
    const onWheel = (e: WheelEvent) => {
      const cfg = cfgRef.current
      if (cfg.count < 2 || cfg.captureWheel === false) return

      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)
      if (cfg.captureWheel === 'horizontal' && (absX <= absY || absX < 4)) {
        return
      }

      e.preventDefault()
      e.stopPropagation()
      tweenRef.current?.kill()
      const raw = absX > absY ? e.deltaX : e.deltaY
      const delta = e.deltaMode === 1 ? raw * 24 : raw
      const step = clamp(delta / (cfg.cardWidth * 0.9), -0.6, 0.6)
      posRef.current += step
      layout(posRef.current)
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = setTimeout(
        () => setFocus(Math.round(posRef.current), true),
        130
      )
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
    }
  }, [captureWheel, layout, setFocus])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const cfg = cfgRef.current
    if (cfg.count < 2) return
    if ((e.target as HTMLElement | null)?.closest('button, a')) return
    justDraggedRef.current = false
    tweenRef.current?.kill()
    dragRef.current = {
      x: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId,
    }
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag) return
      const cfg = cfgRef.current
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40)
      const dx = e.clientX - drag.x
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true
        justDraggedRef.current = true
        try {
          rootRef.current?.setPointerCapture(drag.id)
        } catch {
          // Ignore pointer capture errors on synthetic events
        }
      }
      if (!drag.moved) return
      const now = performance.now()
      const dt = Math.max(now - drag.lastT, 1)
      drag.v = (e.clientX - drag.lastX) / dt
      drag.lastX = e.clientX
      drag.lastT = now
      posRef.current = drag.startPos - dx / stepPx
      layout(posRef.current)
    },
    [layout]
  )

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null
    if (!drag.moved) return
    const cfg = cfgRef.current
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40)
    const projected = posRef.current - (drag.v * 180) / stepPx
    setFocus(Math.round(projected), true)
  }, [setFocus])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateBy(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        navigateBy(1)
      }
    },
    [navigateBy]
  )

  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved || justDraggedRef.current) {
        justDraggedRef.current = false
        return
      }
      if (index === focusRef.current && data[index]) {
        onSelectRef.current?.(index, data[index])
        return
      }
      setFocus(index, true)
    },
    [setFocus, data]
  )

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!autoplay || reducedRef.current || count < 2) return
    const root = rootRef.current
    let hovered = false
    let focused = false
    const stop = () => {
      if (autoTimerRef.current !== null) clearInterval(autoTimerRef.current)
      autoTimerRef.current = null
    }
    const start = () => {
      stop()
      autoTimerRef.current = window.setInterval(
        () => {
          if (!hovered && !focused && !dragRef.current) navigateBy(1)
        },
        Math.max(cfgRef.current.autoplayDelay, 600)
      )
    }
    const onEnter = () => {
      hovered = true
    }
    const onLeave = () => {
      hovered = false
    }
    const onFocusIn = () => {
      focused = true
    }
    const onFocusOut = () => {
      focused = false
    }
    root?.addEventListener('mouseenter', onEnter)
    root?.addEventListener('mouseleave', onLeave)
    root?.addEventListener('focusin', onFocusIn)
    root?.addEventListener('focusout', onFocusOut)
    start()
    return () => {
      stop()
      root?.removeEventListener('mouseenter', onEnter)
      root?.removeEventListener('mouseleave', onLeave)
      root?.removeEventListener('focusin', onFocusIn)
      root?.removeEventListener('focusout', onFocusOut)
    }
  }, [autoplay, autoplayDelay, count, navigateBy])

  useEffect(() => {
    updateScaleAndLayout()
  }, [
    updateScaleAndLayout,
    depth,
    spread,
    tilt,
    tiltDirection,
    perspective,
    visibleCards,
    falloff,
    blur,
    cardWidth,
    cardHeight,
    radius,
    centerStack,
    showControls,
    count,
  ])

  useEffect(
    () => () => {
      tweenRef.current?.kill()
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
      if (autoTimerRef.current !== null) clearInterval(autoTimerRef.current)
    },
    []
  )

  const rootStyle = {
    '--dc-perspective': `${perspective}px`,
  } as CSSProperties

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={rootStyle}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="depth-carousel__stage" ref={stageRef}>
        {data.map((item, i) => (
          <div
            key={`${item.image}-${i}`}
            className="depth-carousel__card"
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}${item.alt ? `: ${item.alt}` : ''}`}
            aria-hidden={active !== i}
            onClick={() => onCardClick(i)}
          >
            <img
              className="depth-carousel__img"
              ref={(el) => {
                imgRefs.current[i] = el
              }}
              src={item.image}
              alt={item.alt || ''}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
            <span
              className="depth-carousel__tint"
              ref={(el) => {
                overlayRefs.current[i] = el
              }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {showControls && count > 1 ? (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : null}

      {showIndicators && count > 1 ? (
        <div className="depth-carousel__dots" role="tablist" aria-label="Slides">
          {data.map((item, i) => (
            <button
              key={`${item.image}-dot-${i}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}${item.alt ? `: ${item.alt}` : ''}`}
              className={`depth-carousel__dot${active === i ? ' is-active' : ''}`}
              onClick={() => setFocus(i, true)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default DepthCarousel


