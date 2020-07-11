import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../../components/Seo'
import Layout from '../../components/Layout'
import Section from '../../components/core/Section'
import Image from '../../components/core/Image'
import TechnologyList from '../../components/content/technologiesList'
import formatDate from '../../components/utilities/format-date'
import PageTitle from '../../components/content/PageTitle'
import HeroImage from '../../components/content/hero/HeroImage'
import Intro from '../../components/content/Intro'
import RichArticle from '../../components/content/rich-article/RichArticle'

const pageTemplate = ({ data }) => {
  const {
    title,
    slug,
    projectType,
    richText,
    introHeading,
    introBody,
    postDate,
    technologyentries,
    heroImage,
    codeRepoUrl,
    siteUrl: liveProjectUrl,
    richArticle,
  } = data.craft.entries[0]
  // console.log('repo url ==', codeRepoUrl)
  // console.log('new site urlurl ==', liveProjectUrl)
  // console.log('entry data =', data.craft.entries[0])
  // console.log('rich article', richArticle)
  const { siteUrl } = data.site.siteMetadata
  const imageOptimizedHeroImage = heroImage[0].optimizedImagesFullWidth

  console.log('image hero --', imageOptimizedHeroImage)
  const currentProjectType =
    projectType === 'Demo Project' ? (
      projectType
    ) : (
      <div>
        Developed while working at{' '}
        <a className="underline" href="https://www.google.com" target="_blank">
          {projectType}
        </a>
      </div>
    )
  return (
    <Layout>
      {title && (
        <>
          <SEO title={title || ''} />
          <Section
            content={<PageTitle title={title} subtitle={currentProjectType} />}
            container
          />
        </>
      )}
      <div />
      {imageOptimizedHeroImage && (
        <Section
          content={<Image image={imageOptimizedHeroImage} />}
          container
        />
      )}
      {technologyentries && (
        <Section
          content={<TechnologyList currentList={technologyentries} />}
          container
        />
      )}
      <Section
        content={
          <Intro
            introHeading={introHeading}
            introBody={introBody}
            viewSiteLink={liveProjectUrl}
            viewCodeLink={codeRepoUrl}
          />
        }
        container
      />
      {richArticle && (
        <RichArticle richArticle={richArticle} siteUrl={siteUrl} />
      )}
    </Layout>
  )
}

export default pageTemplate

export const projectEntryQuery = graphql`
  query($id: [Craft_QueryArgument]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    craft {
      entries(id: $id) {
        id
        uid
        url
        slug
        postDate
        title
        ... on Craft_project_project_Entry {
          projectType(label: true)
          thumbnailDescription
          introHeading
          introBody
          richText
          codeRepoUrl
          siteUrl
          richArticle {
            ... on Craft_richArticle_text_BlockType {
              id
              typeHandle
              heading
              body
            }
            ... on Craft_richArticle_fullWidthImage_BlockType {
              id
              typeHandle
              constrainImage
              image(optimizedImagesFullWidth: "") {
                ... on Craft_images_Asset {
                  id
                  optimizedImagesFullWidth {
                    focalPoint
                    optimizedImageUrls
                    srcUrls
                    srcset
                  }
                  url
                }
              }
            }
          }

          technologyentries {
            id
            title
          }

          # heroImage(optimizedImagesFullWidth: "") {
          heroImage(optimizedImagesFullWidth: "") {
            url
            ... on Craft_images_Asset {
              id
              # optimizedImagesFullWidth {
              optimizedImagesFullWidth {
                colorPalette
                colorPaletteRgb
                focalPoint
                lightness
                maxSrcsetWidth
                optimizedImageUrls
                optimizedWebPImageUrls
                originalImageHeight
                originalImageWidth
                placeholder
                placeholderBox
                placeholderHeight
                placeholderImage
                placeholderSilhouette
                placeholderSvg
                placeholderWidth
                src
                srcUrls
                srcWebp
                srcset
                srcsetWebp
                variantHeights
                variantSourceWidths
              }
            }
          }
        }
      }
    }
  }
`
