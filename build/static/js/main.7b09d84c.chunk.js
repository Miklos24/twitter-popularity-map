(this["webpackJsonptwitter-popularity-map"]=this["webpackJsonptwitter-popularity-map"]||[]).push([[0],{185:function(e,t,n){},186:function(e,t,n){},193:function(e,t,n){"use strict";n.r(t);var a=n(5),c=n(0),s=n.n(c),r=n(97),i=n.n(r),o=(n(185),n(17)),l=(n(186),n(187),n(47)),j=n(48),p=function(e){var t=Object(c.useState)({}),n=Object(o.a)(t,2),s=n[0],r=n[1],i=e.tweet_type,p=e.tweet_date,u=Object(c.useState)(new Date(2020,11,29)),d=Object(o.a)(u,2),h=d[0],b=d[1];Object(c.useEffect)((function(){0!==Object.entries(s).length&&p===h||(fetch("/api/tweets?date=".concat(p.getTime())).then((function(e){return e.json()})).then((function(e){r(e)})),b(p)),console.log(s)}),[s,p,h]);var O=j.b().domain(j.a(Object.values(s).map((function(e){return e["".concat(i,"_score")]})))).range(j.c[9]);return Object(a.jsx)(l.ComposableMap,{projection:"geoAlbersUsa",children:Object(a.jsx)(l.Geographies,{geography:"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json",children:function(e){return e.geographies.map((function(e){return Object(a.jsx)(l.Geography,{geography:e,fill:e.properties.name in s?O(s[e.properties.name]["".concat(i,"_score")]):"#FFFFFF",stroke:"rgb(186, 186, 186)"},e.rsmKey)}))}})})},u=n(101),d=n(34),h=n(60),b=function(e){var t=Object(c.useState)(new Date(2020,11,28)),n=Object(o.a)(t,2),s=n[0],r=(n[1],e.updateMap),i=e.date,l=e.type;return Object(a.jsxs)("div",{className:"Map-settings",children:[Object(a.jsxs)("div",{className:"Map-slider",children:[Object(a.jsx)(h.a,{children:Object(a.jsx)(h.a.Control,{type:"range",min:0,max:1,step:1,value:Math.round((i-s)/864e5),onChange:function(e){e.preventDefault(),r(new Date(s.getTime()+864e5*e.target.value),l)}})}),Object(a.jsx)("p",{children:i.toDateString()})]}),Object(a.jsx)("div",{className:"Map-toggle",children:Object(a.jsxs)(u.a,{className:"d-flex",type:"radio",name:"options",defaultValue:"neg"===l?1:2,children:[Object(a.jsx)(d.a,{value:1,variant:"outline-danger",onClick:function(){return r(i,"neg")},children:" Unfavorable Tweets "}),Object(a.jsx)(d.a,{value:2,variant:"outline-success",onClick:function(){return r(i,"pos")},children:" Favorable Tweets "})]})})]})};var O=function(){var e=Object(c.useState)("pos"),t=Object(o.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(new Date(2020,11,29)),i=Object(o.a)(r,2),l=i[0],j=i[1];return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("header",{className:"App-header",children:Object(a.jsx)("h1",{children:" Hated in the Nation "})}),Object(a.jsxs)("div",{className:"App-body",children:[Object(a.jsx)(b,{date:l,type:n,updateMap:function(e,t){j(e),s(t)}}),Object(a.jsx)("div",{className:"Map-container",children:Object(a.jsx)(p,{tweet_type:n,tweet_date:l})}),Object(a.jsx)("p",{children:"Use the slider on the left to select a date to poll tweets from, and use the right toggle to get positive or negative tweets."}),Object(a.jsx)("p",{children:Object(a.jsx)("em",{children:"Note: The map currently only shows two days worth of data because of monthly rate limits from the Twitter API. Once those limits expire, I will be updating the map to include more dates, ideally up to current day."})})]})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,197)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};i.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(O,{})}),document.getElementById("root")),g()}},[[193,1,2]]]);
//# sourceMappingURL=main.7b09d84c.chunk.js.map