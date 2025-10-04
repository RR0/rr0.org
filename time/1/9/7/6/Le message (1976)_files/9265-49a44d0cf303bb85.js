"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9265],{12088:function(e,t,i){i.d(t,{C:function(){return y},Z:function(){return v}});var a=i(52322),r=i(30382),n=i.n(r);i(2784);var o=i(53665),s=i(23906),l=i(52154),d=i(24062),c=i(19596),m=i(86704);let u=`
    position: absolute;
    left: 50%;
    user-select: none;
    max-height: 100%;
    max-width: 100%;

    /* hide left/right image affordance when not on a touch device */
    ${m.mediaQueries.devices.onCursorScreens} {
        &.peek { display: none; }
    }
`,g=`
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
`,f=`
    top: 40%;
    transform: translate(-50%, -40%);
`,p=`
    top: 20%;
    transform: translate(-50%, -20%);
`,h=c.default.img.withConfig({componentId:"sc-b66608db-0"})([""," ",""],u,f),b=c.default.img.withConfig({componentId:"sc-b66608db-1"})([""," ",""],u,p),x=c.default.div.withConfig({componentId:"sc-b66608db-2"})([""," ",""],g,f),I=c.default.div.withConfig({componentId:"sc-b66608db-3"})([""," ",""],g,p),w=n()`
    fragment MediaViewerImageMeta on Image {
        id
        url
        height
        width
        caption {
            plainText
        }
    }
`;function $(e,t){return e>t?{ImageElement:h,ContainerElement:x}:{ImageElement:b,ContainerElement:I}}let y=e=>{let{image:t,offset:i,prevImage:r,nextImage:n}=e,c=(0,o.Z)(),m=(0,s.wL)("MediaViewer_Image");if(!t||!t.url||!t.height||!t.width)return m.error("mediaviewer image missing required metadata",{id:t.id}),(0,a.jsx)(I,{className:"image-metadata-failure",children:(0,a.jsx)(d.F,{})});let u=$(t.height,t.width),g=u.ImageElement,f=u.ContainerElement,p=$(r?.height??0,r?.width??0),h=p.ImageElement,b=p.ContainerElement,x=$(n?.height??0,n?.width??0),w=x.ImageElement,y=x.ContainerElement,v=c.formatMessage({id:"mediaViewerImage_alt_missingCaption",defaultMessage:"Photo is missing caption."}),T=i||0;return(0,a.jsxs)(a.Fragment,{children:[!!r&&!!r.url&&(0,a.jsx)(b,{style:{maxHeight:`${r&&r.height||t.height}px`,maxWidth:`${r&&r.width||t.width}px`,left:`calc(-60% + ${T}px)`},children:(0,a.jsx)(h,{className:"peek",src:r.url,sizes:"100vw",srcSet:(0,l.gA)(r,!0),"data-image-id":`${r.id}-prev`,alt:r.caption?.plainText||v})}),(0,a.jsx)(f,{style:{maxHeight:`${t.height}px`,maxWidth:`${t.width}px`,left:`calc(50% + ${T}px)`},children:(0,a.jsx)(g,{src:t.url,sizes:"100vw",srcSet:(0,l.gA)(t,!0),"data-image-id":`${t.id}-curr`,alt:t.caption?.plainText||v})}),!!n&&!!n.url&&(0,a.jsx)(y,{style:{maxHeight:`${n&&n.height||t.height}px`,maxWidth:`${n&&n.width||t.width}px`,left:`calc(160% + ${T}px)`},children:(0,a.jsx)(w,{className:"peek",src:n.url,sizes:"100vw",srcSet:(0,l.gA)(n,!0),"data-image-id":`${n.id}-prev`,alt:n.caption?.plainText||v})})]})};y.fragments={image:w};var v=y},13012:function(e,t,i){i.d(t,{V:function(){return eo}});var a=i(52322),r=i(67353),n=i(72779),o=i.n(n);i(2784);var s=i(88169),l=i(75824),d=i(47069);function c(e){let{attributionUrl:t,text:i}=e,a=i||t;return t&&a?`<a href="${t}" target="_blank" rel="noopener nofollow">${a}</a>`:a?`${a}`:void 0}var m=i(30382),u=i.n(m),g=i(39366);let f={PARENT:"media-sheet",ATTR_BANNER:"media-sheet__attr-banner",COUNT_DISPLAY:"media-sheet__count-display"},p=u()`
    fragment MediaSheetImageMeta on Image {
        copyright
        createdBy
        caption {
            plaidHtml(queryParams: $queryParams)
        }
        titles {
            id
            titleText {
                text
            }
        }
        source {
            attributionUrl
            text
            banner {
                url
                attributionUrl
            }
        }
        names {
            id
            nameText {
                text
            }
        }
        countries {
            text
        }
        languages {
            text
        }
        # On mobile, we need to refetch correctionLink and reportingLink
        # data with isInIframe: false.
        #
        # This refetching is handled by the ContributeActionButton component.
        correctionLink(
            relatedId: $id
            contributionContext: {
                isInIframe: true
                returnUrl: "${(0,g.Pj)()}"
                business: "consumer"
            }
        ) {
            url
        }
        reportingLink(
            relatedId: $id
            contributionContext: {
                isInIframe: true
                returnUrl: "${(0,g.Pj)()}"
                business: "consumer"
            }
        ) {
            url
        }
    }
`,h=u()`
    fragment MediaSheetListItemMeta on ListItemNode {
        description {
            originalText {
                plaidHtml(queryParams: $queryParams)
            }
        }
    }
`,b={id:"common_buttons_close",defaultMessage:"Close"},x={id:"common_buttons_open",defaultMessage:"Open"},I={id:"mediaSheet_ariaLabel_edit",defaultMessage:"Edit tags"},w={id:"mediaSheet_ariaLabel_report",defaultMessage:"Report image"},$={id:"mediaSheet_label_name",defaultMessage:"People"},y={id:"mediaSheet_label_title",defaultMessage:"Titles"},v={id:"mediaSheet_label_country",defaultMessage:"Countries"},T={id:"mediaSheet_label_language",defaultMessage:"Languages"},C={id:"mediaSheet_attribution_photoBy",defaultMessage:"Photo by"},_={id:"mediaSheet_attribution_courtesy",defaultMessage:"Image courtesy"};var M=i(26806),E=i(41174),L=i(30634),j=i(11438),A=i(19596),k=i(86704);let S=(0,A.default)(s.IconButton).withConfig({componentId:"sc-e7f4329a-0"})(["","{margin-right:calc(var(--ipt-pageMargin) - 0.75rem);}"],k.mediaQueries.breakpoints.above.l);var P=e=>{let{name:t,label:i,className:r,isButton:n,onSelect:o,href:s}=e,l={name:t,label:i,className:r,onSelect:o,"data-testid":`mv-contrib-${t}`};return(0,a.jsx)(S,{...l,href:n?void 0:s})},N=e=>{let{actionName:t,className:i,flow:r,label:n,query:o}=e,l=(0,M.m8)(),d=(0,E.nu)(),{makeRefMarker:c}=(0,j.Lz)(),m=(0,s.useBreakpointsAsConfig)();if(!r)return null;let g=`${r.desktopLink}&ref_=${c(j.Cd.EDIT)}`,f=m.l||m.xl;return(0,a.jsx)(P,{name:t,label:n,className:i??"",onSelect:e=>{f?d?r.desktopOnOpen():(0,L.rf)(c(j.Cd.SIGN_IN)):(e.preventDefault(),l.query(u()`
                        query ContributeActionButton(
                            $imageId: ID!
                            $relatedId: ID!
                            $returnUrl: URL!
                        ) {
                            image(id: $imageId) {
                                correctionLink(
                                    relatedId: $relatedId
                                    contributionContext: {
                                        isInIframe: false
                                        returnUrl: $returnUrl
                                        business: "consumer"
                                    }
                                ) {
                                    url
                                }
                                reportingLink(
                                    relatedId: $relatedId
                                    contributionContext: {
                                        isInIframe: false
                                        returnUrl: $returnUrl
                                        business: "consumer"
                                    }
                                ) {
                                    url
                                }
                            }
                        }
                    `,{...o,returnUrl:window.location.href}).toPromise().then(e=>{let t=r.resolveMobileURL(e.data.image);window.open(t,"_self")}).catch(e=>{throw e}))},href:g,isButton:f})};let R=A.default.div.withConfig({componentId:"sc-3d8c6ae9-0"})(["position:absolute;bottom:0;width:100%;max-height:calc(53% - 1.5rem);display:flex;z-index:2;","{max-height:calc(50%);}"],k.mediaQueries.devices.onTouchScreens),V=(0,A.default)(s.PageContentContainer).withConfig({componentId:"sc-3d8c6ae9-1"})(["position:relative;display:flex;width:100%;"]),B=A.default.div.withConfig({componentId:"sc-3d8c6ae9-2"})([""," "," background:rgba(",",0.85);background:rgba(",",0.85);border-top:1px solid ",";border-top:1px solid ",";width:100%;display:flex;flex-direction:column;overflow:auto;transition:all 0.5s ease-out ","{height:100%;overflow:hidden;}"],(0,k.setTypographyType)("body"),(0,k.setPropertyToColorVar)("color","ipt-on-baseAlt-color"),(0,k.getColorVarValue)("ipt-baseAlt-shade3-rgb"),(0,k.getColorVar)("ipt-baseAlt-shade3-rgb"),(0,k.getColorVarValue)("ipt-baseAlt-border-color"),(0,k.getColorVar)("ipt-baseAlt-border-color"),k.mediaQueries.breakpoints.above.l),D=A.default.div.withConfig({componentId:"sc-3d8c6ae9-3"})([""," "," display:flex;justify-content:space-between;padding:0.5rem 1rem;padding:0.5rem ",";flex-shrink:0;"],(0,k.setTypographyType)("bodySmall"),(0,k.setPropertyToColorVar)("color","ipt-on-baseAlt-accent1-color"),(0,k.getSpacingVar)("ipt-pageMargin")),O=A.default.span.withConfig({componentId:"sc-3d8c6ae9-4"})(["display:none;","{display:flex;}"],k.mediaQueries.breakpoints.only.m),Y=`
    position: relative;
    &::after {
        content: '';
        background: linear-gradient(
            to top,
            ${(0,k.getColorVarValue)("ipt-baseAlt-shade3-color")},
            transparent
        );
        background: linear-gradient(
            to top,
            ${(0,k.getColorVar)("ipt-baseAlt-shade3-color")},
            transparent
        );
        height: 1rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
`,U=A.default.div.withConfig({componentId:"sc-3d8c6ae9-5"})(["display:flex;flex-direction:column;","{height:100%;}"],k.mediaQueries.breakpoints.above.l),Q=A.default.div.withConfig({componentId:"sc-3d8c6ae9-6"})(["display:flex;flex-direction:column;overflow:auto;flex-grow:2;","{flex-direction:row;overflow:hidden;","}"],k.mediaQueries.breakpoints.above.l,Y),q=A.default.div.withConfig({componentId:"sc-3d8c6ae9-7"})(["width:100%;text-align:center;padding:0 1rem 0.5rem 1rem;padding:0 "," 0.5rem ",";","{","}"],(0,k.getSpacingVar)("ipt-pageMargin"),(0,k.getSpacingVar)("ipt-pageMargin"),k.mediaQueries.breakpoints.above.l,(0,k.setPropertyToColorVar)("background","ipt-baseAlt-shade3-bg")),G=(0,A.default)(s.HTMLContent).withConfig({componentId:"sc-3d8c6ae9-8"})(["padding:0 1rem 1rem;padding:0 "," 1rem;","{overflow:auto;flex-grow:1;width:60%;padding-right:1rem;height:100%;}"],(0,k.getSpacingVar)("ipt-pageMargin"),k.mediaQueries.breakpoints.above.l),H=A.default.div.withConfig({componentId:"sc-3d8c6ae9-9"})([""," margin:0 1rem;margin:0 ",";min-height:1px;min-width:1px;","{margin:0 0 1rem 0;}"],(0,k.setPropertyToColorVar)("background","ipt-baseAlt-border-color"),(0,k.getSpacingVar)("ipt-pageMargin"),k.mediaQueries.breakpoints.above.l),z=A.default.div.withConfig({componentId:"sc-3d8c6ae9-10"})(["margin:0 1rem;margin:0 ",";padding-top:1rem;","{margin:0;padding:0 0.25rem 1rem 1rem;width:35%;overflow:auto;height:100%;}"],(0,k.getSpacingVar)("ipt-pageMargin"),k.mediaQueries.breakpoints.above.l),F=A.default.div.withConfig({componentId:"sc-3d8c6ae9-11"})(["display:flex;justify-content:center;padding:0.5rem 0;","{margin-top:-0.5rem;justify-content:flex-start;flex-shrink:1;flex-direction:column;padding-top:0;}"],k.mediaQueries.breakpoints.above.l),W=`
    display: none;
    position: absolute;
    right: 4.5rem;
    ${k.mediaQueries.breakpoints.above.l} {
        display: block;
    }
`,X=(0,A.default)(s.IconBorderButton).withConfig({componentId:"sc-3d8c6ae9-12"})([""," top:-1.125rem;z-index:1;transition:opacity 0.5s ease-in;opacity:",";visibility:",";"],W,e=>e.opacity,e=>e.visibility),K=(0,A.default)(s.IconBorderButton).withConfig({componentId:"sc-3d8c6ae9-13"})([""," bottom:4rem;transition:opacity 0.5s ease-in;opacity:",";visibility:",";"],W,e=>e.opacity,e=>e.visibility),Z=A.default.div.withConfig({componentId:"sc-3d8c6ae9-14"})(["margin-bottom:0.25rem;",""],(0,k.setTypographyType)("bodySmall")),J=A.default.span.withConfig({componentId:"sc-3d8c6ae9-15"})(["margin-right:0.5rem;font-weight:500;"]),ee=(0,A.default)(s.HTMLContent).withConfig({componentId:"sc-3d8c6ae9-16"})([""," ",""],(0,k.setPropertyToColorVar)("color","ipt-on-baseAlt-textSecondary-color"),(0,k.setTypographyType)("copyright")),et=A.default.img.withConfig({componentId:"sc-3d8c6ae9-17"})(["max-width:100%;"]);var ei=i(66724),ea=i(87801);let er=e=>{let{array:t,title:i}=e,{nameMainLinkBuilder:r,titleMainLinkBuilder:n}=(0,ei.WOb)(),o=[];for(let e=0;e<t.length;e++){let i=t[e];i.nameText?.text&&i.id?o.push((0,a.jsx)(s.TextLink,{href:r({nconst:i.id,refSuffix:ea.C.SEE_MORE}),text:i.nameText.text},`image-name-link-${i.id}`)):i.titleText?.text&&i.id?o.push((0,a.jsx)(s.TextLink,{href:n({tconst:i.id,refSuffix:ea.C.SEE_MORE}),text:i.titleText.text},`image-title-link-${i.id}`)):i.text&&o.push((0,a.jsx)("span",{children:i.text},`item-meta-${i.text}`)),e<t.length-1&&o.push(", ")}return(0,a.jsx)(a.Fragment,{children:o.length>0&&(0,a.jsxs)(Z,{children:[(0,a.jsx)(J,{children:i}),(0,a.jsx)("span",{children:o})]})})},en=(e,t)=>{(0,r.isEnterOrSpaceKey)(e)&&t()},eo=e=>{let t={closeSheetAriaLabel:(0,l.N)(b),openSheetAriaLabel:(0,l.N)(x),editAriaLabel:(0,l.N)(I),reportAriaLabel:(0,l.N)(w),nameLabel:(0,l.N)($),titleLabel:(0,l.N)(y),countryLabel:(0,l.N)(v),languageLabel:(0,l.N)(T),photoByAttributionPrefix:(0,l.N)(C),courtesyAttributionPrefix:(0,l.N)(_)},{content:i,imageData:r,editFlow:n,reportFlow:m,isClosed:u,onCloseClicked:g,onOpenClicked:p}=e,h=u?0:1,M=u?"hidden":"visible",E=function(e,t){let{copyright:i,createdBy:a,source:r}=e;if(!i&&!a&&!r)return;let n=r&&c(r)?`${t.courtesyText} ${c(r)}`:void 0,o=[a?`${t.photoByText} ${a}`:void 0,i?`&copy;&nbsp;${i}`:void 0,n].filter(e=>!!e);return o.length?o.join(" - "):void 0}(r,{photoByText:t.photoByAttributionPrefix,courtesyText:t.courtesyAttributionPrefix}),L=()=>{r?.source?.text==="gettyimages.com"?(0,d.P)("offsite-gettyimages"):r?.source?.text==="mptvimages.com"&&(0,d.P)("offsite-mptvimages")};return(0,a.jsx)(R,{className:o()(e.className),children:(0,a.jsx)(s.SetPalette,{palette:"dark",children:(0,a.jsxs)(V,{children:[(0,a.jsx)(K,{name:"info",className:"media-sheet__open",label:t.openSheetAriaLabel,onSelect:p,opacity:u?1:0,visibility:u?"visible":"hidden"}),(0,a.jsx)(X,{label:t.closeSheetAriaLabel,className:"media-sheet__close",name:"clear",onSelect:g,opacity:h,visibility:M}),(0,a.jsx)(B,{"aria-hidden":u,style:{opacity:h,visibility:M},"data-testid":f.PARENT,children:(0,a.jsxs)(U,{children:[(0,a.jsxs)(D,{role:"presentation",children:[(0,a.jsx)("span",{children:i.contextTitle}),(0,a.jsx)(O,{"data-testid":f.COUNT_DISPLAY,children:i.contextCount})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(G,{html:r.caption?.plaidHtml||""}),(0,a.jsx)(H,{}),(0,a.jsxs)(z,{children:[!!r.names&&(0,a.jsx)(er,{array:r.names,title:t.nameLabel}),!!r.titles&&(0,a.jsx)(er,{array:r.titles,title:t.titleLabel}),!!r.countries&&(0,a.jsx)(er,{array:r.countries,title:t.countryLabel}),!!r.languages&&(0,a.jsx)(er,{array:r.languages,title:t.languageLabel}),!!E&&(0,a.jsx)("div",{onClick:L,onKeyDown:e=>{en(e,L)},"data-testid":"copyright",children:(0,a.jsx)(ee,{html:E})})]}),(0,a.jsxs)(F,{children:[(0,a.jsx)(N,{flow:n,actionName:"edit",label:t.editAriaLabel,className:"media-sheet__edit",query:{imageId:e.imageData.id,relatedId:e.listId}}),(0,a.jsx)(N,{flow:m,label:t.reportAriaLabel,className:"media-sheet__report",actionName:"flag",query:{imageId:e.imageData.id,relatedId:e.listId}})]})]}),!!r.source?.banner&&(0,a.jsx)(q,{"data-testid":f.ATTR_BANNER,children:(0,a.jsx)("a",{href:r.source.banner.attributionUrl,rel:"nofollow noopener noreferrer",target:"_blank",children:(0,a.jsx)(et,{src:r.source.banner.url,height:r.source.banner.height,width:r.source.banner.width})})})]})})]})})})};eo.fragments={image:p,listItem:h}},9325:function(e,t,i){i.d(t,{$C:function(){return T},Ek:function(){return w},HP:function(){return x},KL:function(){return v},Qn:function(){return $},gG:function(){return b},k6:function(){return y},kH:function(){return I},s:function(){return p},ve:function(){return h},wO:function(){return C}});var a=i(30382),r=i.n(a),n=i(12088),o=i(13012),s=i(11438),l=i(85970);let d=r()`
    fragment MediaViewerMeta on ImageConnection {
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
        edges {
            position
            cursor
            node {
                ...MediaViewerImageMeta
                ...MediaSheetImageMeta
            }
        }
    }

    ${n.C.fragments.image}
    ${o.V.fragments.image}
`,c=r()`
    fragment MediaViewerListMeta on ListConnection {
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
        edges {
            position
            cursor
            node {
                item {
                    ...MediaViewerImageMeta
                    ...MediaSheetImageMeta
                }
                ...MediaSheetListItemMeta
            }
        }
    }
    ${n.C.fragments.image}
    ${o.V.fragments.image}
    ${o.V.fragments.listItem}
`,m=r()`
    query NameImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        name(id: $id) {
            nameText {
                text
            }
            meta {
                publicationStatus
            }
            images(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
            wrapFront: images(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerMeta
            }
            wrapBack: images(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
        }
    }
    ${d}
`,u=r()`
    query TitleImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        title(id: $id) {
            titleText {
                text
            }
            meta {
                publicationStatus
            }
            releaseYear {
                year
            }
            images(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
            wrapFront: images(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerMeta
            }
            wrapBack: images(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
        }
    }
    ${d}
`,g=r()`
    query GalleryImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        imageGallery(id: $id) {
            galleryText
            images(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
            wrapFront: images(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerMeta
            }
            wrapBack: images(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerMeta
            }
        }
    }
    ${d}
`,f=r()`
    query ListImages(
        $id: ID!
        $before: ID
        $after: ID
        $jumpTo: ID
        $first: Int
        $last: Int
        $lastYes: Boolean!
        $firstYes: Boolean!
        $queryParams: String
    ) {
        list(id: $id) {
            name {
                originalText
            }
            items(first: $first, after: $after, jumpTo: $jumpTo)
                @include(if: $firstYes) {
                total
                ...MediaViewerListMeta
            }
            wrapFront: items(last: $last, before: $before)
                @include(if: $lastYes) {
                total
                ...MediaViewerListMeta
            }
            wrapBack: items(first: $first) @include(if: $firstYes) {
                total
                ...MediaViewerListMeta
            }
        }
    }
    ${c}
`,p=e=>{switch(e){case l.b.GALLERY:return g;case l.b.LIST:return f;case l.b.NAME:return m;case l.b.TITLE:return u;default:throw Error("Unknown MediaViewerType: "+e)}},h=3,b=6,x=3,I=20,w="vanity",$={title:"title",name:"name",gallery:"imageGallery",list:"list"},y={right:s.Cd.NEXT,left:s.Cd.PREVIOUS},v={countLabel:{id:"mediaViewer_galleryCount_label",defaultMessage:"{position} of {total}"},previousImageLabel:{id:"mediaSheet_ariaLabel_previousImage",defaultMessage:"Previous"},nextImageLabel:{id:"mediaSheet_ariaLabel_nextImage",defaultMessage:"Next"},closePromptLabel:{id:"common_ariaLabel_closePrompt",defaultMessage:"Close Prompt"}},T={PARENT:"media-viewer",ACTION_BAR:"media-viewer__action-bar",ACTION_BAR_GALLERY_COUNT:"action-bar__gallery-count",MEDIA_SHEET:"media-viewer__media-sheet",PAGE_RIGHT:"media-viewer__page-right",PAGE_LEFT:"media-viewer__page-left",LOADER:"media-viewer__loader",IMAGE:"media-viewer__image",TOUCH_HANDLER:"media-viewer__touch-handler",CONTRIBUTE_EDIT_DRAWER:"contribute-edit-drawer",CONTRIBUTE_EDIT_IFRAME:"contribute-edit-iframe",CONTRIBUTE_REPORT_DRAWER:"contribute-report-drawer",CONTRIBUTE_REPORT_IFRAME:"contribute-report-iframe",PAGER_VISIBLE:"ipc-pager--visible"},C="pager-aria-live-region"},49265:function(e,t,i){i.d(t,{Bc:function(){return x},C1:function(){return I},D5:function(){return h},GX:function(){return p},Ov:function(){return f},ed:function(){return u},f$:function(){return m},vI:function(){return w},zL:function(){return b},zb:function(){return c}});var a=i(19596),r=i(88169),n=i(86704),o=i(24062),s=i(9325);let l=()=>`
    top: calc(47% - 4vh);
    transform: translateY(-47%);
`,d=`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
`,c=a.default.div.withConfig({componentId:"sc-1c12727-0"})(["overflow:hidden;position:relative;:focus{outline:0;}.",",.","{display:none;}","{height:calc(100vh - 5rem);.",",.","{display:block;}}height:calc(100vh - 7rem);"],s.$C.CONTRIBUTE_EDIT_DRAWER,s.$C.CONTRIBUTE_REPORT_DRAWER,n.mediaQueries.breakpoints.above.m,s.$C.CONTRIBUTE_EDIT_DRAWER,s.$C.CONTRIBUTE_REPORT_DRAWER),m=(0,a.default)(r.Pager).withConfig({componentId:"sc-1c12727-1"})(["","{left:0.25rem;}","{","}",""],n.mediaQueries.breakpoints.below.xs,n.mediaQueries.breakpoints.above.xs,(0,n.setPropertyToSpacingVar)("left","ipt-pageMargin"),l),u=(0,a.default)(r.Pager).withConfig({componentId:"sc-1c12727-2"})(["","{right:0.25rem;}","{","}",""],n.mediaQueries.breakpoints.below.xs,n.mediaQueries.breakpoints.above.xs,(0,n.setPropertyToSpacingVar)("right","ipt-pageMargin"),l),g=`
    position: absolute;
    top: 0;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
`,f=a.default.div.withConfig({componentId:"sc-1c12727-3"})([""," height:'50px';width:'365px';"],g),p=a.default.div.withConfig({componentId:"sc-1c12727-4"})([""," height:100%;width:100%;","{overflow-x:auto;}"],g,n.mediaQueries.devices.onTouchScreens),h=a.default.div.withConfig({componentId:"sc-1c12727-5"})(["","{position:absolute;height:100%;width:120%;}","{display:none;}"],n.mediaQueries.devices.onTouchScreens,n.mediaQueries.devices.onCursorScreens),b=a.default.div.withConfig({componentId:"sc-1c12727-6"})(["",""],d),x=(0,a.default)(o.F).withConfig({componentId:"sc-1c12727-7"})(["&&{","}"],d),I=a.default.div.withConfig({componentId:"sc-1c12727-8"})(["@keyframes slide-in{0%{left:50%;}100%{left:50%;}}"," height:100%;width:100%;animation:slide-in 1s;left:",";display:flex;align-items:center;justify-content:center;z-index:1;","{z-index:0;}> div{width:100%;height:100%;}#interstitial_responsive_wrapper,#interstitial_wrapper{display:flex;width:100%;height:100%;flex-direction:column;justify-content:center;align-items:center;}#interstitialplaceholderPattern{display:none;}"],d,e=>`calc(50% + ${e.offset}px)`,n.mediaQueries.devices.onTouchScreens),w=a.default.span.withConfig({componentId:"sc-1c12727-9"})([""," vertical-align:middle;","{display:none;}","{margin-right:0.325rem;text-align:right;}"],(0,n.setPropertyToColorVar)("color","ipt-on-baseAlt-accent1-color"),n.mediaQueries.breakpoints.only.m,n.mediaQueries.breakpoints.above.m)},85970:function(e,t,i){var a,r;i.d(t,{b:function(){return a}}),(r=a||(a={})).TITLE="title",r.NAME="name",r.GALLERY="gallery",r.LIST="list"}}]);