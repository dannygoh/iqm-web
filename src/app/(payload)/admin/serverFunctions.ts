'use server'
import config from '@payload-config'
import { handleServerFunctions } from '@payloadcms/next/layouts'

export const serverFn: typeof handleServerFunctions = async (args) =>
  handleServerFunctions({ ...args, config })
