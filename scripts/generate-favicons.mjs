import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import sharp from "sharp"

const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url))
const source = await readFile(
  new URL("../public/favicon.svg", import.meta.url),
  "utf8",
)
const maskableSource = source.replace('rx="112"', 'rx="0"')

async function renderPng(svg, size, filename) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`${publicDirectory}${filename}`)
}

function createIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  const directory = Buffer.alloc(images.length * 16)
  let offset = header.length + directory.length

  images.forEach(({ data, size }, index) => {
    const entryOffset = index * 16
    directory.writeUInt8(size === 256 ? 0 : size, entryOffset)
    directory.writeUInt8(size === 256 ? 0 : size, entryOffset + 1)
    directory.writeUInt8(0, entryOffset + 2)
    directory.writeUInt8(0, entryOffset + 3)
    directory.writeUInt16LE(1, entryOffset + 4)
    directory.writeUInt16LE(32, entryOffset + 6)
    directory.writeUInt32LE(data.length, entryOffset + 8)
    directory.writeUInt32LE(offset, entryOffset + 12)
    offset += data.length
  })

  return Buffer.concat([header, directory, ...images.map(({ data }) => data)])
}

await Promise.all([
  renderPng(source, 96, "favicon-96x96.png"),
  renderPng(maskableSource, 180, "apple-touch-icon.png"),
  renderPng(maskableSource, 192, "web-app-manifest-192x192.png"),
  renderPng(maskableSource, 512, "web-app-manifest-512x512.png"),
])

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await sharp(Buffer.from(source)).resize(size, size).png().toBuffer(),
  })),
)

await writeFile(`${publicDirectory}favicon.ico`, createIco(icoImages))
