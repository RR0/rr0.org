export class SocialModule {
  constructor() {
    this.googleAnalytics()
  }

  private googleAnalytics() {
    let w = (<any>window)
    w._gaq = w._gaq || []
    var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js'
    w._gaq.push(['_require', 'inpage_linkid', pluginUrl])
    w._gaq.push(['_setAccount', 'UA-541415-1'])
    w._gaq.push(['_trackPageview']);
    (function () {
      var ga = document.createElement('script')
      ga.type = 'text/javascript'
      ga.async = true
      ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(ga, s)
    })()
  }
}

const social = new SocialModule()
export default social
