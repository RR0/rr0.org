angular.module('rr0.social', [])

    .run(function () {
        "use strict";

        function googleAnalytics() {
            window._gaq = window._gaq || [];
            var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
            window._gaq.push(['_require', 'inpage_linkid', pluginUrl]);
            window._gaq.push(['_setAccount', 'UA-541415-1']);
            window._gaq.push(['_trackPageview']);
            (function () {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        }

        googleAnalytics();
    });