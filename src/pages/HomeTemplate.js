import React, { useRef, useEffect, useState } from 'react'
import Section from '../components/core/Section'
import HeroNew from '../components/content/hero/HeroNew'
import Image from '../components/core/Image'
import RichArticle from '../components/content/rich-article/RichArticle'
import IntroOverlay from '../components/core/IntroOverlay'
import { gsap } from 'gsap'
import SEO from '../components/Seo'
// set gsap timeline defaults
const tl = gsap.timeline({
  defaults: { duration: 1, ease: 'expo.inOut' },
})

const introOverlayAnimation = (
  leftSection,
  rightSection,
  completeAnimation
) => {
  tl.to(leftSection.children, 1, {
    scaleY: 0,
    stagger: 0.3,
    transformOrigin: 'bottom left',
  })
  tl.to(rightSection, {
    scaleX: 0,
    transformOrigin: 'bottom right',
    onComplete: completeAnimation,
  })
}

const HomeTemplate = (data) => {
  // console.log('TRANSITION STATUS IS', data.transitionStatus)
  const { entry, siteUrl, richArticle, globalSets } = data.pageContext
  const [fallbacks, socialLinks] = globalSets
  // console.log('global sets in the homepage are', globalSets)
  const { seoMeta } = entry
  const [animationComplete, setAnimationComplete] = useState(false)
  const introOverlayLeftSectionEl = useRef(null)
  const introOverlayRightSectionEl = useRef(null)
  // console.log('homepage data --', data)
  // console.log('global sets --', globalSets)
  // console.log('seoMeta ==', seoMeta)

  const completeAnimation = () => {
    setAnimationComplete(true)
  }

  useEffect(() => {
    // create and start intro overlay animation timeline
    introOverlayAnimation(
      introOverlayLeftSectionEl.current,
      introOverlayRightSectionEl.current,
      completeAnimation
    )
  }, [])
  console.log('seo meta --', seoMeta)
  console.log('home globalSets --', globalSets)

  return (
    <>
      <SEO
        title={seoMeta.title || title}
        description={seoMeta.description}
        socialMeta={seoMeta.social}
        fallbackImage={fallbacks.fallbackImage}
        twitterHandle={socialLinks.twitterUsername}
      />

      {entry && <SEO title={entry.title} />}
      {animationComplete === false ? (
        <IntroOverlay
          leftSection={introOverlayLeftSectionEl}
          rightSection={introOverlayRightSectionEl}
        />
      ) : (
        ''
      )}

      {entry && (
        <HeroNew
          classes="c-hero--dark-bg c-hero--animated-bg"
          heroContent={{
            heroTextBody: entry.heroTextBody,
            primaryButton: {
              text: entry.ctaButton1Text,
              url: entry.ctaButton1Link,
            },
            secondaryButton: {
              text: entry.ctaButton2Text,
              url: entry.ctaButton2Link,
            },
          }}
        />
      )}
      {richArticle && (
        <RichArticle richArticle={richArticle} isHomepage={true} />
      )}
    </>
  )
}

export default HomeTemplate
