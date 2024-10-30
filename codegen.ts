import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  // documents: './src/**/*.gql',
  documents: './src/lib/api/graphql/**/*.gql',
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript', 'fragment-matcher'],
      config: {
        constEnums: true
      }
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.ts',
        baseTypesPath: 'graphql/types.ts',
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
