const version = '0.1.0'
let serverUrl
// Cache IDs
let coreID = `core_${version}`
let pageID = `pages_${version}`
let imgID = `img_${version}`
let apiID = `api_${version}`
let cacheIDs = [coreID, pageID, imgID, apiID]

// Max number of files in cache
const limits = { pages: 35, imgs: 20 }

const coreAssets = []

const messages = {
  en: {
    buyAHouse: 'buy a house',
    changeMyJob: 'change my job',
    boostMyCareer: 'boost my career',
    looseWeight: 'loose weight',
    payLessTaxes: 'pay less taxes',
    makeNewFriends: 'make new friends',
    becomeAnExpert: 'become an expert',
    becomeAnAstronaut: 'become an astronaut',
    flyToTheMoon: 'fly to the moon',
    makeAWorldTour: 'make a world tour',
    liveWithoutWorking: 'live without working',
    findMyDreamjob: 'find my dreamjob',
    becomeAPilot: 'become a pilot',
    seeAnEclipse: 'see an eclipse',
    swimWithDolphins: 'swim with dolphins',
    becomeRich: 'become rich',
    fallInLove: 'fall in love',
    haveSex: 'have sex',
    becomeHandsome: 'become handsome',
    protectMyFamily: 'protect my family',
    liveAlone: 'live alone',
    findTheTruth: 'find the truth',
    becomeZeroWaste: 'become zero waste',
    buildMyOwnHouse: 'build my own house',
    seeNorthernLights: 'see northern lights',
    createACompany: 'create a company',
    expandMyNetwork: 'expand my network',
    getDrivingLicence: 'get a driving licence',
    getANewPassport: 'get a new passport',
    placeholder: 'what is your project?',
    projectTitlePrefix: 'The steps to',
    projectDescription1: 'This project is not available yet, we\'re working on it!',
    projectDescription2: 'Write down your email, and we\'ll let you know as soon as it is.',
    projectUnknownDescription1: 'We haven\'t identified this project, but we can work on it!',
    projectUnknownDescription2: 'Write down your email, and we\'ll let you know when it will become available.',
    projectSubmit: 'Let me know!',
    projectAcknowledge: 'Thank you!',
    goal1: 'You can do <em>anything</em>.',
    goal2: 'Just follow <span class="steps">the steps</span> to'
  }
}

const projects = [
  'getDrivingLicence',
  'haveSex',
  'liveAlone',
  'liveWithoutWorking',
  'looseWeight',
  'makeAWorldTour',
  'makeNewFriends',
  'payLessTaxes',
  'protectMyFamily',
  'seeAnEclipse',
  'seeNorthernLights',
  'swimWithDolphins',
  'becomeAPilot',
  'becomeAnAstronaut',
  'becomeAnExpert',
  'becomeHandsome',
  'becomeRich',
  'becomeZeroWaste',
  'boostMyCareer',
  'buildMyOwnHouse',
  'buyAHouse',
  'changeMyJob',
  'createACompany',
  'expandMyNetwork',
  'fallInLove',
  'findMyDreamjob',
  'findTheTruth',
  'flyToTheMoon',
  'getANewPassport'
]

/**
 * Remove cached items over a certain number.
 *
 * @param  {String}  key The cache key
 * @param  {number} max The max number of items allowed
 */
function trimCache (key, max) {
  caches.open(key)
    .then(cache => {
      cache.keys()
        .then(keys => {
          if (keys.length > max) {
            cache.delete(keys[0]).then(() => {
              trimCache(key, max)
            })
          }
        })
    })
}

/**
 * Check if cached API data is still valid.
 *
 * @param  {Object}  response The response object
 * @param  {Number}  goodFor  How long the response is good for, in milliseconds
 * @return {Boolean}          If true, cached data is valid
 */
function isValid (response, goodFor) {
  if (response) {
    const fetched = response.headers.get('sw-fetched-on')
    if (fetched && (parseFloat(fetched) + goodFor) > new Date().getTime()) {
      return true
    }
  }
  return false
}

self.addEventListener('install', event => {
  serverUrl = new URL(location).searchParams.get('serverUrl')
  // Activate immediately
  self.skipWaiting()
  // Cache core assets
  event
    .waitUntil(caches.open(coreID)
      .then(cache => {
        for (const asset of coreAssets) {
          cache.add(new Request(asset))
        }
        return cache
      }))
})

// On version update, remove old cached files
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => {
      // Get the keys of the caches to remove
      const keysToRemove = keys.filter(key => !cacheIDs.includes(key))
      // Delete each cache
      const removed = keysToRemove.map(key => caches.delete(key))
      return Promise.all(removed)
    })
    .then(() => self.clients.claim())
  )
})

// Listen for request events
self.addEventListener('fetch', event => {
  const request = event.request
  // Bug fix https://stackoverflow.com/a/49719964
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }
  const url = new URL(request.url)
  const headers = request.headers
  const acceptHeader = headers.get('Accept')
  // HTML files
  // Network-first
  if (acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Create a copy of the response and save it to the cache
          const copy = response.clone()
          event.waitUntil(caches.open(pageID).then(cache => cache.put(request, copy)))
          return response
        })
        .catch(e => {
          // If there's no item in cache, respond with a fallback
          return caches.match(request).then(response => response || caches.match('/offline.html'))
        })
    )
    return
  }
  // CSS & JavaScript
  // Offline-first
  if (acceptHeader.includes('text/javascript')) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
    )
    return
  }
  // Images & Fonts
  // Offline-first
  if (acceptHeader.includes('image') || url.pathname.includes('your-web-font')) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request)
          .then(response => {
            // If the request is for an image, save a copy of it in cache
            if (headers.get('Accept').includes('image')) {
              const copy = response.clone()
              event.waitUntil(caches.open(imgID).then(cache => cache.put(request, copy)))
            }
            return response
          })
        )
    )
    return
  }
  // API Calls
  // Offline-first
  if (url.href.startsWith(serverUrl) && request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          // If there's a cached API, and it's still valid, use it
          const cachedAPI = response
          if (isValid(response, 1000 * 60 * 60 * 2)) {
            return response
          }
          // Otherwise, make a fresh API call
          return fetch(request)
            .then(response => {
              // Create a copy of the response and save it to the cache
              const copy = response.clone()
              event
                .waitUntil(caches.open(apiID)
                  .then(cache => {
                    const headers = new Headers(copy.headers)
                    headers.append('sw-fetched-on', new Date().getTime())
                    return copy.blob().then(body => cache.put(
                        request,
                        new Response(body, {
                          status: copy.status,
                          statusText: copy.statusText,
                          headers: headers
                        })
                      )
                    )
                  })
                  .catch(e => {
                    if (cachedAPI) {
                      return cachedAPI
                    }
                    throw e
                  }))
              return response
            })
            .catch(e => {
              if (cachedAPI) {
                return cachedAPI
              }
              let payload
              const langs = headers.get('Accept-Language').split(',') || ['*']
              const locale = langs[0].substring(0, 2)
              const langMessage = messages[locale] || messages.en
              switch (url.pathname) {
                case '/lang':
                  payload = langMessage
                  break

                case '/project':
                  payload = projects.map(project => ({
                    key: project,
                    title: langMessage[project]
                  }))
                  break

                case '/user':
                  if (request.method === 'GET') {
                    const offset = new Date().getTimezoneOffset()
                    const user = {
                      locale: navigator.language.substring(0, 2),
                      languages: navigator.languages,
                      projects: []
                    }
                    const timeZone = 'UTC' + (offset < 0 ? '' : '+') + offset
                    payload = { timeZone, user }
                  }
                  break
              }
              if (payload) {
                return new Response(JSON.stringify(payload), {
                  status: 200,
                  statusText: 'OK'
                })
              }
              throw e
            })
        })
    )
  }
})
// Trim caches over a certain size
self.addEventListener('message', event => {
  // Make sure the event was from a trusted site
  // if (event.origin !== 'https://your-awesome-website.com') return;

  // Only run on cleanUp messages
  if (event.data !== 'cleanUp') {
    return
  }
  trimCache('pages', limits.pages)
  trimCache('img', limits.imgs)
})
