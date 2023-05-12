import defaultRegistry from '@rea-scripts/registry-default'

enum ContainerType {
  Project = 'project',
  Component = 'component',
}

export function getRegistry(type: ContainerType) {
  if (!type) {
    return defaultRegistry
  }

  try {
    const typeRegistry = require(`@rea-scripts/registry-${type}`)
    return [defaultRegistry, typeRegistry]
  } catch (error) {
    return defaultRegistry
  }
}
