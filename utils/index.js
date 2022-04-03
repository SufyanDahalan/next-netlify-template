import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'content/posts')
const navLinksDirectory = join(process.cwd(), 'content/navlinks')//join(process.cwd(), 'content/navlinks')

export const getPostSlugs = ()=> {
  return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = (slug, fields )  => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export const getAllPosts = (fields) => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}


export const getLinkSlugs = ()=> {
    let links = {}
    try {
        links = fs.readdirSync(navLinksDirectory)
    } catch (Err) {
        return links
    }
    return links;
}

export const getLinkBySlug = (slug )  => {
  const fullPath = join(navLinksDirectory, `${slug}`)
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
}

export const getAllLinks = () => {
  const slugs = getLinkSlugs()
  const Links = []
  for (let i = 0; i < slugs.length; i++) {
      console.log(getLinkBySlug(slugs[i]))
      Links.push(getLinkBySlug(slugs[i]));
  }
  return Links
}