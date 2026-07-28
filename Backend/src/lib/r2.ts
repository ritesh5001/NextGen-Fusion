import { AwsClient } from 'aws4fetch'

// Cloudflare R2 is S3-compatible. We generate short-lived presigned GET URLs so
// buyers download the product zip directly from R2 (no GBs streamed through the
// backend), while our own /store/download endpoint enforces the entitlement.

type R2Config = {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  endpoint: string
}

function getR2Config(): R2Config | null {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET
  if (!accessKeyId || !secretAccessKey || !bucket) return null
  // Endpoint can be given directly, or derived from the account id.
  const endpoint =
    process.env.R2_ENDPOINT ||
    (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : '')
  if (!endpoint) return null
  return { accessKeyId, secretAccessKey, bucket, endpoint: endpoint.replace(/\/+$/, '') }
}

export function isR2Configured(): boolean {
  return getR2Config() !== null
}

// Presigned GET URL for a private object, valid for `expiresSeconds`.
export async function presignR2Download(
  key: string,
  expiresSeconds = 900,
  downloadFilename?: string,
): Promise<string | null> {
  const cfg = getR2Config()
  if (!cfg) return null

  const client = new AwsClient({
    accessKeyId: cfg.accessKeyId,
    secretAccessKey: cfg.secretAccessKey,
    region: 'auto',
    service: 's3',
  })

  // Encode each path segment but keep the slashes.
  const encodedKey = key.split('/').map(encodeURIComponent).join('/')
  const params = new URLSearchParams({ 'X-Amz-Expires': String(expiresSeconds) })
  if (downloadFilename) {
    params.set('response-content-disposition', `attachment; filename="${downloadFilename}"`)
  }
  const url = `${cfg.endpoint}/${cfg.bucket}/${encodedKey}?${params.toString()}`

  const signed = await client.sign(url, { method: 'GET', aws: { signQuery: true } })
  return signed.url
}
