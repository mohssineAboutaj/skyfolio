import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let pluginRegistered = false

function ensurePlugin() {
  if (!import.meta.client || pluginRegistered) return
  gsap.registerPlugin(ScrollTrigger)
  pluginRegistered = true
}

function prefersReducedMotion() {
  if (!import.meta.client) return true
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function toolbarScrollStart() {
  const toolbarHeight =
    document.querySelector(".v-toolbar")?.clientHeight || 64
  return `top ${80 + Math.round((toolbarHeight / window.innerHeight) * 100)}%`
}

/** Resolve a Vue template ref or selector to a DOM Element. */
function resolveEl(
  target: Element | string | { $el?: unknown } | null | undefined,
): Element | null {
  if (!target) return null
  if (typeof target === "string") return document.querySelector(target)
  if (target instanceof Element) return target
  if (typeof target === "object" && "$el" in target) {
    const el = target.$el
    return el instanceof Element ? el : null
  }
  return null
}

export function useGsap() {
  ensurePlugin()

  const reducedMotion = prefersReducedMotion()
  let ctx: gsap.Context | null = null

  function run(fn: () => void) {
    if (!import.meta.client || reducedMotion) return
    ensurePlugin()
    if (!ctx) {
      ctx = gsap.context(() => {})
    }
    ctx.add(fn)
  }

  function getScrollStart() {
    return toolbarScrollStart()
  }

  /**
   * Fade + slight y reveal when a section enters the viewport.
   * Optionally staggers matching children instead of the section itself.
   */
  function revealSection(
    trigger: Element | string | { $el?: unknown } | null,
    options: {
      childSelector?: string
      y?: number
      duration?: number
      stagger?: number
    } = {},
  ) {
    if (!import.meta.client || reducedMotion || !trigger) return

    const {
      childSelector,
      y = 40,
      duration = 0.6,
      stagger = 0.08,
    } = options

    run(() => {
      const triggerEl = resolveEl(trigger)
      if (!triggerEl) return

      const targets = childSelector
        ? triggerEl.querySelectorAll(childSelector)
        : null

      if (targets && targets.length > 0) {
        gsap.set(targets, { opacity: 0, y })
        ScrollTrigger.create({
          trigger: triggerEl,
          start: getScrollStart(),
          once: true,
          onEnter: () => {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: "power2.out",
              overwrite: "auto",
            })
          },
        })
        return
      }

      gsap.set(triggerEl, { opacity: 0, y })
      gsap.to(triggerEl, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerEl,
          start: getScrollStart(),
          once: true,
        },
      })
    })
  }

  /**
   * Tweens a numeric display value from 0 to target when the trigger enters view.
   */
  function countUp(
    trigger: Element | string | { $el?: unknown } | null,
    target: number,
    onUpdate: (value: number) => void,
    options: { duration?: number } = {},
  ) {
    if (!import.meta.client) return

    const end = Math.max(0, Math.round(target || 0))

    if (reducedMotion) {
      onUpdate(end)
      return
    }

    if (!trigger) return

    const { duration = 1.2 } = options
    const proxy = { val: 0 }

    run(() => {
      const triggerEl = resolveEl(trigger)

      if (!triggerEl) {
        onUpdate(end)
        return
      }

      onUpdate(0)
      ScrollTrigger.create({
        trigger: triggerEl,
        start: getScrollStart(),
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            val: end,
            duration,
            ease: "power1.out",
            onUpdate: () => onUpdate(Math.round(proxy.val)),
          })
        },
      })
    })
  }

  /**
   * Hero entrance: name → job → socials → avatar, then pulsing chevron.
   */
  function playHeroEntrance(elements: {
    name?: unknown
    job?: unknown
    socials?: unknown
    avatar?: unknown
    chevron?: unknown
  }) {
    if (!import.meta.client) return

    const name = resolveEl(elements.name as Element | null)
    const job = resolveEl(elements.job as Element | null)
    const socials = resolveEl(elements.socials as Element | null)
    const avatar = resolveEl(elements.avatar as Element | null)
    const chevron = resolveEl(elements.chevron as Element | null)

    if (reducedMotion) return

    run(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

      if (name) {
        gsap.set(name, { opacity: 0, y: 24 })
        tl.to(name, { opacity: 1, y: 0, duration: 0.5 })
      }
      if (job) {
        gsap.set(job, { opacity: 0, y: 24 })
        tl.to(job, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
      }
      if (socials) {
        const items = socials.querySelectorAll("[data-hero-social]")
        if (items.length) {
          gsap.set(items, { opacity: 0, y: 16 })
          tl.to(
            items,
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 },
            "-=0.2",
          )
        }
      }
      if (avatar) {
        gsap.set(avatar, { opacity: 0, scale: 0.92 })
        tl.to(avatar, { opacity: 1, scale: 1, duration: 0.55 }, "-=0.35")
      }
      if (chevron) {
        gsap.set(chevron, { opacity: 0 })
        tl.to(chevron, { opacity: 1, duration: 0.35 }, "-=0.15")
        tl.add(() => {
          gsap.to(chevron, {
            y: -18,
            duration: 0.75,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          })
        })
      }
    })
  }

  /**
   * Animate skill progress values from 0 → score when the section enters view.
   */
  function animateScores(
    trigger: Element | string | { $el?: unknown } | null,
    scores: number[],
    onUpdate: (index: number, value: number) => void,
    options: { duration?: number; stagger?: number } = {},
  ) {
    if (!import.meta.client) return

    if (reducedMotion || !trigger) {
      scores.forEach((score, i) => onUpdate(i, score))
      return
    }

    const { duration = 0.8, stagger = 0.06 } = options

    run(() => {
      const triggerEl = resolveEl(trigger)

      if (!triggerEl) {
        scores.forEach((score, i) => onUpdate(i, score))
        return
      }

      scores.forEach((_, i) => onUpdate(i, 0))

      ScrollTrigger.create({
        trigger: triggerEl,
        start: getScrollStart(),
        once: true,
        onEnter: () => {
          scores.forEach((score, i) => {
            const proxy = { val: 0 }
            gsap.to(proxy, {
              val: score,
              duration,
              delay: i * stagger,
              ease: "power2.out",
              onUpdate: () => onUpdate(i, Math.round(proxy.val)),
            })
          })
        },
      })
    })
  }

  /**
   * Soft magnetic pull toward the cursor on hover (desktop).
   * Uses event delegation so dynamically mounted CTAs are covered.
   */
  function bindMagneticAll(
    root: Element | string | { $el?: unknown } | Document | null = document.body,
    selector = "[data-magnetic]",
  ) {
    if (!import.meta.client || reducedMotion) return () => {}

    const rootEl =
      root === document.body || root instanceof Document
        ? document.body
        : resolveEl(root as Element | string | { $el?: unknown } | null)

    if (!rootEl) return () => {}

    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return () => {}

    let active: Element | null = null

    const onMove = (event: Event) => {
      const e = event as MouseEvent
      const target = (e.target as Element | null)?.closest?.(selector)
      if (!target || !rootEl.contains(target)) {
        if (active) {
          gsap.to(active, {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: "elastic.out(1, 0.45)",
            overwrite: "auto",
          })
          active = null
        }
        return
      }

      active = target
      const rect = target.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(target, {
        x: x * 0.28,
        y: y * 0.28,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const onLeave = () => {
      if (!active) return
      gsap.to(active, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1, 0.45)",
        overwrite: "auto",
      })
      active = null
    }

    run(() => {
      rootEl.addEventListener("mousemove", onMove)
      rootEl.addEventListener("mouseleave", onLeave)
    })

    return () => {
      rootEl.removeEventListener("mousemove", onMove)
      rootEl.removeEventListener("mouseleave", onLeave)
      if (active) gsap.set(active, { clearProps: "transform" })
      active = null
    }
  }

  /** @deprecated use bindMagneticAll — kept for single-node cases */
  function bindMagnetic(
    target: Element | string | { $el?: unknown } | null,
    options: { strength?: number; duration?: number } = {},
  ) {
    if (!import.meta.client || reducedMotion) return () => {}

    const el = resolveEl(target)
    if (!el) return () => {}

    const { strength = 0.28, duration = 0.35 } = options
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return () => {}

    const onMove = (event: Event) => {
      const e = event as MouseEvent
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1, 0.45)",
        overwrite: "auto",
      })
    }

    run(() => {
      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      gsap.set(el, { clearProps: "transform" })
    }
  }

  /**
   * Pointer-follow spotlight inside a container (CSS variables --spot-x / --spot-y).
   */
  function bindSpotlight(
    container: Element | string | { $el?: unknown } | null,
  ) {
    if (!import.meta.client || reducedMotion) return () => {}

    const el = resolveEl(container)
    if (!el) return () => {}

    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return () => {}

    const onMove = (event: Event) => {
      const e = event as MouseEvent
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty("--spot-x", `${x}%`)
      el.style.setProperty("--spot-y", `${y}%`)
      el.style.setProperty("--spot-opacity", "1")
    }

    const onLeave = () => {
      el.style.setProperty("--spot-opacity", "0")
    }

    run(() => {
      el.classList.add("has-spotlight")
      el.style.setProperty("--spot-x", "70%")
      el.style.setProperty("--spot-y", "40%")
      el.style.setProperty("--spot-opacity", "0")
      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      el.classList.remove("has-spotlight")
    }
  }

  /**
   * Project card: clip-path image reveal on scroll + hover lift/scale.
   */
  function bindProjectCard(
    card: Element | string | { $el?: unknown } | null,
  ) {
    if (!import.meta.client) return () => {}

    const el = resolveEl(card)
    if (!el) return () => {}

    const media = el.querySelector("[data-project-media]") as HTMLElement | null
    const title = el.querySelector("[data-project-title]") as HTMLElement | null
    const img = el.querySelector(
      "[data-project-media] img, [data-project-media] .v-img__img",
    ) as HTMLElement | null

    if (reducedMotion) return () => {}

    let cleanHover = () => {}

    run(() => {
      if (media) {
        gsap.set(media, { clipPath: "inset(12% 12% 12% 12% round 12px)" })
        ScrollTrigger.create({
          trigger: el,
          start: getScrollStart(),
          once: true,
          onEnter: () => {
            gsap.to(media, {
              clipPath: "inset(0% 0% 0% 0% round 12px)",
              duration: 0.85,
              ease: "power3.out",
            })
            if (title) {
              gsap.fromTo(
                title,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, delay: 0.2, ease: "power2.out" },
              )
            }
          },
        })
      }

      const onEnter = () => {
        gsap.to(el, {
          y: -6,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        })
        const scaleTarget = img || media
        if (scaleTarget) {
          gsap.to(scaleTarget, {
            scale: 1.08,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          })
        }
      }

      const onLeave = () => {
        gsap.to(el, {
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        })
        const scaleTarget = img || media
        if (scaleTarget) {
          gsap.to(scaleTarget, {
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
          })
        }
      }

      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
      cleanHover = () => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      }
    })

    return cleanHover
  }

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

  return {
    gsap,
    ScrollTrigger,
    reducedMotion,
    revealSection,
    countUp,
    playHeroEntrance,
    animateScores,
    bindMagnetic,
    bindMagneticAll,
    bindSpotlight,
    bindProjectCard,
    getScrollStart,
    resolveEl,
  }
}
