import createNodeHelpers from './gatsby-node-helper.js'
import pipe from 'lodash/fp/pipe'
import partition from 'lodash/fp/partition'
import camelcase from 'lodash/fp/camelcase'
import fetchData from './fetch'

const { createNodeFactory } = createNodeHelpers({ typePrefix: `Prismic` , conflictFieldPrefix : ``})

//const DocumentNode = createNodeFactory(`Document`)

export const sourceNodes = async (
  { boundActionCreators: { createNode } },
  { repositoryName, accessToken }
) => {
  const { documents } = await fetchData({ repositoryName, accessToken })

  documents.forEach(v => {
    console.log(v);
    pipe(createNodeFactory(camelcase(v.type)), createNode)(v)  
  })
}
