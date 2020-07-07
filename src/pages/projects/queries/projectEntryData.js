// import { graphql, useStaticQuery } from 'gatsby'

const projectEntryData = graphql`
  query($id: [Craft_QueryArgument]) {
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
          introHeading
          introBody
          richText

          technologyentries {
            id
            title
          }

          heroImage(optimisedImagesHero: "") {
            url
            ... on Craft_images_Asset {
              id
              optimisedImagesHero {
                focalPoint
                placeholderBox
                placeholderImage
                srcset
                srcUrls
              }
            }
          }
        }
      }
    }
  }
`

export default projectEntryData
