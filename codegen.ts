import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  documents: './src/lib/api/graphql/**/*.gql',
  ignoreNoDocuments: true,
  generates: {
    'src/lib/api/graphql/types.ts': {
      plugins: ['typescript', 'fragment-matcher'],
      config: {
        constEnums: true,
        scalars: {
          HTML: {
            input: 'string',
            output: 'string'
          },
          Date: {
            input: 'string',
            output: 'string'
          },
          Upload: {
            input: 'unknown',
            output: 'unknown'
          }
        }
      }
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.ts',
        baseTypesPath: 'lib/api/graphql/types',
        folder: '_gen_'
      },
      plugins: ['typescript-operations', 'typescript-urql'],
      config: {
        withHooks: false,
        gqlImport: 'urql#gql',
        defaultScalarType: 'unknown'
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write']
  }
}

export default config
